import csv
import json
import re
from datetime import datetime
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

def detect_data_type(entity_id: str) -> str | None:
    """Определяет тип данных по entity_id"""
    entity_lower = entity_id.lower()
    
    for data_type, config in DATA_PATTERNS.items():
        for keyword in config["keywords"]:
            if keyword in entity_lower:
                return data_type
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
    """
    s = (s or "").strip()
    if not s:
        raise ValueError("empty number")

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

# Словари для хранения данных по типам
data_by_type = defaultdict(lambda: {"values": [], "times": []})

dialect = sniff_dialect(CSV_FILE)

print(f"\n{'='*60}")
print(f"Обработка {CSV_FILE}...")
print(f"{'='*60}\n")

with open(CSV_FILE, "r", encoding="utf-8", newline="") as f:
    reader = csv.reader(f, dialect)

    for row in reader:
        if not row or len(row) < 3:
            continue

        entity_id = (row[0] or "").strip()
        state = (row[1] or "").strip()
        timestamp = (row[2] or "").strip()

        # пропускаем заголовки
        low1, low2, low3 = entity_id.lower(), state.lower(), timestamp.lower()
        if (low1, low2, low3) == ("column1", "column2", "column3"):
            continue
        if (low1, low2, low3) == ("entity_id", "state", "last_changed"):
            continue

        # определяем тип данных
        data_type = detect_data_type(entity_id)
        if not data_type:
            continue

        try:
            v = clean_ha_number(state)
            t = parse_time(timestamp)
            data_by_type[data_type]["values"].append(v)
            data_by_type[data_type]["times"].append(t)
        except Exception:
            continue

if not data_by_type:
    print("⚠ Не удалось найти данные ни одного из типов:")
    for name in DATA_PATTERNS.keys():
        print(f"  - {name}")
    print("\nПроверьте, что CSV содержит нужные entity_id")
    exit(1)

# Обработка и сохранение каждого типа данных
created_files = []

for data_type, data in data_by_type.items():
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
print(f"✓ Успешно обработано типов данных: {len(created_files)}\n")

for info in created_files:
    print(f"📊 {info['type']}")
    print(f"   Файл: {info['file']}")
    print(f"   Точек: {info['count']}")
    print(f"   Диапазон: {info['range'][0]} ... {info['range'][1]}")
    print(f"   Первые значения: {info['preview']}")
    print()

# Информация о пропущенных типах
found_types = set(data_by_type.keys())
all_types = set(DATA_PATTERNS.keys())
missing_types = all_types - found_types

if missing_types:
    print(f"ℹ️  Не найдено данных для: {', '.join(missing_types)}")

print(f"{'='*60}\n")