(() => {
  const cssVar = (name, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

  function renderLegend(series, colors) {
    if (!Array.isArray(series) || series.length < 2) return "";
    const items = series
      .map((entry, index) => {
        const name = entry.name || `Serie ${index + 1}`;
        const color = colors[index] || colors[colors.length - 1];
        return `
    <div class="chart-legend-item">
      <span class="chart-legend-swatch" style="background: ${color};"></span>
      <span>${name}</span>
    </div>`;
      })
      .join("");

    return `<div class="chart-legend" role="list">${items}</div>`;
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

    // Исправленная функция: возвращает массив сегментов
    const buildSegments = (points) => {
      let segments = [];
      let currentSegment = [];
      
      for (let i = 0; i < points.length; i++) {
        const v = points[i];
        
        if (v === null || v === undefined || typeof v !== 'number') {
          // Если встретили null, завершаем текущий сегмент
          if (currentSegment.length > 0) {
            segments.push(currentSegment);
            currentSegment = [];
          }
        } else {
          // Добавляем валидную точку
          currentSegment.push({ i, v });
        }
      }
      
      // Добавляем последний сегмент
      if (currentSegment.length > 0) {
        segments.push(currentSegment);
      }
      
      // Строим path для каждого сегмента
      return segments.map(segment => 
        segment
          .map((point, idx) => 
            `${idx === 0 ? 'M' : 'L'} ${x(point.i).toFixed(2)} ${y(point.v).toFixed(2)}`
          )
          .join(' ')
      );
    };

    const gridLines = 4;
    const grid = Array.from({ length: gridLines + 1 }, (_, i) => {
      const yy = padT + (i * innerH) / gridLines;
      const val = Math.round(max - (i * (max - min)) / gridLines);
      return { yy, val };
    });

    const accent = cssVar("--accent", "#9dd06a");
    const accentSoft = cssVar("--accent-soft", "rgba(157, 208, 106, 0.35)");
    const bg = cssVar("--surface-graph", "#0c0c0f");
    const border = cssVar("--border", "rgba(255,255,255,0.12)");
    const gridCol = cssVar("--border-subtle", "rgba(255,255,255,0.06)");
    const muted = cssVar("--muted", "rgba(255,255,255,0.55)");

    const gid = "area_" + Math.random().toString(36).slice(2);
    const colors = [accent, accentSoft];
    const primarySeries = series[0];

    // Для области под графиком - строим отдельные сегменты
    const buildAreaSegments = (points) => {
      if (!points || points.length === 0) return [];
      
      const segments = buildSegments(points);
      const yBottom = (padT + innerH).toFixed(2);
      
      return segments.map(segmentPath => {
        // Извлекаем координаты из path
        const coords = segmentPath.match(/[\d.]+/g);
        if (!coords || coords.length < 4) return "";
        
        const firstX = coords[0];
        const lastX = coords[coords.length - 2];
        
        return `${segmentPath} L ${lastX} ${yBottom} L ${firstX} ${yBottom} Z`;
      }).filter(Boolean);
    };

    const areaSegments = buildAreaSegments(primarySeries?.points || []);

    return `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="chart-svg" role="img"${ariaLabel ? ` aria-label="${ariaLabel}"` : ""}>
  <defs>
    <linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="18" fill="${bg}" stroke="${border}"/>

  ${grid
    .map(
      (g) => `
    <line x1="${padL}" y1="${g.yy}" x2="${W - padR}" y2="${g.yy}" stroke="${gridCol}"/>
    <text x="${padL - 10}" y="${g.yy + 5}" text-anchor="end" font-size="14" fill="${muted}">${g.val}</text>
  `
    )
    .join("")}

  <text x="${padL}" y="${H - 10}" font-size="16" fill="${muted}">${unit || ""}</text>

  ${areaPath ? `<path d="${areaPath}" fill="url(#${gid})"/>` : ""}
  ${series
    .map((entry, index) => {
      if (!entry.points.length) return "";
      const color = colors[index] || colors[colors.length - 1];
      const path = buildPath(entry.points);
      return path ? `<path d="${path}" fill="none" stroke="${color}" stroke-width="${index === 0 ? "2.4" : "2.1"}" stroke-linecap="round" stroke-linejoin="round"/>` : "";
    })
    .join("")}

  <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="${border}"/>
  <line x1="${padL}" y1="${padT + innerH}" x2="${padL + innerW}" y2="${padT + innerH}" stroke="${border}"/>
</svg>`;
  }

  async function renderAllCharts() {
    const charts = document.querySelectorAll(".chart[data-json]");
    for (const el of charts) {
      const url = el.getAttribute("data-json");
      const unit = el.getAttribute("data-unit") || "";
      const ariaLabel = el.getAttribute("data-aria-label") || "";
      const errorText = el.getAttribute("data-error-text") || "";
      try {
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        const series = Array.isArray(data.series) && data.series.length
          ? data.series.map((entry, index) => ({
            name: entry?.name || `Serie ${index + 1}`,
            unit: entry?.unit || unit,
            points: Array.isArray(entry?.points) ? entry.points : []
          }))
          : [{
            name: data.name || "",
            unit,
            points: Array.isArray(data.points) ? data.points : []
          }];
        const allPoints = series.flatMap((entry) => entry.points).filter((value) => typeof value === "number");
        const min = (typeof data.min === "number") ? data.min : (allPoints.length ? Math.min(...allPoints) : 0);
        const max = (typeof data.max === "number") ? data.max : (allPoints.length ? Math.max(...allPoints) : 0);
        const svg = renderSVG({ series, min, max, unit, ariaLabel });
        const legend = renderLegend(series, [cssVar("--accent", "#9dd06a"), cssVar("--accent-soft", "rgba(157, 208, 106, 0.35)")]);
        el.innerHTML = svg + legend;
      } catch (e) {
        el.textContent = errorText;
      }
    }
  }

  window.renderAllCharts = renderAllCharts;

  document.addEventListener("DOMContentLoaded", renderAllCharts);
})();