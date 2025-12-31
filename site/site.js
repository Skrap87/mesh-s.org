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
  const buttons = root.querySelectorAll(".rating-btn[data-rate]");
  if (!buttons.length) return;

  // ключ "уже голосовал" — локально, чтобы не спамили с одного браузера
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const variant =
    (typeof window.getCurrentVariant === "function" ? window.getCurrentVariant() : null) ||
    new URLSearchParams(location.search).get("v") ||
    localStorage.getItem("meshSVariant") ||
    "s";

  const storageKey = `meshSRatingDone:${page}`;

  // URL API (позже сделаем Cloudflare Worker именно под этот путь)
  const API_BASE = "/api/rating";

  function setMeta(text) {
    if (meta) meta.textContent = text || "";
  }

  function setSelected(value) {
    buttons.forEach((b) => {
      b.classList.toggle("is-selected", b.getAttribute("data-rate") === String(value));
    });
  }

  async function loadSummary() {
    try {
      const url = `${API_BASE}?page=${encodeURIComponent(page)}`;
      const r = await fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      // ожидаем: { avg: number, count: number }
      if (typeof data?.avg === "number" && typeof data?.count === "number") {
        setMeta(`Gesamtbewertung: Ø ${data.avg.toFixed(1)} / 10 (basierend auf ${data.count} Bewertungen)`);
      }
    } catch (_) {
      // если API ещё не готов — просто молчим
    }
  }

  async function sendVote(value) {
    const body = {
	  page,
	  value: Number(value),
	};

    const r = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json(); // ожидаем: { avg, count }
  }

  // первичная загрузка средней оценки (когда API появится)
  loadSummary();

  const already = localStorage.getItem(storageKey);
  if (already) setMeta("Danke! Du hast bereits bewertet.");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (localStorage.getItem(storageKey)) {
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
          setMeta(`Danke! Ø ${data.avg.toFixed(1)} / 10 · ${data.count} Stimmen`);
        } else {
          setMeta("Danke! Bewertung gespeichert.");
        }
      } catch (e) {
        // если API ещё не создан — откатим выбор и покажем понятное сообщение
        setSelected(null);
        setMeta("API ist noch nicht aktiv (Server fehlt). Nächster Schritt: Worker einrichten.");
      }
    });
  });
})();
