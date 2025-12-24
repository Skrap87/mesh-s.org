# MESH-S — Project Map

MESH-S is a static, multi-language product site for the MESH‑S node. It presents the hardware concept, specifications, visual assets, and variant-specific details (S/M/L/XL) while keeping the page structure stable and the content/data in files.

The current site ships a single published variant (S), but the directory layout and translations are already structured to scale to M/L/XL without duplicating HTML pages. The goal is “one version of the site, multiple variants of data and assets.”

---

## 1) Корневая структура проекта

```
/
├── LICENSE
├── README.md
├── PROJECT_MAP.md
└── site/
    ├── assets/
    ├── i18n/
    ├── charts.js
    ├── i18n.js
    ├── index.html
    ├── viewer.html
    ├── styles.css
    ├── impressum.html
    ├── privacy.html
    ├── robots.txt
    └── sitemap.xml
```

**Назначение:**
- **/site/** — корневая папка самого сайта (HTML/CSS/JS/ассеты/переводы).
- **assets/** — изображения, модели, графики и вспомогательные файлы, включая вариативные наборы для S/M/L/XL.
- **i18n/** — словари переводов (по языкам, разбито на common и variants).
- **charts.js** — логика рендеринга графиков из JSON‑данных.
- **i18n.js** — логика выбора языка и применения переводов.
- **index.html** — основной лендинг.
- **viewer.html** — отдельная страница 3D‑просмотра.
- **styles.css** — единый файл стилей сайта.
- **impressum.html / privacy.html** — юридические страницы.
- **robots.txt / sitemap.xml** — SEO/индексация.

---

## 2) Assets — детально

Текущая структура:
```
assets/
  apple-touch-icon.png
  favicon.svg
  meshtastic-exploded.de.svg
  meshtastic-exploded.en.svg
  meshtastic-exploded.svg
  python/
    csv_to_json.py
  variants/
    s/
      hero/
      models/
      winter/
        images/
        charts/
      autonomy/
        charts/
        images/
      assembly/
      bom/
      exploded/
    m/
      hero/
      models/
      winter/
        images/
        charts/
      autonomy/
        charts/
      assembly/
      bom/
      exploded/
    l/
      hero/
      models/
      winter/
        images/
        charts/
      autonomy/
        charts/
      assembly/
      bom/
      exploded/
    xl/
      hero/
      models/
      winter/
        images/
        charts/
      autonomy/
        charts/
      assembly/
      bom/
      exploded/
```

**Что где лежит:**
- **assets/** (верхний уровень): общие иконки и SVG‑диаграммы, которые не привязаны к варианту.
- **assets/python/csv_to_json.py** — утилита для подготовки данных (например, конвертация CSV в JSON для графиков).

**variants/** — единый шаблон структуры для каждой версии (S/M/L/XL):
- **hero/** — ключевые изображения/обложки для блока «героя» на главной.
- **models/** — 3D‑модели (например, `mesh-s.glb`) для viewer.html.
- **winter/** — материалы для сезонного/полевого блока (изображения и графики).
  - **winter/images/** — фотоконтент.
  - **winter/charts/** — JSON‑данные графиков (используются `charts.js`).
- **autonomy/** — блок автономности/питания.
  - **autonomy/charts/** — JSON‑данные графиков автономности.
  - **autonomy/images/** — изображения автономного блока (присутствует в S; в M/L/XL может дополняться).
- **assembly/** — материалы по сборке/компоновке (изображения/схемы).
- **bom/** — материалы для списка компонентов (BOM), включая изображения деталей.
- **exploded/** — «взрыв‑схема»/разнесённые виды или связанные изображения.

**Что относится к варианту:**
- Всё внутри **variants/{s|m|l|xl}/** — это вариативные ассеты.
- Различия между версиями должны выражаться **заменой/добавлением файлов внутри соответствующей папки варианта**, а не изменением HTML.

**Что добавляется при масштабировании:**
- Для новых версий (M/L/XL) добавляются или обновляются файлы в папках соответствующего варианта (например, новые модели, изображения, графики).
- Структура папок **остается одинаковой**, чтобы код и шаблоны не менялись.

---

## 3) Переводы (i18n)

Текущая структура:
```
i18n/
  en/
    common.js
    variants.js
  de/
    common.js
    variants.js
  ru/
    common.js
    variants.js
```

**Пояснения:**
- **common.js** — базовые тексты, общие для всех вариантов (навигация, общие блоки, UI‑строки).
- **variants.js** — тексты, зависящие от конкретных версий S/M/L/XL или от вариативного контента.
- Разделение нужно, чтобы:
  - не дублировать общий UI между версиями;
  - локализовать только то, что связано с конкретными вариантами.

**Как добавлять новые варианты:**
1. Добавить ключи для новой версии в `variants.js` каждого языка.
2. Подготовить ассеты в `assets/variants/{m|l|xl}/...`.
3. Использовать существующие data‑атрибуты (например, `data-i18n`) в HTML — без копирования страниц.

---

## 4) JS файлы

**charts.js**
- Отвечает за рендеринг SVG‑графиков на основе JSON (`data-json` в HTML).
- Получает данные, строит оси/сетку и вставляет готовую SVG‑разметку.
- Логика полностью локализована здесь; не смешивать с i18n или UI‑логикой.

**i18n.js**
- Центральная логика локализации: склеивание `common` и `variants`, выбор языка, применение `data-i18n` атрибутов.
- Обновляет ссылки так, чтобы язык сохранялся в URL.
- Нельзя смешивать с визуальной логикой страницы или графиков.

**Inline‑скрипты в HTML (важное замечание)**
- Отдельных `main.js` и `viewer.js` нет — логика находится прямо в `index.html` и `viewer.html`.
- **index.html** содержит:
  - подстановку текущего года;
  - баннер cookie‑согласия;
  - закрытие меню при переходе;
  - лайтбокс для просмотра изображений.
- **viewer.html** содержит модульный скрипт с Three.js для загрузки 3D‑модели и управления сценой.

**Нельзя смешивать:**
- Логику локализации и UI‑поведения — в `i18n.js`.
- Логику графиков — только в `charts.js`.
- 3D‑viewer — только в `viewer.html` (если не выделяется в отдельный файл).

---

## 5) HTML

**index.html — основной шаблон**
- Единая страница для всех вариантов.
- Использует `data-` атрибуты (`data-i18n`, `data-i18n-alt`, `data-i18n-label`) как «якоря» для текста и будущих данных.
- Логику UI держит в inline‑скриптах, а данные — в i18n и assets.

**viewer.html — 3D просмотр**
- Страница для интерактивного просмотра 3D‑модели.
- Использует importmap и Three.js из CDN.
- Модель берётся из `assets/variants/s/models/mesh-s.glb`.

**Роль data‑атрибутов**
- Это точки привязки текста/данных: HTML не меняется при добавлении вариантов.
- Позволяют масштабировать контент через файлы переводов и ассеты.

---

## 6) Принципы масштабирования

**Как добавляется новая версия (M/L/XL):**
1. Заполнить `assets/variants/{m|l|xl}/...` нужными файлами.
2. Добавить/обновить тексты в `i18n/*/variants.js`.
3. HTML не копируется и не дублируется.

**Что НЕ нужно делать:**
- Не создавать отдельные страницы `index-m.html`, `index-l.html` и т.п.
- Не дублировать HTML ради разных вариантов.

**Какие папки копируются/дополняются:**
- Структура **assets/variants/{m|l|xl}/** повторяет S и заполняется уникальными ассетами.
- В `i18n/*/variants.js` добавляются ключи для новых версий.

---

## 7) Правила проекта (коротко)

- **HTML = структура.**
- **JS = логика.**
- **Данные = файлы.**
- **Ассеты = variants/* .**
- **Тексты = i18n.**
