(() => {
  const allowedVariants = new Set(["s", "m", "l", "xl"]);
  const debug = false;

  const log = (...args) => {
    if (debug) {
      console.log("[variants]", ...args);
    }
  };

  const parseVariantId = () => {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("v") || "s").toLowerCase();
    return allowedVariants.has(raw) ? raw : "s";
  };

  const getCurrentLang = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang") || document.documentElement.lang || "en";
  };

  const updateVariantButtons = (variantId) => {
    document.querySelectorAll(".variant-option").forEach((btn) => {
      const isActive = btn.dataset.variant === variantId;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const updateViewerLinks = (variantId) => {
    const lang = getCurrentLang();
    document.querySelectorAll("[data-variant-viewer-link]").forEach((link) => {
      const href = link.getAttribute("href") || "viewer.html";
      const url = new URL(href, window.location.origin);
      url.searchParams.set("v", variantId);
      if (lang) {
        url.searchParams.set("lang", lang);
      }
      link.setAttribute("href", url.pathname + url.search + url.hash);
    });
  };

  const applyHero = (assets = {}) => {
    if (assets.heroImageWebp) {
      const source = document.querySelector("[data-variant-hero-webp]");
      if (source) {
        source.setAttribute("srcset", assets.heroImageWebp);
      }
    }
    if (assets.heroImage) {
      const img = document.querySelector("[data-variant-hero-img]");
      if (img) {
        img.setAttribute("src", assets.heroImage);
      }
    }
  };

  const applyWinterImages = (images = []) => {
    images.forEach((item) => {
      if (!item || !item.selector) return;
      const el = document.querySelector(item.selector);
      if (!el) return;

      if (item.src) {
        if (el.tagName === "SOURCE") {
          el.setAttribute("srcset", item.src);
        } else {
          el.setAttribute("src", item.src);
        }
      }

      if (item.altKey && el.tagName === "IMG") {
        el.setAttribute("data-i18n-alt", item.altKey);
      }
    });

    if (typeof applyTranslations === "function") {
      applyTranslations(getCurrentLang());
    }
  };

  const applyCharts = (charts = {}) => {
    Object.values(charts).forEach((chart) => {
      if (!chart || !chart.selector) return;
      const el = document.querySelector(chart.selector);
      if (!el) return;
      if (chart.json) {
        el.setAttribute("data-json", chart.json);
      }
      if (chart.unit) {
        el.setAttribute("data-unit", chart.unit);
      }
    });

    if (typeof window.renderAllCharts === "function") {
      window.renderAllCharts();
    }
  };

  const resolveVariantSuffix = (variant) => {
    if (!variant || !variant.labels) return "";
    if (variant.labels.badge) {
      return ` / ${variant.labels.badge}`;
    }
    if (variant.labels.full) {
      const trimmed = variant.labels.full.replace(/^MESH-S/i, "").trim();
      if (!trimmed) return "";
      return trimmed.startsWith("/") ? ` ${trimmed}` : ` / ${trimmed}`;
    }
    return "";
  };

  const updateVariantTitle = (suffix) => {
    const title = document.querySelector("[data-variant-title]");
    if (!title) return;
    title.textContent = suffix || "";
  };

  const applyVariant = (variant) => {
    if (!variant) return;

    if (variant.assets) {
      applyHero(variant.assets);
    }

    if (variant.sections) {
      if (variant.sections.winter && variant.sections.winter.images) {
        applyWinterImages(variant.sections.winter.images);
      }
      if (variant.sections.charts) {
        applyCharts(variant.sections.charts);
      }
    }

    if (variant.labels) {
      const badge = document.querySelector("[data-variant-badge]");
      if (badge && variant.labels.badge) {
        badge.textContent = variant.labels.badge;
      }
      const full = document.querySelector("[data-variant-full]");
      if (full && variant.labels.full) {
        full.textContent = variant.labels.full;
      }
    }

    updateVariantTitle(resolveVariantSuffix(variant));

    if (variant.i18n && variant.i18n.modelLineKey) {
      const modelLine = document.querySelector("[data-variant-model-line]");
      if (modelLine) {
        modelLine.setAttribute("data-i18n", variant.i18n.modelLineKey);
        if (typeof applyTranslations === "function") {
          applyTranslations(getCurrentLang());
        }
      }
    }

    updateViewerLinks(variant.id || "s");
    updateVariantButtons(variant.id || "s");
  };

  const fetchVariant = async (variantId) => {
    try {
      const res = await fetch(`assets/variants/${variantId}/variant.json`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Variant ${variantId} not found`);
      }
      const data = await res.json();
      if (!data || typeof data !== "object") {
        throw new Error("Invalid variant data");
      }
      return { id: variantId, ...data };
    } catch (error) {
      log(error);
      return null;
    }
  };

  const loadVariant = async (variantId) => {
    let variant = await fetchVariant(variantId);
    if (!variant && variantId !== "s") {
      variant = await fetchVariant("s");
    }
    if (!variant) {
      updateVariantTitle(" / S");
      return;
    }
    applyVariant(variant);
  };

  const updateUrlVariant = (variantId) => {
    const url = new URL(window.location.href);
    url.searchParams.set("v", variantId);
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  };

  const initVariantSwitch = (currentVariant) => {
    updateVariantButtons(currentVariant);

    document.querySelectorAll(".variant-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.variant;
        if (!allowedVariants.has(next)) return;
        updateUrlVariant(next);
        loadVariant(next);
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const currentVariant = parseVariantId();
    initVariantSwitch(currentVariant);
    updateViewerLinks(currentVariant);
    loadVariant(currentVariant);
  });
})();
