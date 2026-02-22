# MESH-S Landing v2 concept

Новая концепция главной страницы в отдельной папке `site/landing-v2/`.

## Что включено

- `index.html` — single-page лендинг с блоками Hero, преимущества, телеметрия, варианты, визуалы, вход в документацию и footer.
- `styles.css` — премиум-темная визуальная система (glass, градиенты, сетка, hover-состояния, адаптив).

## UI-состояния (минимум)

- Кнопки: `btn-primary`, `btn-secondary`, `btn-ghost` + hover (легкий подъём).
- Карточки вариантов: hover с подсветкой границы и смещением.
- Стеклянные карточки (`glass`) и подсветка featured-модели.

## Спецификация визуалов

- Hero: `../assets/variants/xl/hero/hero-xl.webp`.
- Телеметрия: `../assets/variants/s/autonomy/images/ha-charge.png` + зимний эксплуатационный кадр `../assets/gallery/knoten-09.jpg`.
- Галерея:
  - `../assets/gallery/knoten-01.jpg`
  - `../assets/gallery/knoten-05.jpg`
  - `../assets/gallery/aufbau/aufbau-mit-ina219.png`
  - `../assets/variants/s/custom-parts/enclosure.webp`

## Адаптив

- Desktop-first до 1160px контейнера.
- Перестройка сеток на 2 колонки для планшета.
- Полная одноколоночная версия на мобильном (`max-width: 640px`).
