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
