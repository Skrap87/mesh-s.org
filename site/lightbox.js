(() => {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (!box || !img || !cap) return;

  let scrollLocked = false;
  let scrollY = 0;

  const lockScroll = () => {
    if (scrollLocked) return;
    scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = -scrollY + "px";
    scrollLocked = true;
  };

  const unlockScroll = () => {
    if (!scrollLocked) return;
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
    scrollLocked = false;
  };

  const close = () => {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    unlockScroll();
    img.src = "";
    img.alt = "";
    cap.textContent = "";
  };

  const open = (src, caption) => {
    if (!src) return;
    img.src = src;
    img.alt = caption || "";
    cap.textContent = caption || "";
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    lockScroll();
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
      close();
    }
  });
})();
