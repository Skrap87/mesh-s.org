(() => {
  const allowedVariants = new Set(["s", "m", "l", "xl"]);
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

  const applyBomFilter = (activeVariant) => {
    const table = document.querySelector(".bom-table");
    if (!table) return;

    const rows = Array.from(table.querySelectorAll("tbody tr[data-variants]"));
    rows.forEach((row) => {
      const variants = (row.dataset.variants || "all").toLowerCase();
      const isVisible =
        variants === "all" ||
        variants
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
          .includes(activeVariant);
      row.classList.toggle("is-hidden", !isVisible);
    });

    table.querySelectorAll("tbody tr.bom-choice-row").forEach((row) => row.remove());
    rows.forEach((row) => row.classList.remove("is-choice"));

    const labelSource = document.getElementById("bom-choice-label");
    const labelText = labelSource?.textContent.trim() || "Choose one:";
    const groups = new Map();

    rows.forEach((row) => {
      if (row.classList.contains("is-hidden")) return;
      const group = row.dataset.group;
      if (!group) return;
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group).push(row);
    });

    groups.forEach((groupRows, groupName) => {
      if (groupRows.length < 2) return;
      groupRows.forEach((row) => row.classList.add("is-choice"));
      const firstRow = groupRows[0];
      const choiceRow = document.createElement("tr");
      choiceRow.className = "bom-choice-row";
      choiceRow.setAttribute("data-choice-group", groupName);
      const cell = document.createElement("td");
      cell.colSpan = firstRow.children.length;
      cell.textContent = labelText;
      choiceRow.appendChild(cell);
      firstRow.parentElement.insertBefore(choiceRow, firstRow);
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
    applyBomFilter(variantId);
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
