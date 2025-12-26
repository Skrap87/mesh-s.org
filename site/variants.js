(() => {
  const allowedVariants = new Set(["s", "m", "l", "xl"]);
  const storageKey = "meshSVariant";
  const debug = true;
  const isDevHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  const log = (...args) => {
    if (debug) {
      console.log("[variants]", ...args);
    }
  };

  const warn = (...args) => {
    console.warn("[variants]", ...args);
  };

  // 🔍 Добавляем трассировку всех изменений URL
  const originalReplaceState = window.history.replaceState;
  const originalPushState = window.history.pushState;
  
  window.history.replaceState = function(...args) {
    console.trace("🔴 REPLACE STATE CALLED", args[2]);
    return originalReplaceState.apply(this, args);
  };
  
  window.history.pushState = function(...args) {
    console.trace("🔴 PUSH STATE CALLED", args[2]);
    return originalPushState.apply(this, args);
  };

  const normalizeVariantId = (value) => {
    if (!value) return null;
    const normalized = value.toLowerCase();
    return allowedVariants.has(normalized) ? normalized : null;
  };

  const getUrlVariant = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("v")) return null;
    const variant = normalizeVariantId(params.get("v"));
    log("getUrlVariant →", variant);
    return variant;
  };

  const getStoredVariant = () => {
    const variant = normalizeVariantId(localStorage.getItem(storageKey));
    log("getStoredVariant →", variant);
    return variant;
  };

  const setStoredVariant = (variantId) => {
    try {
      log("setStoredVariant →", variantId);
      localStorage.setItem(storageKey, variantId);
    } catch (error) {
      warn("failed to persist variant", error);
    }
  };

  const getCurrentLang = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang") || document.documentElement.lang || "en";
  };

  const updateVariantButtons = (variantId) => {
    log("updateVariantButtons →", variantId);
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

  const applyAssetTargets = (list = []) => {
    if (!Array.isArray(list)) return;
    list.forEach((asset) => {
      if (!asset || !asset.id) return;
      if (!asset.src) {
        log(`skip asset without src: ${asset.id}`);
        return;
      }
      const targets = document.querySelectorAll(`[data-variant-asset="${asset.id}"]`);
      if (!targets.length) {
        log(`missing target for asset: ${asset.id}`);
        return;
      }
      targets.forEach((el) => {
        if (el.tagName === "SOURCE") {
          el.setAttribute("srcset", asset.src);
          return;
        }
        if (el.hasAttribute("data-full")) {
          el.setAttribute("data-full", asset.src);
          if (el.tagName !== "IMG" && el.tagName !== "VIDEO" && el.tagName !== "A") {
            return;
          }
        }
        if (el.tagName === "IMG" || el.tagName === "VIDEO") {
          el.setAttribute("src", asset.src);
          return;
        }
        if (el.tagName === "A") {
          el.setAttribute("href", asset.src);
          return;
        }
        log(`unsupported target for asset ${asset.id}: ${el.tagName}`);
      });
    });
  };

  const applyViewerModel = (src) => {
    if (!src) return;
    if (typeof window.updateViewerModel === "function") {
      window.updateViewerModel(src);
      return;
    }
    log("viewer model update skipped (no handler)");
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

  const applyBomFilter = (activeVariant) => {
    const table = document.querySelector(".bom-table");
    if (!table) return;
    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    const normalizedVariant = (activeVariant || "").toLowerCase();
    tbody.querySelectorAll(".bom-choice-row").forEach((row) => row.remove());

    const rows = Array.from(tbody.querySelectorAll("tr[data-variants]"));
    rows.forEach((row) => {
      row.classList.remove("is-choice");
      const variants = (row.getAttribute("data-variants") || "all").toLowerCase();
      if (variants === "all") {
        row.classList.remove("is-hidden");
        return;
      }
      const allowed = variants
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
      row.classList.toggle("is-hidden", !allowed.includes(normalizedVariant));
    });

    const groups = new Map();
    rows.forEach((row) => {
      if (row.classList.contains("is-hidden")) return;
      const group = row.getAttribute("data-group");
      if (!group) return;
      const list = groups.get(group) || [];
      list.push(row);
      groups.set(group, list);
    });

    const columnCount = table.querySelectorAll("thead th").length || 1;
    groups.forEach((groupRows) => {
      if (groupRows.length < 2) return;
      groupRows.forEach((row) => row.classList.add("is-choice"));

      const choiceRow = document.createElement("tr");
      choiceRow.className = "bom-choice-row";
      const cell = document.createElement("td");
      cell.colSpan = columnCount;
      cell.textContent = "Choose one:";
      choiceRow.appendChild(cell);
      const firstRow = groupRows[0];
      firstRow.parentNode.insertBefore(choiceRow, firstRow);
    });
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
    log("🎨 applyVariant →", variant.id);
    
    const safeApply = (label, condition, action) => {
      if (!condition) {
        log(`skip ${label}`);
        return;
      }
      try {
        action();
        log(`applied ${label}`);
      } catch (error) {
        warn(`failed ${label}`, error);
      }
    };

    safeApply("hero", variant.assets, () => applyHero(variant.assets));
    safeApply("viewerModel", variant.assets?.viewerModel, () => applyViewerModel(variant.assets.viewerModel));
    safeApply("customParts", variant.assets?.customParts, () =>
      applyAssetTargets(variant.assets.customParts)
    );
    safeApply("winter", variant.sections?.winter?.images, () =>
      applyWinterImages(variant.sections.winter.images)
    );
    safeApply("charts", variant.sections?.charts, () => applyCharts(variant.sections.charts));
    safeApply("assembly", variant.assets?.assembly, () => applyAssetTargets(variant.assets.assembly));
    safeApply("bom", variant.assets?.bom, () => applyAssetTargets(variant.assets.bom));

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
    const cacheBuster = isDevHost ? `?t=${Date.now()}` : "";
    const url = `assets/variants/${variantId}/variant.json${cacheBuster}`;
    log("loading variant", { variantId, url });
    try {
      const res = await fetch(url, { cache: isDevHost ? "no-store" : "default" });
      log("fetch status", { variantId, ok: res.ok, status: res.status });
      if (!res.ok) {
        throw new Error(`Variant ${variantId} not found`);
      }
      const data = await res.json();
      if (!data || typeof data !== "object") {
        throw new Error("Invalid variant data");
      }
      log("variant json parsed", { variantId });
      return { id: variantId, ...data };
    } catch (error) {
      warn("variant load failed", error);
      return null;
    }
  };

  const loadVariant = async (variantId) => {
    log("🔄 loadVariant called →", variantId);
    let variant = await fetchVariant(variantId);
    if (!variant && variantId !== "s") {
      variant = await fetchVariant("s");
    }
    if (!variant) {
      updateVariantTitle(" / S");
      warn("variant fallback failed");
      applyBomFilter(variantId);
      return;
    }
    applyVariant(variant);
    applyBomFilter(variant.id || variantId);
  };

  // 🔍 ПОЛНОСТЬЮ УБИРАЕМ автоматическое обновление URL
  // Теперь URL обновляется ТОЛЬКО при первой загрузке
  
  const initVariantSwitch = (currentVariant) => {
    updateVariantButtons(currentVariant);

    document.querySelectorAll(".variant-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.variant;
        if (!allowedVariants.has(next)) return;
        
        log("🖱️ USER CLICKED variant button →", next);
        setStoredVariant(next);
        
        // Обновляем URL напрямую
        const url = new URL(window.location.href);
        url.searchParams.set("v", next);
        log("🔄 Updating URL to →", url.pathname + url.search + url.hash);
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
        
        loadVariant(next);
      });
    });
  };

  // Глобальная функция для получения текущего варианта
  window.getCurrentVariant = () => {
    const variant = getUrlVariant() || getStoredVariant() || "s";
    log("🌐 getCurrentVariant() →", variant);
    return variant;
  };

  // 🔍 Следим за изменениями URL извне
  let lastKnownUrl = window.location.href;
  
  const checkUrlChange = () => {
    if (window.location.href !== lastKnownUrl) {
      const oldUrl = lastKnownUrl;
      lastKnownUrl = window.location.href;
      
      const oldParams = new URLSearchParams(new URL(oldUrl).search);
      const newParams = new URLSearchParams(window.location.search);
      
      const oldV = oldParams.get("v");
      const newV = newParams.get("v");
      
      if (oldV !== newV) {
        console.error("⚠️ VARIANT CHANGED EXTERNALLY!", {
          old: oldV,
          new: newV,
          oldUrl,
          newUrl: window.location.href
        });
      }
    }
  };
  
  setInterval(checkUrlChange, 100);

  document.addEventListener("DOMContentLoaded", () => {
    log("🚀 DOMContentLoaded");
    
    const urlVariant = getUrlVariant();
    let currentVariant = urlVariant;
    
    log("Initial state:", { urlVariant, stored: getStoredVariant() });
    
    if (currentVariant) {
      setStoredVariant(currentVariant);
    } else {
      currentVariant = getStoredVariant() || "s";
      setStoredVariant(currentVariant);
      
      // Устанавливаем URL только если его не было
      const url = new URL(window.location.href);
      url.searchParams.set("v", currentVariant);
      log("🔄 Initial URL setup →", url.pathname + url.search + url.hash);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
    
    initVariantSwitch(currentVariant);
    updateViewerLinks(currentVariant);
    loadVariant(currentVariant);
  });
})();