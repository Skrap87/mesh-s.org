(() => {
  const cssVar = (name, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

  function renderLegend(series, colors) {
    if (!Array.isArray(series) || series.length < 2) return '';
    return `<div class="chart-legend">${series.map((entry, index) => {
      const name = entry.name || `Serie ${index + 1}`;
      const color = colors[index] || colors[colors.length - 1];
      return `<div class="chart-legend-item"><span class="chart-legend-swatch" style="background:${color}"></span><span>${name}</span></div>`;
    }).join('')}</div>`;
  }

  function renderSVG({ series, min, max, unit, ariaLabel }) {
    const W = 980, H = 300;
    const padL = 54, padR = 16, padT = 16, padB = 34;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const maxLen = Math.max(...series.map((entry) => entry.points.length), 1);
    const x = (i) => padL + (i * innerW) / Math.max(maxLen - 1, 1);
    const y = (v) => {
      const t = (v - min) / (max - min || 1);
      return padT + (1 - clamp(t, 0, 1)) * innerH;
    };
    const buildPath = (points) => points.map((v, i) => `${i ? 'L' : 'M'} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(' ');

    const grid = Array.from({ length: 5 }, (_, i) => {
      const yy = padT + (i * innerH) / 4;
      const val = Math.round(max - (i * (max - min)) / 4);
      return { yy, val };
    });

    const accent = cssVar('--accent', '#87d96c');
    const accentSoft = cssVar('--accent-soft', 'rgba(135,217,108,0.35)');
    const bg = cssVar('--surface-graph', '#0c0f14');
    const border = cssVar('--border', 'rgba(255,255,255,0.12)');
    const gridCol = cssVar('--border-subtle', 'rgba(255,255,255,0.06)');
    const muted = cssVar('--muted', 'rgba(255,255,255,0.6)');
    const gid = 'area_' + Math.random().toString(36).slice(2);
    const colors = [accent, accentSoft];
    const primary = series[0];
    const primaryPath = primary?.points?.length ? buildPath(primary.points) : '';

    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="chart-svg" role="img"${ariaLabel ? ` aria-label="${ariaLabel}"` : ''}>
      <defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></linearGradient></defs>
      <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="18" fill="${bg}" stroke="${border}"/>
      ${grid.map((g) => `<line x1="${padL}" y1="${g.yy}" x2="${W - padR}" y2="${g.yy}" stroke="${gridCol}"/><text x="${padL - 10}" y="${g.yy + 5}" text-anchor="end" font-size="14" fill="${muted}">${g.val}</text>`).join('')}
      <text x="${padL}" y="${H - 10}" font-size="16" fill="${muted}">${unit || ''}</text>
      ${primaryPath ? `<path d="${primaryPath} L ${padL + innerW} ${padT + innerH} L ${padL} ${padT + innerH} Z" fill="url(#${gid})"/>` : ''}
      ${series.map((entry, index) => {
        if (!entry.points.length) return '';
        const color = colors[index] || colors[colors.length - 1];
        return `<path d="${buildPath(entry.points)}" fill="none" stroke="${color}" stroke-width="${index === 0 ? '2.4' : '2.1'}" stroke-linecap="round"/>`;
      }).join('')}
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="${border}"/>
      <line x1="${padL}" y1="${padT + innerH}" x2="${padL + innerW}" y2="${padT + innerH}" stroke="${border}"/>
    </svg>`;
  }

  function renderError(el, text) {
    el.innerHTML = `<div class="chart-error">${text || 'Coming soon'}</div>`;
  }

  async function renderAllCharts() {
    const charts = document.querySelectorAll('.chart[data-json]');
    for (const el of charts) {
      const url = el.getAttribute('data-json');
      const unit = el.getAttribute('data-unit') || '';
      const ariaLabel = el.getAttribute('data-aria-label') || '';
      const errorText = el.getAttribute('data-error-text') || 'Coming soon';

      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const series = Array.isArray(data.series) && data.series.length
          ? data.series.map((entry, index) => ({
            name: entry?.name || `Serie ${index + 1}`,
            points: Array.isArray(entry?.points) ? entry.points : []
          }))
          : [{ name: data.name || '', points: Array.isArray(data.points) ? data.points : [] }];

        if (series.every((s) => !s.points.length)) {
          renderError(el, errorText);
          continue;
        }

        const allPoints = series.flatMap((entry) => entry.points).filter((v) => typeof v === 'number');
        const min = typeof data.min === 'number' ? data.min : Math.min(...allPoints);
        const max = typeof data.max === 'number' ? data.max : Math.max(...allPoints);

        el.innerHTML = renderSVG({ series, min, max, unit, ariaLabel }) + renderLegend(series, [cssVar('--accent', '#87d96c'), cssVar('--accent-soft', 'rgba(135,217,108,0.35)')]);
      } catch {
        renderError(el, errorText);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', renderAllCharts);
})();

if (window.customElements && !window.customElements.get('model-viewer')) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
  document.head.appendChild(script);
}
