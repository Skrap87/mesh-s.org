/* [RU] ===== START: data-deck.js / Daten Auto Deck ===== */
import { $, $all } from './core.js';

export function initDataAuto(){
  const track = $('#dataTrack');
  const dots = $all('[data-data]');
  if (!track || dots.length === 0) return;

  const total = dots.length;
  let i = 0;
  let timer = null;

  function render(){
    track.style.setProperty('--x', `-${i * 100}%`);
    dots.forEach(d => d.classList.remove('is-active'));
    const active = dots.find(d => Number(d.dataset.data) === i);
    if (active) active.classList.add('is-active');
  }

  function start(){
    stop();
    timer = window.setInterval(() => {
      i = (i + 1) % total;
      render();
    }, 4200);
  }

  function stop(){
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  dots.forEach(d => {
    d.addEventListener('click', () => {
      i = Number(d.dataset.data);
      render();
      start();
    });
  });

  const viewport = track.closest('.dataAuto__viewport');
  if (viewport){
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);
    viewport.addEventListener('focusin', stop);
    viewport.addEventListener('focusout', start);
  }

  render();
  start();
}
/* [RU] ===== END: data-deck.js / Daten Auto Deck ===== */