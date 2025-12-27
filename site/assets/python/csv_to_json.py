import csv
import json
import re
from datetime import datetime, timedelta
from collections import defaultdict

CSV_FILE = "history.csv"

# Правила распознавания типов данных по entity_id
DATA_PATTERNS = {
    "batteryLevel": {
        "keywords": ["battery_level", "battery"],
        "file": "ha-battery.json"
    },
    "temperature": {
        "keywords": ["temperature", "_temp"],
        "file": "ha-temperature.json"
    },
    "chargeCurrent": {
        "keywords": ["current", "charge_current"],
        "file": "ha-charge.json"
    },
    "humidity": {
        "keywords": ["humidity", "relative_humidity"],
        "file": "ha-humidity.json"
    }
}

# Конфигурация для двойных графиков - теперь с умным поиском
DUAL_CHARTS = {
    "humidity": {
        "type": "humidity",
        "unit": "%",
        "output": "humidity-in-out.json",
        "max_gap_seconds": 7200,  # 2 часа
    },
    "temperature": {
        "type": "temperature",
        "unit": "°C",
        "output": "temperature-in-out.json",
        "max_gap_seconds": 7200,  # 2 часа
    }
}

# Маркеры для определения внутренних/внешних сенсоров
LOCATION_MARKERS = {
    "inside": ["inside", "indoor", "interior", "internal", "innen", "drinnen", 
               "room", "raum", "zimmer", "wohnzimmer", "schlafzimmer",
               "case", "gehause", "box", "enclosure",
               "meshtastic", "gateway", "gway", "node", "environment"],
    "outside": ["outside", "outdoor", "exterior", "external", "aussen", "außen", 
                "draussen", "draußen", "ausentemperatur", "außentemperatur",
                "garden", "garten", "balkon", "balcony", "terrace", "terrasse"]
}

def detect_data_type(entity_id: str) -> str | None:
    """Определяет тип данных по entity_id"""
    entity_lower = entity_id.lower()
    
    for data_type, config in DATA_PATTERNS.items():
        for keyword in config["keywords"]:
            if keyword in entity_lower:
                return data_type
    return None

def detect_location(entity_id: str) -> str | None:
    """
    Определяет локацию сенсора (inside/outside) по маркерам в названии.
    Возвращает 'inside', 'outside' или None.
    """
    entity_lower = entity_id.lower()
    
    # Проверяем маркеры
    inside_score = sum(1 for marker in LOCATION_MARKERS["inside"] if marker in entity_lower)
    outside_score = sum(1 for marker in LOCATION_MARKERS["outside"] if marker in entity_lower)
    
    if inside_score > outside_score:
        return "inside"
    elif outside_score > inside_score:
        return "outside"
    
    return None

def parse_time(s: str) -> datetime:
    s = (s or "").strip()
    s = s.replace("Z", "")
    return datetime.fromisoformat(s)

def clean_ha_number(s: str) -> float:
    """
    Превращает строки вида:
      -12.299.999.949.722.200  -> -12.2999999497222
       20.251.068.571.847.200  ->  20.2510685718472
    и обычные числа тоже понимает.
    Пропускает некорректные значения: unavailable, unknown, none, null, etc.
    """
    s = (s or "").strip()
    if not s:
        raise ValueError("empty number")
    
    # Проверяем на некорректные значения
    s_lower = s.lower()
    invalid_values = ["unavailable", "unknown", "none", "null", "nan", "n/a", "na"]
    if s_lower in invalid_values:
        raise ValueError(f"invalid value: {s}")

    # если уже нормальный float — просто парсим
    try:
        return float(s)
    except Exception:
        pass

    # оставляем только цифры, знак и точки
    s = re.sub(r"[^0-9\.\-+]", "", s)

    # если точек 0 или 1 — стандартный случай
    if s.count(".") <= 1:
        return float(s)

    # если точек много: считаем, что ПЕРВАЯ точка — десятичная,
    # остальные — мусорные разделители → убираем
    sign = ""
    if s[0] in "+-":
        sign, s = s[0], s[1:]

    first_dot = s.find(".")
    if first_dot == -1:
        return float(sign + s)

    int_part = s[:first_dot]
    frac_part = s[first_dot+1:].replace(".", "")
    # защита: если вдруг int_part пустой
    if int_part == "":
        int_part = "0"

    return float(f"{sign}{int_part}.{frac_part}")

def sniff_dialect(path: str):
    with open(path, "r", encoding="utf-8", newline="") as f:
        sample = f.read(4096)
    return csv.Sniffer().sniff(sample, delimiters=",;\t")

def build_aligned_series(series_data: dict, grid_times: list, max_gap_seconds: int) -> list:
    """
    Строит массив значений для серии, выровненный по общей сетке времени.
    
    Args:
        series_data: dict с 'times' и 'values'
        grid_times: отсортированный список всех временных точек
        max_gap_seconds: максимальный допустимый разрыв для протяжки значения
    
    Returns:
        list значений (с None для пропусков)
    """
    times = series_data['times']
    values = series_data['values']
    
    if not times:
        return [None] * len(grid_times)
    
    # Создаём индекс для быстрого поиска последнего известного значения
    time_value_pairs = sorted(zip(times, values))
    
    result = []
    max_gap = timedelta(seconds=max_gap_seconds)
    
    for grid_time in grid_times:
        # Находим последнее известное значение <= grid_time
        last_value = None
        last_time = None
        
        for t, v in time_value_pairs:
            if t <= grid_time:
                last_value = v
                last_time = t
            else:
                break
        
        # Проверяем разрыв
        if last_time is None:
            result.append(None)
        elif grid_time - last_time > max_gap:
            result.append(None)
        else:
            result.append(last_value)
    
    return result

# Словари для хранения данных
data_by_type = defaultdict(lambda: {"values": [], "times": []})
data_by_entity = defaultdict(lambda: {"values": [], "times": [], "type": None, "location": None})

# Статистика обработки
stats = {
    "total_rows": 0,
    "header_rows": 0,
    "empty_rows": 0,
    "unknown_type_rows": 0,
    "invalid_value_rows": 0,
    "invalid_time_rows": 0,
    "processed_rows": 0
}

dialect = sniff_dialect(CSV_FILE)

print(f"\n{'='*60}")
print(f"Обработка {CSV_FILE}...")
print(f"{'='*60}\n")

with open(CSV_FILE, "r", encoding="utf-8", newline="") as f:
    reader = csv.reader(f, dialect)

    for row in reader:
        stats["total_rows"] += 1
        
        if not row or len(row) < 3:
            stats["empty_rows"] += 1
            continue

        entity_id = (row[0] or "").strip()
        state = (row[1] or "").strip()
        timestamp = (row[2] or "").strip()

        # пропускаем заголовки
        low1, low2, low3 = entity_id.lower(), state.lower(), timestamp.lower()
        if (low1, low2, low3) == ("column1", "column2", "column3"):
            stats["header_rows"] += 1
            continue
        if (low1, low2, low3) == ("entity_id", "state", "last_changed"):
            stats["header_rows"] += 1
            continue

        # определяем тип данных
        data_type = detect_data_type(entity_id)
        if not data_type:
            stats["unknown_type_rows"] += 1
            continue

        try:
            v = clean_ha_number(state)
        except Exception:
            stats["invalid_value_rows"] += 1
            continue
        
        try:
            t = parse_time(timestamp)
        except Exception:
            stats["invalid_time_rows"] += 1
            continue
        
        # Успешно обработано
        stats["processed_rows"] += 1
        data_by_type[data_type]["values"].append(v)
        data_by_type[data_type]["times"].append(t)
        
        # Сохраняем данные по entity с метаинформацией
        data_by_entity[entity_id]["values"].append(v)
        data_by_entity[entity_id]["times"].append(t)
        if data_by_entity[entity_id]["type"] is None:
            data_by_entity[entity_id]["type"] = data_type
            data_by_entity[entity_id]["location"] = detect_location(entity_id)

print(f"📊 Статистика обработки CSV:")
print(f"   Всего строк: {stats['total_rows']}")
print(f"   Обработано: {stats['processed_rows']}")
if stats["header_rows"] > 0:
    print(f"   Пропущено (заголовки): {stats['header_rows']}")
if stats["empty_rows"] > 0:
    print(f"   Пропущено (пустые): {stats['empty_rows']}")
if stats["unknown_type_rows"] > 0:
    print(f"   Пропущено (неизвестный тип): {stats['unknown_type_rows']}")
if stats["invalid_value_rows"] > 0:
    print(f"   Пропущено (некорректные значения): {stats['invalid_value_rows']}")
if stats["invalid_time_rows"] > 0:
    print(f"   Пропущено (некорректное время): {stats['invalid_time_rows']}")
print()

if not data_by_type:
    print("⚠ Не удалось найти данные ни одного из типов:")
    for name in DATA_PATTERNS.keys():
        print(f"  - {name}")
    print("\nПроверьте, что CSV содержит нужные entity_id")
    exit(1)

# Сначала обрабатываем двойные графики, чтобы знать какие типы пропустить
dual_files = []
created_files = []
dual_types_found = set()  # типы данных, для которых создан двойной график

for chart_key, chart_config in DUAL_CHARTS.items():
    data_type = chart_config["type"]
    
    # Собираем все entity этого типа с определенной локацией
    inside_candidates = []
    outside_candidates = []
    unknown_location = []
    
    for entity_id, entity_data in data_by_entity.items():
        if entity_data["type"] != data_type:
            continue
        
        location = entity_data["location"]
        count = len(entity_data["values"])
        
        candidate = {
            "entity_id": entity_id,
            "count": count,
            "data": entity_data
        }
        
        if location == "inside":
            inside_candidates.append(candidate)
        elif location == "outside":
            outside_candidates.append(candidate)
        else:
            unknown_location.append(candidate)
    
    # Диагностика для отладки
    if not inside_candidates or not outside_candidates:
        print(f"⚠ Пропускаем {chart_key}: найдено inside={len(inside_candidates)}, outside={len(outside_candidates)}")
        if inside_candidates:
            print(f"   Inside кандидаты:")
            for c in inside_candidates:
                print(f"      - {c['entity_id']} ({c['count']} точек)")
        if outside_candidates:
            print(f"   Outside кандидаты:")
            for c in outside_candidates:
                print(f"      - {c['entity_id']} ({c['count']} точек)")
        if unknown_location:
            print(f"   Неопределённая локация (добавьте маркеры!):")
            for c in unknown_location:
                print(f"      - {c['entity_id']} ({c['count']} точек)")
        continue
    
    best_inside = max(inside_candidates, key=lambda x: x["count"])
    best_outside = max(outside_candidates, key=lambda x: x["count"])
    
    candidates = {
        "Inside": best_inside,
        "Outside": best_outside
    }
    
    print(f"✓ {chart_key}: выбраны сенсоры")
    print(f"   Inside:  {best_inside['entity_id']} ({best_inside['count']} точек)")
    print(f"   Outside: {best_outside['entity_id']} ({best_outside['count']} точек)")
    
    # Строим общую сетку времени
    all_times = set()
    for member_data in candidates.values():
        all_times.update(member_data["data"]["times"])
    
    grid_times = sorted(all_times)
    
    # Выравниваем серии - фильтруем null значения
    series = []
    all_values = []
    
    for member_name in ["Inside", "Outside"]:  # порядок важен для вывода
        member = candidates[member_name]
        aligned_points = build_aligned_series(
            member["data"],
            grid_times,
            chart_config["max_gap_seconds"]
        )
        
        # Фильтруем null - оставляем только валидные точки
        valid_points = [round(v, 2) for v in aligned_points if v is not None]
        
        series.append({
            "name": member_name,
            "unit": chart_config["unit"],
            "points": valid_points
        })
        
        # Собираем все значения для расчета min/max
        all_values.extend(valid_points)
    
    if not all_values:
        print(f"⚠ Пропускаем {chart_key}: нет валидных значений")
        continue
    
    # Вычисляем общие min/max
    min_val = round(min(all_values) - 10)
    max_val = round(max(all_values) + 10)
    
    # Ограничения для процентов
    if chart_config["unit"] == "%":
        min_val = max(0, min_val)
        max_val = min(100, max_val)
    
    dual_output = {
        "min": min_val,
        "max": max_val,
        "series": series
    }
    
    out_file = chart_config["output"]
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(dual_output, f, indent=2)
    
    dual_types_found.add(data_type)  # отмечаем, что для этого типа создан двойной график
    
    dual_files.append({
        "key": chart_key,
        "file": out_file,
        "members": {name: data["entity_id"] for name, data in candidates.items()},
        "original_counts": {name: data["count"] for name, data in candidates.items()},
        "grid_points": len(grid_times),
        "range": (min_val, max_val)
    })

# Обработка и сохранение одиночных графиков (только для типов без двойных графиков)

for data_type, data in data_by_type.items():
    # Пропускаем типы, для которых уже создан двойной график
    if data_type in dual_types_found:
        continue
    
    values = data["values"]
    times = data["times"]
    
    if not values:
        continue
    
    # сортировка по времени
    sorted_values = [v for _, v in sorted(zip(times, values))]
    
    output_data = {
        "min": round(min(sorted_values) - 10),
        "max": round(max(sorted_values) + 10),
        "points": [round(v, 2) for v in sorted_values]
    }
    
    out_file = DATA_PATTERNS[data_type]["file"]
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    created_files.append({
        "type": data_type,
        "file": out_file,
        "count": len(sorted_values),
        "range": (output_data["min"], output_data["max"]),
        "preview": output_data["points"][:3]
    })

# Красивый вывод результатов
print(f"\n{'='*60}")
print(f"✓ Успешно обработано одиночных графиков: {len(created_files)}\n")

for info in created_files:
    print(f"📊 {info['type']}")
    print(f"   Файл: {info['file']}")
    print(f"   Точек: {info['count']}")
    print(f"   Диапазон: {info['range'][0]} ... {info['range'][1]}")
    print(f"   Первые значения: {info['preview']}")
    print()

if dual_files:
    print(f"✓ Успешно обработано двойных графиков: {len(dual_files)}\n")
    
    for info in dual_files:
        print(f"📈 {info['key']} (двойной график)")
        print(f"   Файл: {info['file']}")
        for member_name, entity_id in info['members'].items():
            orig_count = info['original_counts'][member_name]
            print(f"   {member_name}: {entity_id} ({orig_count} точек)")
        print(f"   Общая сетка: {info['grid_points']} точек")
        print(f"   Диапазон: {info['range'][0]} ... {info['range'][1]}")
        print()

# Информация о пропущенных типах
found_types = set(data_by_type.keys())
all_types = set(DATA_PATTERNS.keys())
missing_types = all_types - found_types

if missing_types:
    print(f"ℹ️  Не найдено данных для: {', '.join(missing_types)}")

print(f"{'='*60}\n")