# CSS-структура v2

- `css/styles.css` — единая точка входа, подключена в `index.html`.
- `css/core/tokens.css` — переменные, токены и глобальные значения.
- `css/core/base.css` — reset/база, типографика и общие утилиты.
- `css/components/*.css` — компонентные файлы по блокам страницы (topbar, top-cube, data-auto, variants, ribbon, footer и т.д.).
- `css/components/idee.css` — локальные стили секции `#idee`.
- `css/core/animations.css` — keyframes и только анимации.
- `css/core/reduced-motion.css` — доступность (`prefers-reduced-motion`).
- `css/responsive/tablet.css` — все адаптивные правки для `max-width: 980px`.
- `css/responsive/mobile.css` — отдельная мобильная точка расширения.
- Порядок импортов соблюдает каскад: core → компоненты → анимации → responsive.
