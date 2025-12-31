# MESH-S — Project Map

MESH-S is a static, multi-language product site for the MESH‑S node. It presents the hardware concept, specifications, visual assets, and variant-specific details (S/M/L/XL) while keeping the page structure stable and the content/data in files.

The current site ships a single published variant (S), but the directory layout and translations are already structured to scale to M/L/XL without duplicating HTML pages. The goal is “one version of the site, multiple variants of data and assets.”

---

## 1) Root project structure

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

**Purpose:**
- **/site/** — the root folder of the site itself (HTML/CSS/JS/assets/translations).
- **assets/** — images, models, charts, and auxiliary files, including variant sets for S/M/L/XL.
- **i18n/** — translation dictionaries (by language, split into common and variants).
- **charts.js** — logic for rendering charts from JSON data.
- **i18n.js** — logic for language selection and applying translations.
- **index.html** — the main landing page.
- **viewer.html** — a separate 3D viewer page.
- **styles.css** — a single style file for the site.
- **impressum.html / privacy.html** — legal pages.
- **robots.txt / sitemap.xml** — SEO/indexing.

---

## 2) Assets — in detail

Current structure:
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
      # ... structure repeats
    l/
      # ... structure repeats
    xl/
      # ... structure repeats
```

**What is where:**
- **assets/** (top level): common icons and SVG diagrams that are not tied to a variant.
- **assets/python/csv_to_json.py** — a utility for data preparation (e.g., converting CSV to JSON for charts).

**variants/** — a single structural template for each version (S/M/L/XL):
- **hero/** — key images/covers for the "hero" block on the main page.
- **models/** — 3D models (e.g., `mesh-s.glb`) for viewer.html.
- **winter/** — materials for the seasonal/field block (images and charts).
  - **winter/images/** — photo content.
  - **winter/charts/** — JSON chart data (used by `charts.js`).
- **autonomy/** — autonomy/power block.
  - **autonomy/charts/** — autonomy chart JSON data.
  - **autonomy/images/** — images for the autonomy block.
- **assembly/** — materials for assembly/layout (images/diagrams).
- **bom/** — materials for the Bill of Materials (BOM), including part images.
- **exploded/** — exploded views or related images.

**What belongs to a variant:**
- Everything inside **variants/{s|m|l|xl}/** is a variant-specific asset.
- Differences between versions should be expressed by **replacing/adding files within the corresponding variant folder**, not by changing the HTML.

**What is added during scaling:**
- For new versions (M/L/XL), files are added or updated in the corresponding variant's folders (e.g., new models, images, charts).
- The folder structure **remains the same** so that the code and templates do not change.

---

## 3) Translations (i18n)

Current structure:
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

**Explanation:**
- **common.js** — base texts, common to all variants (navigation, common blocks, UI strings).
- **variants.js** — texts that depend on specific S/M/L/XL versions or variant content.
- The separation is needed to:
  - avoid duplicating the common UI between versions;
  - localize only what is related to specific variants.

**How to add new variants:**
1. Add keys for the new version to `variants.js` for each language.
2. Prepare the assets in `assets/variants/{m|l|xl}/...`.
3. Use existing data attributes (e.g., `data-i18n`) in the HTML — without copying pages.

---

## 4) JS files

**charts.js**
- Responsible for rendering SVG charts based on JSON (`data-json` in HTML).
- Gets the data, builds the axes/grid, and inserts the finished SVG markup.
- The logic is fully localized here; do not mix with i18n or UI logic.

**i18n.js**
- The central localization logic: merging `common` and `variants`, selecting the language, applying `data-i18n` attributes.
- Updates links so that the language is preserved in the URL.
- Should not be mixed with the visual logic of the page or charts.

**Inline scripts in HTML (important note)**
- There are no separate `main.js` and `viewer.js` files — the logic is directly in `index.html` and `viewer.html`.
- **index.html** contains:
  - substitution of the current year;
  - a cookie consent banner;
  - closing the menu on navigation;
  - a lightbox for viewing images.
- **viewer.html** contains a modular script with Three.js for loading the 3D model and managing the scene.

**What not to mix:**
- Localization logic and UI behavior — in `i18n.js`.
- Chart logic — only in `charts.js`.
- 3D viewer — only in `viewer.html` (unless it is extracted into a separate file).

---

## 5) HTML

**index.html — the main template**
- A single page for all variants.
- Uses `data-` attributes (`data-i18n`, `data-i18n-alt`, `data-i18n-label`) as "anchors" for text and future data.
- Keeps UI logic in inline scripts, and data in i18n and assets.

**viewer.html — 3D view**
- A page for interactively viewing a 3D model.
- Uses importmap and Three.js from a CDN.
- The model is taken from `assets/variants/s/models/mesh-s.glb`.

**The role of data attributes**
- They are anchor points for text/data: the HTML does not change when adding variants.
- They allow scaling content through translation files and assets.

---

## 6) Scaling principles

**How a new version (M/L/XL) is added:**
1. Fill `assets/variants/{m|l|xl}/...` with the necessary files.
2. Add/update texts in `i18n/*/variants.js`.
3. The HTML is not copied or duplicated.

**What NOT to do:**
- Do not create separate pages like `index-m.html`, `index-l.html`, etc.
- Do not duplicate HTML for different variants.

**Which folders are copied/supplemented:**
- The structure of **assets/variants/{m|l|xl}/** repeats S and is filled with unique assets.
- Keys for new versions are added to `i18n/*/variants.js`.

---

## 7) Project rules (in short)

- **HTML = structure.**
- **JS = logic.**
- **Data = files.**
- **Assets = variants/* .**
- **Texts = i18n.**
