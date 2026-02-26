/* [RU] ===== START: hero.js / Hero Flip Carousel ===== */
import { $ } from './core.js';

export async function initHeroFlip(){

  const panel = $('#heroFlipPanel');
  const img = $('#heroFlipImg');

  const prevBtn = $('#cubePrev');
  const nextBtn = $('#cubeNext');
  const dotsWrap = document.querySelector('.cubeDots');

  if (!panel || !img || !dotsWrap) return;

  /* [RU] ===== START: Загрузка моделей из JSON ===== */
  let heroModels = [];

  try {
    const response = await fetch('/data/hero-models.json');
    heroModels = await response.json();
  } catch (e) {
    console.error('Fehler beim Laden von hero-models.json', e);
    return;
  }

  if (!Array.isArray(heroModels) || heroModels.length === 0) return;
  /* [RU] ===== END: Загрузка моделей из JSON ===== */

  const total = heroModels.length;
  let i = 0;
  let timer = null;
  let busy = false;

  /* [RU] ===== START: Подпись модели ===== */
  const titleEl = document.createElement('div');
  titleEl.className = 'modelTitle';
  panel.appendChild(titleEl);
  /* [RU] ===== END: Подпись модели ===== */

  /* [RU] ===== START: Click Navigation ===== */
  panel.style.cursor = 'pointer';
  panel.addEventListener('click', () => {
    const targetUrl = heroModels[i].url;
    if (targetUrl) window.location.href = targetUrl;
  });
  /* [RU] ===== END: Click Navigation ===== */

  function buildDots(){
    dotsWrap.innerHTML = '';
    for (let idx = 0; idx < total; idx++){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.dataset.cube = String(idx);
      b.setAttribute('aria-label', heroModels[idx].name);
      dotsWrap.appendChild(b);
    }
  }

  function getDots(){
    return Array.from(dotsWrap.querySelectorAll('[data-cube]'));
  }

  function setActiveDot(){
    const dots = getDots();
    dots.forEach(d => d.classList.remove('is-active'));
    const active = dots.find(d => Number(d.dataset.cube) === i);
    if (active) active.classList.add('is-active');
  }

  /* [RU] ===== START: updateTitle ===== */
  function updateTitle(){
    titleEl.textContent = ` ${heroModels[i].name}`;
  }
  /* [RU] ===== END: updateTitle ===== */

  function renderInstant(){
    img.src = heroModels[i].src;
    panel.classList.remove('is-zoom-out','is-zoom-prep','is-zoom-in');
    panel.classList.add('is-zoom-in');
    setActiveDot();
    updateTitle();
  }

  function zoomTo(nextIndex){
    if (busy) return;
    busy = true;

    i = (nextIndex + total) % total;
    setActiveDot();

    panel.classList.remove('is-zoom-prep','is-zoom-in');
    panel.classList.add('is-zoom-out');

    const onOut = () => {
      panel.removeEventListener('transitionend', onOut);

      panel.classList.remove('is-zoom-out');
      panel.classList.add('is-zoom-prep');

      img.src = heroModels[i].src;
      updateTitle();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.classList.remove('is-zoom-prep');
          panel.classList.add('is-zoom-in');

          const onIn = () => {
            panel.removeEventListener('transitionend', onIn);
            busy = false;
          };
          panel.addEventListener('transitionend', onIn, { once: true });
        });
      });
    };

    panel.addEventListener('transitionend', onOut, { once: true });
  }

  function next(){ zoomTo(i + 1); }
  function prev(){ zoomTo(i - 1); }

  function start(){
    stop();
    timer = window.setInterval(next, 4200);
  }

  function stop(){
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function bindDots(){
    const dots = getDots();
    dots.forEach(d => {
      d.addEventListener('click', () => {
        zoomTo(Number(d.dataset.cube));
        start();
      });
    });
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });

  const stage = panel.closest('.flipStage');
  if (stage){
    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', start);
    stage.addEventListener('focusin', stop);
    stage.addEventListener('focusout', start);
  }

  buildDots();
  bindDots();
  renderInstant();
  start();
}
/* [RU] ===== END: hero.js / Hero Flip Carousel ===== */