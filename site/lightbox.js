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
    // Пытаемся сфокусировать кнопку закрытия, иначе сам диалог
    const closeBtn =
      box.querySelector(".lightbox-close") ||
      box.querySelector("[data-close]");

    if (closeBtn && typeof closeBtn.focus === "function") {
      closeBtn.focus();
      return;
    }

    // Фолбэк: делаем box фокусируемым и фокусируем
    if (!box.hasAttribute("tabindex")) box.setAttribute("tabindex", "-1");
    box.focus?.();
  };

	const close = () => {
	  box.classList.remove("is-open");

	  // вернуть фокус наружу СНАЧАЛА
	  if (lastFocus && typeof lastFocus.focus === "function") {
		lastFocus.focus();
	  }
	  lastFocus = null;

	  // теперь запрещаем фокус и a11y-доступ
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

	  // разрешаем фокус и a11y-доступ
	  box.removeAttribute("inert");

	  box.classList.add("is-open");
	  lockScroll();

	  // фокус внутрь
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
