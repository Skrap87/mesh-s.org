const deepMerge = (base, override) => {
  const result = { ...base };
  if (!override || typeof override !== "object") {
    return result;
  }

  Object.keys(override).forEach((key) => {
    const baseValue = result[key];
    const overrideValue = override[key];

    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === "object" &&
      typeof overrideValue === "object" &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  });

  return result;
};

const i18nParts = window.I18N_PARTS || {};

const buildTranslations = (lang) =>
  deepMerge(
    i18nParts[lang] && i18nParts[lang].common ? i18nParts[lang].common : {},
    i18nParts[lang] && i18nParts[lang].variants ? i18nParts[lang].variants : {}
  );

const translations = {
  en: buildTranslations("en"),
  de: buildTranslations("de"),
  ru: buildTranslations("ru")
};

const supportedLanguages = ["de", "en"];

const getTranslation = (lang, key) => {
  const segments = key.split(".");
  let current = translations[lang];
  for (const segment of segments) {
    if (!current || typeof current !== "object" || !(segment in current)) {
      return null;
    }
    current = current[segment];
  }
  return current;
};

const applyTranslations = (lang) => {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getTranslation(lang, key);
    if (value !== null) {
      if (typeof value === "string" && value.includes("<br")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  });

  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-label");
    const value = getTranslation(lang, key);
    if (value !== null) {
      el.setAttribute("data-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    const value = getTranslation(lang, key);
    if (value !== null) {
      el.setAttribute("alt", value);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    const value = getTranslation(lang, key);
    if (value !== null) {
      el.setAttribute("title", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const value = getTranslation(lang, key);
    if (value !== null) {
      el.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll(".lang-option").forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

const updateLinks = (lang) => {
  const links = document.querySelectorAll("a[href]");

  // 🔧 КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: получаем вариант через глобальную функцию
  const currentV = (typeof window.getCurrentVariant === "function")
    ? window.getCurrentVariant()
    : (new URLSearchParams(window.location.search).get("v") || localStorage.getItem("meshSVariant") || "").toLowerCase();

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    // Якорь на текущей странице
    if (href.startsWith("#")) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      
      // 🔧 Сохраняем текущий вариант, не изменяя его
      if (currentV) {
        url.searchParams.set("v", currentV);
      }
      
      url.hash = href;
      link.setAttribute("href", url.pathname + url.search + url.hash);
      return;
    }

    // Обычные внутренние страницы
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    url.searchParams.set("lang", lang);
    
    // 🔧 Добавляем вариант только если его ещё нет в ссылке
    if (currentV && !url.searchParams.has("v")) {
      url.searchParams.set("v", currentV);
    }

    link.setAttribute("href", url.pathname + url.search + url.hash);
  });
};

const setLanguage = (lang, { updateUrl } = { updateUrl: true }) => {
  if (!supportedLanguages.includes(lang)) {
    lang = "en";
  }

  localStorage.setItem("site_lang", lang);
  applyTranslations(lang);
  updateLinks(lang);

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    
    // 🔧 Сохраняем текущий вариант при смене языка
    const currentV = (typeof window.getCurrentVariant === "function")
      ? window.getCurrentVariant()
      : new URLSearchParams(window.location.search).get("v");
    
    if (currentV) {
      url.searchParams.set("v", currentV);
    }
    
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }
};

const detectLanguage = () => {
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get("lang");
  if (supportedLanguages.includes(paramLang)) {
    return paramLang;
  }

  const storedLang = localStorage.getItem("site_lang");
  if (supportedLanguages.includes(storedLang)) {
    return storedLang;
  }

  const browserLang = navigator.language || "";
  return browserLang.toLowerCase().startsWith("de") ? "de" : "en";
};

document.addEventListener("DOMContentLoaded", () => {
  const initialLang = detectLanguage();
  setLanguage(initialLang, { updateUrl: true });

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.lang;
      setLanguage(selected, { updateUrl: true });
    });
  });

  document.querySelectorAll(".nav-more-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      const details = link.closest("details");
      if (details) {
        details.removeAttribute("open");
      }
    });
  });
});