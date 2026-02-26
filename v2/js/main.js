/* [RU] ===== START: main.js / Entry Point ===== */
import { $ } from './core.js';
import { initHeroFlip } from './hero.js';
import { initDataAuto } from './data-deck.js';
import { initAutoCards } from './auto-deck.js';

/* [RU] ===== START: Footer Year ===== */
(function setYear(){
  const y = $('#year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
/* [RU] ===== END: Footer Year ===== */

/* [RU] ===== START: Init Modules ===== */
(function init(){
  initHeroFlip();
  initDataAuto();
  initAutoCards();
})();
/* [RU] ===== END: Init Modules ===== */
/* [RU] ===== END: main.js / Entry Point ===== */