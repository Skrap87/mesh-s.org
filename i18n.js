const translations = {
  en: {
    meta: {
      title: "MESH-S — Meshtastic Solar Node"
    },
    nav: {
      hero: "Home",
      benefits: "Benefits",
      autonomy: "Autonomy",
      winter: "Winter",
      exploded: "Exploded",
      customParts: "Custom parts",
      assembly: "Assembly",
      moisture: "Moisture",
      mounting: "Mounting",
      bom: "BOM",
      more: "More",
      telegram: "Telegram @skrap87",
      github: "GitHub"
    },
    lang: {
      aria: "Language switcher"
    },
    hero: {
      eyebrow: "Meshtastic Solar Node",
      subtitle: "Autonomous • Solar • Mesh Node",
      tagline: "Designed for year-round outdoor operation",
      ctaAutonomy: "See autonomy proof",
      ctaBom: "Packages & BOM",
      imageAlt: "MESH-S autonomous solar mesh node"
    },
    benefits: {
      eyebrow: "Key benefits",
      title: "Built for real outdoor mesh networks",
      cards: {
        solar: {
          title: "Solar powered",
          text: "Designed for continuous autonomous energy harvesting."
        },
        winter: {
          title: "Proven winter autonomy",
          text: "Validated performance with real telemetry in low light."
        },
        enclosure: {
          title: "Weather sealed ASA enclosure",
          text: "Durable housing engineered for outdoor exposure."
        },
        modular: {
          title: "Modular & serviceable",
          text: "Field-friendly layout with replaceable core modules."
        }
      }
    },
    autonomy: {
      eyebrow: "Telemetry",
      title: "Proof of autonomy",
      subtitle: "Real Home Assistant telemetry from deployed nodes.",
      list: {
        charge: "Charge current",
        voltage: "Battery voltage",
        days: "Days without sun"
      },
      graphs: {
        charge: {
          title: "Charge current",
          note: "HA history export",
          alt: "Charge current over time"
        },
        battery: {
          title: "Battery level",
          note: "HA history export",
          alt: "Battery level over time"
        }
      }
    },
    winter: {
      eyebrow: "Reliability",
      title: "Why it doesn't die in winter",
      list: {
        capacity: "Oversized battery capacity",
        profile: "Conservative power profile",
        diffuse: "Works in diffuse light",
        moving: "No moving parts",
        design: "Cold & moisture aware design"
      },
      cards: {
        field: {
          title: "Field photo",
          note: "Sub-zero morning",
          alt: "MESH-S node outdoors in sub-zero morning with condensation"
        },
        temp: {
          title: "Temperature",
          note: "Winter week sample",
          alt: "Temperature during winter week"
        }
      }
    },
    exploded: {
      eyebrow: "Hardware layout",
      title: "Exploded view",
      imageAlt: "MESH-S exploded view – internal hardware layout",
      custom: {
        eyebrow: "Custom parts",
        note: "Only the parts designed and printed for MESH-S. Off-the-shelf components are intentionally omitted."
      },
      legend: {
        enclosure: {
          title: "ASA enclosure",
          desc: "UV-stable printed housing",
          alt: "ASA enclosure"
        },
        lid: {
          title: "Mounting lid",
          desc: "Universal round & rectangular mount",
          alt: "Mounting lid"
        },
        spacer: {
          title: "Spacer plate",
          desc: "Modular electronics mounting interface",
          alt: "Spacer plate"
        },
        silica: {
          title: "Silica compartment",
          desc: "Humidity control module",
          alt: "Silica compartment"
        }
      }
    },
    assembly: {
      eyebrow: "Build process",
      title: "Assembly in 6 steps",
      steps: {
        step1: {
          title: "Mount power core",
          text: "Mount MPPT controller and main node board on the spacer plate. The modular design allows layout changes without redesigning the enclosure.",
          alt: "Step 01 – mount spacer plate"
        },
        step2: {
          title: "Fit battery pack",
          text: "Install and secure the 4×18650 battery pack. Battery modules are mounted after the power core for proper alignment and cable routing.",
          alt: "Step 02 – fit battery pack"
        },
        step3: {
          title: "Attach antenna path",
          text: "Connect and lock the RF path (U.FL → N-Type). The coaxial cable is routed and secured before closing the enclosure.",
          alt: "Step 03 – Attach antenna path"
        },
        step4: {
          title: "Seal enclosure",
          text: "Apply gasket and close the housing. A perimeter gasket ensures long-term weather resistance.",
          alt: "Step 04 – Seal enclosure"
        },
        step5: {
          title: "Test power & mesh",
          text: "Power on and verify system operation. Check power stability, node startup, and LoRa mesh connectivity.",
          alt: "Step 05 – Test power & mesh"
        },
        step6: {
          title: "Deploy outdoors",
          text: "The device is ready for permanent outdoor installation and autonomous operation.",
          alt: "Step 06 – Deploy outdoors"
        }
      }
    },
    moisture: {
      eyebrow: "Protection",
      title: "Moisture protection",
      cards: {
        sealed: {
          title: "Fully sealed architecture",
          sub: "No external interfaces",
          text: "The enclosure has no external service ports or connectors. Access to electronics is only possible by opening the housing, eliminating potential ingress points for moisture."
        },
        gasket: {
          title: "Silicone gasket",
          sub: "Full perimeter sealing",
          text: "A continuous silicone gasket seals the enclosure halves, providing a reliable barrier against rain, splashes, and humidity."
        },
        vent: {
          title: "Pressure equalization vent",
          sub: "Membrane-based breathing",
          text: "A pressure equalization membrane balances internal pressure changes caused by temperature fluctuations without allowing moisture ingress."
        },
        silica: {
          title: "Silica gel compartment",
          sub: "Passive humidity control",
          text: "An internal silica gel compartment captures residual moisture, protecting electronics from condensation over long-term outdoor use."
        }
      }
    },
    mounting: {
      eyebrow: "Installation",
      title: "Mounting & installation",
      imageAlt: "Quick-release mounting mechanism",
      cards: {
        universal: {
          title: "Universal mounting system",
          sub: "Modular attachment interface",
          text: "The mounting lid is designed as a universal attachment interface, allowing the node to be installed on a wide range of structures without adapters or enclosure modifications."
        },
        round: {
          title: "Round structures",
          sub: "10 mm – 60 mm diameter",
          text: "Supports vertical and horizontal poles with diameters from 10 mm to 60 mm. Two mounting hole offsets provide flexibility in positioning, allowing the use of cable ties or metal clamps."
        },
        rectangular: {
          title: "Rectangular profiles",
          sub: "10×10 mm – 60×60 mm",
          text: "An integrated profile geometry enables secure mounting on rectangular structures such as aluminum profiles and frames from 10×10 mm up to 60×60 mm."
        },
        quickRelease: {
          title: "Quick-release bracket",
          sub: "Optional accessory",
          text: "A dedicated quick-release bracket allows the node to snap into place using a mechanical latch system. Two release levers disengage four locking pins, enabling fast removal without tools or enclosure disassembly."
        },
        magnetic: {
          title: "Magnetic mounting option",
          sub: "Optional configuration",
          text: "The bracket supports optional high-strength magnets (up to Ø56 mm), allowing temporary installation on metal structures while keeping the node fully removable."
        }
      }
    },
    bom: {
      eyebrow: "Packages",
      title: "Packages & BOM",
      subtitle: "Configuration options and bill of materials overview.",

      plannedTitle: "Planned configuration tiers",

      tier1: "DIY Kit — printed enclosure parts, seals and mounting hardware",
      tier2: "Electronics Bundle — controller, LoRa module and power electronics",
      tier3: "Assembled Node — fully assembled and tested solar node",
      tier4: "Pro / Custom — custom battery, panel, sensors or mounting",

      bomTitle: "Bill of materials (BOM)",

      bom1: "Enclosure: ASA body, gasket, silica gel compartment, screws",
      bom2: "Power: solar panel, MPPT charger, 18650 / 26650 cells",
      bom3: "Radio: Meshtastic node, LoRa module, antenna, RF adapter",
      bom4: "Mounting: universal bracket, clamps or zip ties, hardware",

      note: "This section is intentionally kept minimal until hardware revisions are finalized."
    },
    footer: {
      rights: "All rights reserved.",
      top: "Top",
      home: "Home",
      privacy: "Privacy",
      impressum: "Legal notice",
      github: "GitHub",
      telegram: "@skrap87"
    },
    cookie: {
      aria: "Cookie notice",
      text: "This website uses only technically necessary cookies to ensure the site operates.",
      link: "Privacy policy",
      button: "OK"
    },
    privacy: {
      metaTitle: "Privacy policy – MESH-S",
      eyebrow: "Privacy",
      title: "Privacy policy",
      subtitle1: "This website does not use tracking, analytics, or marketing cookies. Only technically necessary cookies are used to ensure the site operates.",
      subtitle2: "Your consent to the cookie notice is stored locally in your browser (localStorage) so the notice is not shown on every visit.",
      back: "Back to home"
    },
    impressum: {
      metaTitle: "Legal notice – MESH-S",
      eyebrow: "Legal",
      title: "Legal notice",
      section1: "Information according to § 5 TMG",
      responsibleTitle: "Responsible for the content of this website:",
      name: "Eduard Herzog",
      country: "Germany",
      contactTitle: "Contact:",
      contactLabel: "Telegram:",
      contactHandle: "@skrap87",
      projectLine1: "This website presents a technical project.",
      projectLine2: "Products may be sold via external platforms (e.g. Etsy).",
      liabilityTitle: "Liability for content:",
      liabilityText: "As a service provider, I am responsible for my own content on these pages in accordance with § 7 para.1 TMG and general laws.",
      linksTitle: "Liability for links:",
      linksText: "This website contains links to external third-party websites, over whose content I have no influence.",
      back: "Back to home"
    }
  },
  de: {
    meta: {
      title: "MESH-S — Meshtastic Solar Node"
    },
    nav: {
      hero: "Start",
      benefits: "Vorteile",
      autonomy: "Autonomie",
      winter: "Winter",
      exploded: "Explosionsansicht",
      customParts: "Sonderteile",
      assembly: "Montage",
      moisture: "Feuchtigkeit",
      mounting: "Befestigung",
      bom: "Stückliste",
      more: "Mehr",
      telegram: "Telegram @skrap87",
      github: "GitHub"
    },
    lang: {
      aria: "Sprachumschalter"
    },
    hero: {
      eyebrow: "Meshtastic-Solarknoten",
      subtitle: "Autonom • Solar • Mesh-Knoten",
      tagline: "Für ganzjährigen Außeneinsatz entwickelt",
      ctaAutonomy: "Autonomie-Nachweis ansehen",
      ctaBom: "Pakete & Stückliste",
      imageAlt: "MESH-S autonomer solarer Mesh-Knoten"
    },
    benefits: {
      eyebrow: "Hauptvorteile",
      title: "Für echte Outdoor-Mesh-Netze gebaut",
      cards: {
        solar: {
          title: "Solarbetrieben",
          text: "Ausgelegt für kontinuierliche autonome Energiegewinnung."
        },
        winter: {
          title: "Bewährte Winterautonomie",
          text: "Validierte Leistung mit realer Telemetrie bei wenig Licht."
        },
        enclosure: {
          title: "Wetterdichtes ASA-Gehäuse",
          text: "Robustes Gehäuse für den Außeneinsatz."
        },
        modular: {
          title: "Modular & wartbar",
          text: "Feldtaugliches Layout mit austauschbaren Kernmodulen."
        }
      }
    },
    autonomy: {
      eyebrow: "Telemetrie",
      title: "Nachweis der Autonomie",
      subtitle: "Echte Home-Assistant-Telemetrie von eingesetzten Knoten.",
      list: {
        charge: "Ladestrom",
        voltage: "Batteriespannung",
        days: "Tage ohne Sonne"
      },
      graphs: {
        charge: {
          title: "Ladestrom",
          note: "HA-Verlaufs-Export",
          alt: "Ladestrom im Zeitverlauf"
        },
        battery: {
          title: "Batteriestand",
          note: "HA-Verlaufs-Export",
          alt: "Batteriestand im Zeitverlauf"
        }
      }
    },
    winter: {
      eyebrow: "Zuverlässigkeit",
      title: "Warum es im Winter nicht ausfällt",
      list: {
        capacity: "Übergroße Batteriekapazität",
        profile: "Konservatives Energieprofil",
        diffuse: "Funktioniert bei diffusem Licht",
        moving: "Keine beweglichen Teile",
        design: "Kälte- und feuchtebewusstes Design"
      },
      cards: {
        field: {
          title: "Feldfoto",
          note: "Morgen unter 0 °C",
          alt: "MESH-S-Knoten im Freien an einem Morgen unter 0 °C mit Kondensation"
        },
        temp: {
          title: "Temperatur",
          note: "Winterwoche (Beispiel)",
          alt: "Temperatur während einer Winterwoche"
        }
      }
    },
    exploded: {
      eyebrow: "Hardware-Layout",
      title: "Explosionsansicht",
      imageAlt: "MESH-S-Explosionsansicht – internes Hardware-Layout",
      custom: {
        eyebrow: "Sonderteile",
        note: "Nur die für MESH-S konstruierten und gedruckten Teile. Standardkomponenten sind bewusst ausgelassen."
      },
      legend: {
        enclosure: {
          title: "ASA-Gehäuse",
          desc: "UV-stabiles gedrucktes Gehäuse",
          alt: "ASA-Gehäuse"
        },
        lid: {
          title: "Montagedeckel",
          desc: "Universelle Rund- und Rechteckmontage",
          alt: "Montagedeckel"
        },
        spacer: {
          title: "Abstandsplatte",
          desc: "Modulare Elektronik-Montageschnittstelle",
          alt: "Abstandsplatte"
        },
        silica: {
          title: "Silicagel-Fach",
          desc: "Modul zur Feuchtigkeitskontrolle",
          alt: "Silicagel-Fach"
        }
      }
    },
    assembly: {
      eyebrow: "Montageprozess",
      title: "Montage in 6 Schritten",
      steps: {
        step1: {
          title: "Power-Core montieren",
          text: "MPPT-Regler und Hauptplatine auf der Abstandsplatte montieren. Das modulare Design erlaubt Layout-Änderungen ohne Neugestaltung des Gehäuses.",
          alt: "Schritt 01 – Abstandsplatte montieren"
        },
        step2: {
          title: "Akkupack einsetzen",
          text: "Den 4×18650-Akkupack einsetzen und sichern. Die Batteriemodule werden nach dem Power-Core montiert, um Ausrichtung und Kabelführung zu sichern.",
          alt: "Schritt 02 – Akkupack einsetzen"
        },
        step3: {
          title: "Antennenpfad anschließen",
          text: "Den HF-Pfad (U.FL → N-Type) verbinden und verriegeln. Das Koaxkabel wird vor dem Schließen des Gehäuses verlegt und fixiert.",
          alt: "Schritt 03 – Antennenpfad anschließen"
        },
        step4: {
          title: "Gehäuse abdichten",
          text: "Dichtung auflegen und das Gehäuse schließen. Eine umlaufende Dichtung sorgt für langfristige Wetterbeständigkeit.",
          alt: "Schritt 04 – Gehäuse abdichten"
        },
        step5: {
          title: "Strom & Mesh testen",
          text: "Einschalten und Systembetrieb prüfen. Stromstabilität, Knoten-Start und LoRa-Mesh-Konnektivität testen.",
          alt: "Schritt 05 – Strom & Mesh testen"
        },
        step6: {
          title: "Draußen installieren",
          text: "Das Gerät ist bereit für die dauerhafte Außeninstallation und den autonomen Betrieb.",
          alt: "Schritt 06 – Draußen installieren"
        }
      }
    },
    moisture: {
      eyebrow: "Schutz",
      title: "Feuchtigkeitsschutz",
      cards: {
        sealed: {
          title: "Vollständig abgedichtete Architektur",
          sub: "Keine externen Schnittstellen",
          text: "Das Gehäuse hat keine externen Service-Ports oder Anschlüsse. Zugriff auf die Elektronik ist nur durch Öffnen des Gehäuses möglich, wodurch mögliche Eintrittsstellen für Feuchtigkeit entfallen."
        },
        gasket: {
          title: "Silikondichtung",
          sub: "Umlaufende Abdichtung",
          text: "Eine durchgehende Silikondichtung versiegelt die Gehäusehälften und bietet eine zuverlässige Barriere gegen Regen, Spritzwasser und Feuchtigkeit."
        },
        vent: {
          title: "Druckausgleichsventil",
          sub: "Membranbasierter Druckausgleich",
          text: "Eine Druckausgleichsmembran gleicht innere Druckänderungen durch Temperaturschwankungen aus, ohne Feuchtigkeit eindringen zu lassen."
        },
        silica: {
          title: "Silicagel-Fach",
          sub: "Passive Feuchtigkeitskontrolle",
          text: "Ein internes Silicagel-Fach bindet Restfeuchtigkeit und schützt die Elektronik vor Kondensation bei langfristigem Außeneinsatz."
        }
      }
    },
    mounting: {
      eyebrow: "Installation",
      title: "Montage & Installation",
      imageAlt: "Schnellverschluss-Montagemechanismus",
      cards: {
        universal: {
          title: "Universelles Montagesystem",
          sub: "Modulare Befestigungsschnittstelle",
          text: "Der Montagedeckel ist als universelle Befestigungsschnittstelle ausgelegt, sodass der Knoten an unterschiedlichsten Strukturen ohne Adapter oder Gehäuseänderungen installiert werden kann."
        },
        round: {
          title: "Runde Strukturen",
          sub: "10 mm – 60 mm Durchmesser",
          text: "Unterstützt vertikale und horizontale Masten mit Durchmessern von 10 mm bis 60 mm. Zwei versetzte Befestigungsbohrungen bieten Flexibilität bei der Positionierung und ermöglichen Kabelbinder oder Metallschellen."
        },
        rectangular: {
          title: "Rechteckprofile",
          sub: "10×10 mm – 60×60 mm",
          text: "Eine integrierte Profilgeometrie ermöglicht die sichere Montage an rechteckigen Strukturen wie Aluminiumprofilen und Rahmen von 10×10 mm bis 60×60 mm."
        },
        quickRelease: {
          title: "Schnellverschluss-Halterung",
          sub: "Optionales Zubehör",
          text: "Eine spezielle Schnellverschluss-Halterung lässt den Knoten per mechanischem Riegel einrasten. Zwei Entriegelungshebel lösen vier Verriegelungsstifte und ermöglichen die schnelle Demontage ohne Werkzeug oder Gehäusedemontage."
        },
        magnetic: {
          title: "Magnetische Montageoption",
          sub: "Optionale Konfiguration",
          text: "Die Halterung unterstützt optionale Hochleistungsmagnete (bis Ø56 mm), für temporäre Installationen auf Metallstrukturen bei voller Entnehmbarkeit."
        }
      }
    },
    bom: {
      eyebrow: "Pakete",
      title: "Pakete & Stückliste",
      subtitle: "Konfigurationsoptionen und Überblick der Stückliste.",
      plannedTitle: "Geplante Konfigurationsstufen",
      tier1: "DIY-Kit — gedruckte Gehäuseteile, Dichtungen und Montagematerial",
      tier2: "Elektronik-Bundle — Controller, LoRa-Modul und Leistungselektronik",
      tier3: "Montierter Knoten — vollständig aufgebauter und getesteter Solarknoten",
      tier4: "Pro / Custom — kundenspezifische Batterie, Solarpanel, Sensoren oder Montage",
      bomTitle: "Stückliste (BOM)",
      bom1: "Gehäuse: ASA-Korpus, Dichtung, Silikagel-Fach, Schrauben",
      bom2: "Energie: Solarpanel, MPPT-Laderegler, 18650 / 26650 Zellen",
      bom3: "Funk: Meshtastic-Knoten, LoRa-Modul, Antenne, HF-Adapter",
      bom4: "Montage: Universalhalter, Schellen oder Kabelbinder, Befestigungsmaterial",
      note: "Dieser Abschnitt ist bewusst minimal gehalten, bis die Hardware-Revisionen finalisiert sind."
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      top: "Nach oben",
      home: "Startseite",
      privacy: "Datenschutz",
      impressum: "Impressum",
      github: "GitHub",
      telegram: "@skrap87"
    },
    cookie: {
      aria: "Cookie-Hinweis",
      text: "Diese Website verwendet ausschließlich technisch notwendige Cookies, um den Betrieb der Seite sicherzustellen.",
      link: "Datenschutzerklärung",
      button: "OK"
    },
    privacy: {
      metaTitle: "Datenschutzerklärung – MESH-S",
      eyebrow: "Datenschutz",
      title: "Datenschutzerklärung",
      subtitle1: "Diese Website verwendet keine Tracking-, Analytics- oder Marketing-Cookies. Es kommen ausschließlich technisch notwendige Cookies zum Einsatz, um den Betrieb der Seite sicherzustellen.",
      subtitle2: "Ihr Einverständnis zum Cookie-Hinweis wird lokal in Ihrem Browser gespeichert (localStorage), damit der Hinweis nicht bei jedem Besuch erneut angezeigt wird.",
      back: "Zurück zur Startseite"
    },
    impressum: {
      metaTitle: "Impressum – MESH-S",
      eyebrow: "Rechtliches",
      title: "Impressum",
      section1: "Angaben gemäß § 5 TMG",
      responsibleTitle: "Verantwortlich für den Inhalt dieser Website:",
      name: "Eduard Herzog",
      country: "Deutschland",
      contactTitle: "Kontakt:",
      contactLabel: "Telegram:",
      contactHandle: "@skrap87",
      projectLine1: "Diese Website dient der Darstellung eines technischen Projekts.",
      projectLine2: "Der Verkauf von Produkten erfolgt gegebenenfalls über externe Plattformen (z. B. Etsy).",
      liabilityTitle: "Haftung für Inhalte:",
      liabilityText: "Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
      linksTitle: "Haftung für Links:",
      linksText: "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss besteht.",
      back: "Zurück zur Startseite"
    }
  }
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
      el.textContent = value;
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

  const exploded = document.querySelector("[data-i18n-svg]");
  if (exploded) {
    exploded.setAttribute(
      "src",
      lang === "de"
        ? "assets/meshtastic-exploded.de.svg"
        : "assets/meshtastic-exploded.en.svg"
    );
  }

  document.querySelectorAll(".lang-option").forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
};

const updateLinks = (lang) => {
  const links = document.querySelectorAll("a[href]");
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

    if (href.startsWith("#")) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      url.hash = href;
      link.setAttribute("href", url.pathname + url.search + url.hash);
      return;
    }

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    url.searchParams.set("lang", lang);
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
