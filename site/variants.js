(() => {
  const allowedVariants = new Set(["s", "m", "l", "xl"]);
  const storageKey = "meshSVariant";
  const debug = false; // Отключаем debug в продакшене
  const isDevHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  const log = (...args) => {
    if (debug) {
      console.log("[variants]", ...args);
    }
  };

  const warn = (...args) => {
    console.warn("[variants]", ...args);
  };

  const normalizeVariantId = (value) => {
    if (!value) return null;
    const normalized = value.toLowerCase();
    return allowedVariants.has(normalized) ? normalized : null;
  };

  const getUrlVariant = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("v")) return null;
    return normalizeVariantId(params.get("v"));
  };

  const getStoredVariant = () => normalizeVariantId(localStorage.getItem(storageKey));

  const setStoredVariant = (variantId) => {
    try {
      localStorage.setItem(storageKey, variantId);
      log("setStoredVariant →", variantId);
    } catch (error) {
      warn("failed to persist variant", error);
    }
  };

  const updateVariantButtons = (variantId) => {
    document.querySelectorAll(".variant-option").forEach((btn) => {
      const isActive = btn.dataset.variant === variantId;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const updateViewerLinks = (variantId) => {
    document.querySelectorAll("[data-variant-viewer-link]").forEach((link) => {
      const href = link.getAttribute("href") || "viewer.html";
      const url = new URL(href, window.location.origin);
      url.searchParams.set("v", variantId);
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

      if (item.alt && el.tagName === "IMG") {
        el.setAttribute("alt", item.alt);
      }
    });
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
    const choiceLabel =
      document.getElementById("bom-choice-label")?.textContent?.trim() || "Wähle eine Option:";
    groups.forEach((groupRows) => {
      if (groupRows.length < 2) return;
      groupRows.forEach((row) => row.classList.add("is-choice"));

      const choiceRow = document.createElement("tr");
      choiceRow.className = "bom-choice-row";
      const cell = document.createElement("td");
      cell.colSpan = columnCount;
      cell.textContent = choiceLabel;
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
    document.querySelectorAll("[data-variant-title]").forEach((el) => {
		el.textContent = suffix || "";
		});
	};

  const applyVariant = (variant) => {
    if (!variant) return;
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
    log("activate variant", variantId);
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

  const initVariantSwitch = (currentVariant) => {
    updateVariantButtons(currentVariant);

    document.querySelectorAll(".variant-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.variant;
        if (!allowedVariants.has(next)) return;
        
        log("User clicked variant:", next);
        
        // Обновляем localStorage
        setStoredVariant(next);
        
        // Обновляем URL
        const url = new URL(window.location.href);
        url.searchParams.set("v", next);
        window.history.replaceState({}, "", url.pathname + url.search + url.hash);
        
        // Загружаем новый вариант
        loadVariant(next);
      });
    });
  };

  window.getCurrentVariant = () => {
    const params = new URLSearchParams(window.location.search);
    const urlVariant = normalizeVariantId(params.get("v"));
    if (urlVariant) {
      return urlVariant;
    }

    const stored = getStoredVariant();
    if (stored) {
      return stored;
    }

    return "s";
  };

  // Инициализация при загрузке страницы
  const initializeVariant = () => {
    const urlVariant = getUrlVariant();
    const storedVariant = getStoredVariant();
    
    let variant;
    
    // 🔑 ПРИОРИТЕТ: URL имеет высший приоритет
    if (urlVariant) {
      variant = urlVariant;
      // Синхронизируем localStorage с URL
      if (storedVariant !== urlVariant) {
        setStoredVariant(urlVariant);
      }
    } else if (storedVariant) {
      variant = storedVariant;
      // Добавляем в URL, если его там не было
      const url = new URL(window.location.href);
      url.searchParams.set("v", storedVariant);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } else {
      variant = "s";
      setStoredVariant("s");
      const url = new URL(window.location.href);
      url.searchParams.set("v", "s");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
    
    log("Variant initialized:", variant);
    return variant;
  };

  // Инициализируем сразу
  const initialVariant = initializeVariant();

  document.addEventListener("DOMContentLoaded", () => {
    initVariantSwitch(initialVariant);
    updateViewerLinks(initialVariant);
    loadVariant(initialVariant);
  });
})();
