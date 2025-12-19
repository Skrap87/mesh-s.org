(() => {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector("#navMenu");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  if (!toggle || !menu) return;

  const setExpanded = (v) => toggle.setAttribute("aria-expanded", String(v));

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    setExpanded(open);
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;
    const isInside = menu.contains(e.target) || toggle.contains(e.target);
    if (!isInside) {
      menu.classList.remove("is-open");
      setExpanded(false);
    }
  });

  // smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      menu.classList.remove("is-open");
      setExpanded(false);
    });
  });
})();
