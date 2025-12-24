(() => {
  const DEFAULT_VARIANT = "s";
  const VARIANTS = ["s", "m", "l", "xl"];

  const getVariantId = () => {
    const params = new URLSearchParams(window.location.search);
    const variant = params.get("v");
    return VARIANTS.includes(variant) ? variant : DEFAULT_VARIANT;
  };

  const fetchVariant = async (variantId) => {
    try {
      const res = await fetch(`/assets/variants/mesh-s-${variantId}.json`, { cache: "no-store" });
      if (!res.ok) {
        return null;
      }
      return await res.json();
    } catch (error) {
      return null;
    }
  };

  const loadVariant = async (variantId) => {
    const normalized = VARIANTS.includes(variantId) ? variantId : DEFAULT_VARIANT;
    const data = await fetchVariant(normalized);
    if (data) {
      return data;
    }
    if (normalized !== DEFAULT_VARIANT) {
      return await fetchVariant(DEFAULT_VARIANT);
    }
    return null;
  };

  const updateVariantLinks = (activeId) => {
    document.querySelectorAll(".variant-option").forEach((link) => {
      const variant = link.dataset.variant;
      if (!variant) return;
      const url = new URL(window.location.href);
      url.searchParams.set("v", variant);
      link.setAttribute("href", url.pathname + url.search + url.hash);

      const isActive = variant === activeId;
      link.classList.toggle("is-active", isActive);
      link.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const updateHeroImage = (variantData) => {
    const heroImage = document.querySelector(".hero-visual img");
    const heroSource = document.querySelector(".hero-visual source");
    const assets = variantData.assets || {};
    if (heroImage && assets.heroImage) {
      heroImage.src = assets.heroImage;
    }
    if (heroSource && assets.heroImageWebp) {
      heroSource.srcset = assets.heroImageWebp;
    }
  };

  const updateModelLine = (variantData) => {
    const modelLine = document.querySelector("[data-variant-model-line]");
    if (!modelLine) return;

    const lang = document.documentElement.lang || "en";
    const key = variantData.hero?.modelLineKey || "variant.modelLine";
    const template = window.getTranslation ? window.getTranslation(lang, key) : null;
    const size = variantData.size || variantData.labels?.badge || "S";
    const text = (template || "Solar Meshtastic Node — Size {size}").replace("{size}", size);
    modelLine.textContent = text;
  };

  const updateCharts = (variantData) => {
    const charts = variantData.charts || {};
    Object.entries(charts).forEach(([key, chart]) => {
      const chartEl = document.querySelector(`[data-chart="${key}"]`);
      if (!chartEl) return;
      if (chart.json) {
        chartEl.setAttribute("data-json", chart.json);
      }
      if (chart.unit) {
        chartEl.setAttribute("data-unit", chart.unit);
      }
    });

    if (typeof window.renderAllCharts === "function") {
      window.renderAllCharts();
    }
  };

  const applyVariant = (variantData) => {
    if (!variantData) return;
    window.currentVariantSize = variantData.size || variantData.labels?.badge || "S";
    updateVariantLinks(variantData.id || DEFAULT_VARIANT);
    updateModelLine(variantData);
    updateHeroImage(variantData);
    updateCharts(variantData);
  };

  const init = async () => {
    const variantId = getVariantId();
    const variantData = await loadVariant(variantId);
    if (!variantData) return;
    applyVariant(variantData);

    window.addEventListener("languagechange", () => {
      updateModelLine(variantData);
      updateVariantLinks(variantData.id || DEFAULT_VARIANT);
    });
  };

  window.MeshVariants = {
    getVariantId,
    loadVariant,
    applyVariant
  };

  document.addEventListener("DOMContentLoaded", init);
})();
