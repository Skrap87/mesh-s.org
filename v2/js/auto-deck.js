/* [RU] ===== START: variants.js / Feuchtigkeitsaspekte Auto Deck (JSON driven) ===== */
import { $, $all } from './core.js';

export async function initAutoCards(){
  const track = $('#autoTrack');
  const dotsWrap = $('#autoDots');

  if (!track || !dotsWrap) return;

  /* [RU] ===== START: Загрузка данных из JSON ===== */
  let aspects = [];
  try {
    const res = await fetch('/data/feuchtigkeits-aspekte.json');
    aspects = await res.json();
  } catch (e) {
    console.error('Fehler beim Laden von feuchtigkeits-aspekte.json', e);
    return;
  }

  if (!Array.isArray(aspects) || aspects.length === 0) return;
  /* [RU] ===== END: Загрузка данных из JSON ===== */

  /* [RU] ===== START: Рендер слайдов ===== */
  track.innerHTML = aspects.map((a, idx) => {
    const icon = (a?.icon ?? '•').toString();
    const title = (a?.title ?? `Aspekt ${idx + 1}`).toString();
    const desc = (a?.desc ?? '').toString();

    return `
      <article class="autoCard" data-idx="${idx}">
        <div class="autoCard__icon" aria-hidden="true">${icon}</div>
        <div class="autoCard__content">
          <div class="autoCard__name">${title}</div>
          <p class="muted small">${desc}</p>
        </div>
      </article>
    `;
  }).join('');
  /* [RU] ===== END: Рендер слайдов ===== */

  /* [RU] ===== START: Рендер точек ===== */
  dotsWrap.innerHTML = aspects.map((a, idx) => {
    const label = (a?.title ?? `Aspekt ${idx + 1}`).toString();
    const active = idx === 0 ? ' is-active' : '';
    return `<button class="dot${active}" type="button" data-i="${idx}" aria-label="${label}"></button>`;
  }).join('');
  /* [RU] ===== END: Рендер точек ===== */

  const dots = $all('#autoDots [data-i]');
  const total = dots.length;

  let i = 0;
  let timer = null;

  function render(){
    track.style.setProperty('--x', `-${i * 100}%`);
    dots.forEach(d => d.classList.remove('is-active'));
    const active = dots.find(d => Number(d.dataset.i) === i);
    if (active) active.classList.add('is-active');
  }

  function start(){
    stop();
    timer = window.setInterval(() => {
      i = (i + 1) % total;
      render();
    }, 3800);
  }

  function stop(){
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  dots.forEach(d => {
    d.addEventListener('click', () => {
      i = Number(d.dataset.i);
      render();
      start();
    });
  });

  const viewport = track.closest('.autoCards__viewport');
  if (viewport){
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);
    viewport.addEventListener('focusin', stop);
    viewport.addEventListener('focusout', start);
  }

  render();
  start();
}
/* [RU] ===== END: variants.js / Feuchtigkeitsaspekte Auto Deck (JSON driven) ===== */