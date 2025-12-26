(() => {
  const cssVar = (name, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

  function renderSVG({ points, min, max, unit }) {
    const W = 980, H = 300;
    const padL = 54, padR = 16, padT = 16, padB = 34;
    const innerW = W - padL - padR;
    const innerH = H - padT - padB;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const x = (i) => padL + (i * innerW) / Math.max(points.length - 1, 1);
    const y = (v) => {
      const t = (v - min) / (max - min || 1);
      return padT + (1 - clamp(t, 0, 1)) * innerH;
    };

    const d = points.map((v, i) => `${i ? "L" : "M"} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ");

    const gridLines = 4;
    const grid = Array.from({ length: gridLines + 1 }, (_, i) => {
      const yy = padT + (i * innerH) / gridLines;
      const val = Math.round(max - (i * (max - min)) / gridLines);
      return { yy, val };
    });

    const accent = cssVar("--accent", "#9dd06a");
    const bg = "rgba(12,12,15,1)";
    const border = "rgba(255,255,255,0.12)";
    const gridCol = "rgba(255,255,255,0.06)";
    const muted = "rgba(255,255,255,0.55)";

    const gid = "area_" + Math.random().toString(36).slice(2);

    return `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="chart-svg" role="img" aria-label="Telemetry chart">
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

  <path d="${d} L ${padL + innerW} ${padT + innerH} L ${padL} ${padT + innerH} Z" fill="url(#${gid})"/>
  <path d="${d}" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round"/>

  <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="${border}"/>
  <line x1="${padL}" y1="${padT + innerH}" x2="${padL + innerW}" y2="${padT + innerH}" stroke="${border}"/>
</svg>`;
  }

  async function renderAllCharts() {
    const charts = document.querySelectorAll(".chart[data-json]");
    for (const el of charts) {
      const url = el.getAttribute("data-json");
      const unit = el.getAttribute("data-unit") || "";
      try {
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        const points = data.points || [];
        const min = (typeof data.min === "number") ? data.min : Math.min(...points);
        const max = (typeof data.max === "number") ? data.max : Math.max(...points);
        el.innerHTML = renderSVG({ points, min, max, unit });
      } catch (e) {
        el.textContent = "Chart data not available";
      }
    }
  }

  window.renderAllCharts = renderAllCharts;

  document.addEventListener("DOMContentLoaded", renderAllCharts);
})();


