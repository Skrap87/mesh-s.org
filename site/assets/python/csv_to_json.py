import csv
import json
import re
from datetime import datetime

CSV_FILE = "history.csv"
OUT_FILE = "ha-charge.json"

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

values = []
times = []

dialect = sniff_dialect(CSV_FILE)

with open(CSV_FILE, "r", encoding="utf-8", newline="") as f:
    reader = csv.reader(f, dialect)

    for row in reader:
        if not row or len(row) < 3:
            continue

        c1 = (row[0] or "").strip()
        c2 = (row[1] or "").strip()
        c3 = (row[2] or "").strip()

        # пропускаем “двойные заголовки”:
        # Column1 Column2 Column3
        # entity_id state last_changed
        low1, low2, low3 = c1.lower(), c2.lower(), c3.lower()
        if (low1, low2, low3) == ("column1", "column2", "column3"):
            continue
        if (low1, low2, low3) == ("entity_id", "state", "last_changed"):
            continue

        try:
            v = clean_ha_number(c2)
            t = parse_time(c3)
            values.append(v)
            times.append(t)
        except Exception:
            continue

if not values:
    raise RuntimeError("Не удалось прочитать данные. Проверь, что history.csv — это экспорт HA истории.")

# сортировка по времени
values = [v for _, v in sorted(zip(times, values))]

data = {
    "min": round(min(values) - 10),
    "max": round(max(values) + 10),
    "points": [round(v, 2) for v in values]
}

with open(OUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print(f"OK: {OUT_FILE} создан ({len(values)} точек)")
print("Пример первых 5 точек:", data["points"][:5])
