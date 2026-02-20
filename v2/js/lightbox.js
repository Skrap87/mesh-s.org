(() => {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (!box || !img || !cap) return;

  let lastFocus = null;

  const lockScroll = () => {
    document.body.classList.add("scroll-locked");
  };

  const unlockScroll = () => {
    document.body.classList.remove("scroll-locked");
  };

  const focusInside = () => {
    // Versuche, den Schließen-Button zu fokussieren, andernfalls den Dialog selbst
    const closeBtn =
      box.querySelector(".lightbox-close") ||
      box.querySelector("[data-close]");

    if (closeBtn && typeof closeBtn.focus === "function") {
      closeBtn.focus();
      return;
    }

    // Fallback: mache die Lightbox fokussierbar und fokussiere sie
    if (!box.hasAttribute("tabindex")) box.setAttribute("tabindex", "-1");
    box.focus?.();
  };

	const close = () => {
	  box.classList.remove("is-open");

	  // Zuerst den Fokus zurückgeben
	  if (lastFocus && typeof lastFocus.focus === "function") {
		lastFocus.focus();
	  }
	  lastFocus = null;

	  // Jetzt Fokus und a11y-Zugriff verbieten
	  box.setAttribute("inert", "");

	  unlockScroll();
	  img.src = "";
	  img.alt = "";
	  cap.textContent = "";
	};

	const open = (src, caption) => {
	  if (!src) return;

	  lastFocus = document.activeElement;

	  img.src = src;
	  img.alt = caption || "";
	  cap.textContent = caption || "";

	  // Fokus und a11y-Zugriff erlauben
	  box.removeAttribute("inert");

	  box.classList.add("is-open");
	  lockScroll();

	  // Fokus nach innen
	  const closeBtn =
		box.querySelector(".lightbox-close") ||
		box.querySelector("[data-close]");
	  closeBtn?.focus();
	};

  document.addEventListener("click", (event) => {
    const thumb = event.target.closest(".bom-thumb, .gallery-item");
    if (thumb) {
      event.preventDefault();
      event.stopPropagation();
      const full = thumb.getAttribute("data-full");
      const alt = thumb.querySelector("img")?.getAttribute("alt") || "";
      open(full, alt);
      return;
    }

    if (event.target.closest("[data-close]")) {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && box.classList.contains("is-open")) {
      event.preventDefault();
      close();
    }
  });
})();
