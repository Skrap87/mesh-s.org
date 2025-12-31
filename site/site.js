(() => {
  // nav-more logic
  if (!window.__navMoreDismiss) {
    window.__navMoreDismiss = true;
    const closeAll = () => {
      document.querySelectorAll('details.nav-more[open]').forEach((details) => {
        details.removeAttribute('open');
      });
    };

    document.addEventListener('click', (event) => {
      const openMenus = document.querySelectorAll('details.nav-more[open]');
      if (!openMenus.length) return;
      const target = event.target;
      if (target && target.closest && target.closest('details.nav-more')) return;
      openMenus.forEach((details) => {
        details.removeAttribute('open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeAll();
    });
  }

  document.querySelectorAll('.nav-more-menu a').forEach(link => {
    link.addEventListener('click', () => {
      const details = link.closest('.nav-more');
      if (details) details.removeAttribute('open');
    });
  });

  document.querySelectorAll('details.nav-more').forEach(details => {
    details.addEventListener('toggle', () => {
      details.setAttribute('aria-expanded', details.open);
    });
  });

  // cookie-banner logic
  const KEY = 'cookiesAccepted';
  const banner = document.getElementById('cookie-banner');
  const btn = document.getElementById('cookie-accept');
  if (banner && btn) {
    if (localStorage.getItem(KEY) === 'true') {
      banner.remove();
    } else {
      btn.addEventListener('click', () => {
        localStorage.setItem(KEY, 'true');
        banner.remove();
      });
    }
  }

  // year
  const yearEl = document.getElementById("year");
  if(yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* ===== Bewertung 0–10 (Client) ===== */
(() => {
  const root = document.getElementById("rating");
  if (!root) return;

  const meta = document.getElementById("ratingMeta");
  const scale = document.getElementById("ratingScale");
  const valueEl = document.getElementById("ratingValue");
  const buttons = root.querySelectorAll(".rating-btn[data-rate]");
  if (!buttons.length) return;

  // ключ "уже голосовал" — локально, чтобы не спамили с одного браузера
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const storageKey = `meshSRatingDone:${page}`;

  // PROD: относительный путь. Для локального теста можно временно заменить на полный URL.
  const API_BASE = "/api/rating";

  function setMeta(text) {
    if (meta) meta.textContent = text || "";
  }

  function setResult(avg, count) {
    if (!valueEl) return;
    if (!count) {
      valueEl.textContent = "Noch keine Bewertungen";
      return;
    }
    valueEl.textContent = `Ø ${Number(avg).toFixed(1)} / 10 · ${count} Bewertungen`;
  }

  function setSelected(value) {
    buttons.forEach((b) => {
      b.classList.toggle("is-selected", b.getAttribute("data-rate") === String(value));
    });
  }

  function hideVoting() {
    if (scale) scale.style.display = "none";
  }

  async function loadSummary() {
    try {
      const url = `${API_BASE}?page=${encodeURIComponent(page)}`;
      const r = await fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();

      if (typeof data?.avg === "number" && typeof data?.count === "number") {
        setResult(data.avg, data.count);
      } else {
        setResult(0, 0);
      }
    } catch (_) {
      // если API недоступен, просто не ломаем UI
      setResult(0, 0);
    }
  }

  async function sendVote(value) {
    const body = { page, value: Number(value) };

    const r = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json(); // { avg, count }
  }

  // Всегда показываем общий результат (даже если уже голосовал)
  loadSummary();

  // Если уже голосовал — скрываем кнопки сразу
  if (localStorage.getItem(storageKey)) {
    hideVoting();
    setMeta("Danke! Du hast bereits bewertet.");
    return;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (localStorage.getItem(storageKey)) {
        hideVoting();
        setMeta("Danke! Du hast bereits bewertet.");
        return;
      }

      const value = btn.getAttribute("data-rate");
      setSelected(value);
      setMeta("Sende Bewertung…");

      try {
        const data = await sendVote(value);
        localStorage.setItem(storageKey, "1");

        if (typeof data?.avg === "number" && typeof data?.count === "number") {
          setResult(data.avg, data.count);
        }
        hideVoting();
        setMeta("Danke! Du hast bereits bewertet.");
      } catch (e) {
        setSelected(null);
        setMeta("Fehler beim Senden. Bitte später erneut versuchen.");
      }
    });
  });
})();
