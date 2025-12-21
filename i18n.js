const translations = {
  en: {
    meta: {
      title: "MESH-S — DIY Meshtastic Solar Node"
    },
    nav: {
      hero: "Home",
      benefits: "Benefits",
      autonomy: "Autonomy",
      winter: "Winter",
      exploded: "Exploded",
      customParts: "Custom parts",
      assembly: "Reference build",
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
      eyebrow: "DIY Meshtastic Solar Node",
      subtitle: "DIY • Solar • Mesh Node",
      tagline: "Modular DIY solar node reference design for makers and hobbyists.",
      ctaAutonomy: "See autonomy proof",
      ctaBom: "Packages & BOM",
      imageAlt: "MESH-S DIY solar mesh node reference design"
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
          title: "Modular DIY platform",
          text: "Field-friendly layout with replaceable core modules; self-assembly required."
        }
      }
    },
    autonomy: {
      eyebrow: "Telemetry",
      title: "Proof of autonomy",
      subtitle: "Real Home Assistant telemetry from DIY deployments.",
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
      eyebrow: "Reference layout",
      title: "Illustrative internal layout",
      imageAlt: "MESH-S illustrative internal layout (reference design)",
      custom: {
        eyebrow: "Custom parts",
        note: "Reference configuration showing only the parts designed and printed for MESH-S. Off-the-shelf components are intentionally omitted."
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
      eyebrow: "Reference build",
      title: "Reference configuration in 6 views",
      steps: {
        step1: {
          title: "Power core layout",
          text: "Reference placement of the MPPT controller and main node board on the spacer plate; layout can be adapted.",
          alt: "View 01 – power core layout"
        },
        step2: {
          title: "Battery pack positioning",
          text: "Example location for the 4×18650 battery pack with cable routing shown for reference.",
          alt: "View 02 – battery pack positioning"
        },
        step3: {
          title: "RF path routing (example)",
          text: "Illustrative routing of the RF path (U.FL → N-Type) prior to closing the enclosure.",
          alt: "View 03 – RF path routing example"
        },
        step4: {
          title: "Sealing concept",
          text: "Reference gasket placement and enclosure closure for weather resistance.",
          alt: "View 04 – sealing concept"
        },
        step5: {
          title: "System check (reference)",
          text: "Example checklist items for power stability, node startup, and LoRa mesh connectivity.",
          alt: "View 05 – system check reference"
        },
        step6: {
          title: "Outdoor mounting context",
          text: "Reference deployment context for DIY builds; final assembly, wiring, and commissioning are done by the builder.",
          alt: "View 06 – outdoor mounting context"
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
      title: "Mounting options for DIY builds",
      imageAlt: "Quick-release mounting mechanism",
      cards: {
        universal: {
          title: "Universal mounting system",
          sub: "Modular attachment interface",
          text: "The mounting lid is designed as a universal attachment interface, allowing the DIY build to be installed on a wide range of structures without adapters or enclosure modifications."
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
      subtitle: "DIY kits and component bundles for self-assembly, plus a bill of materials overview.",

      plannedTitle: "Planned DIY configuration tiers",

      tier1: "DIY Kit — printed enclosure parts, seals and mounting hardware",
      tier2: "Electronics Bundle — controller, LoRa module and power electronics",
      tier3: "Reference build (not for sale) — example configuration for self-assembly",
      tier4: "Pro / Custom — custom battery, panel, sensors or mounting",

      bomTitle: "Bill of materials (BOM)",

      bom1: "Enclosure: ASA body, gasket, silica gel compartment, screws",
      bom2: "Power: solar panel, MPPT charger, 18650 cells",
      bom3: "Radio: Meshtastic node, LoRa module, antenna, RF adapter",
      bom4: "Mounting: universal bracket, clamps or zip ties, hardware",

      note: "All packages are intended for self-assembly; final wiring and commissioning are done by the builder."
    },
    footer: {
      rights: "All rights reserved.",
      top: "Top",
      home: "Home",
      privacy: "Privacy",
      impressum: "Legal notice",
      github: "GitHub",
      telegram: "@skrap87",
      disclaimer: "This project provides DIY kits and components only. Assembly, wiring and commissioning are the sole responsibility of the customer."
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
      title: "MESH-S — DIY-Meshtastic-Solarknoten"
    },
    nav: {
      hero: "Start",
      benefits: "Vorteile",
      autonomy: "Autonomie",
      winter: "Winter",
      exploded: "Explosionsansicht",
      customParts: "Sonderteile",
      assembly: "Referenzaufbau",
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
      eyebrow: "DIY-Meshtastic-Solarknoten",
      subtitle: "DIY • Solar • Mesh-Knoten",
      tagline: "Modulares DIY-Solarknoten-Referenzdesign für Maker und Hobbyisten.",
      ctaAutonomy: "Autonomie-Nachweis ansehen",
      ctaBom: "Pakete & Stückliste",
      imageAlt: "MESH-S DIY-Solar-Mesh-Knoten als Referenzdesign"
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
          title: "Modulare DIY-Plattform",
          text: "Feldtaugliches Layout mit austauschbaren Kernmodulen; Selbstmontage erforderlich."
        }
      }
    },
    autonomy: {
      eyebrow: "Telemetrie",
      title: "Nachweis der Autonomie",
      subtitle: "Echte Home-Assistant-Telemetrie von DIY-Aufbauten.",
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
      eyebrow: "Referenzlayout",
      title: "Illustratives internes Layout",
      imageAlt: "MESH-S illustriertes internes Layout (Referenzdesign)",
      custom: {
        eyebrow: "Sonderteile",
        note: "Referenzkonfiguration mit ausschließlich für MESH-S konstruierten und gedruckten Teilen. Standardkomponenten sind bewusst ausgelassen."
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
      eyebrow: "Referenzaufbau",
      title: "Referenzkonfiguration in 6 Ansichten",
      steps: {
        step1: {
          title: "Power-Core-Layout",
          text: "Referenzplatzierung von MPPT-Regler und Hauptplatine auf der Abstandsplatte; das Layout ist anpassbar.",
          alt: "Ansicht 01 – Power-Core-Layout"
        },
        step2: {
          title: "Position des Akkupacks",
          text: "Beispiellage des 4×18650-Akkupacks mit Kabelführung als Referenz.",
          alt: "Ansicht 02 – Position des Akkupacks"
        },
        step3: {
          title: "HF-Pfad (Beispiel)",
          text: "Illustrative Verlegung des HF-Pfads (U.FL → N-Type) vor dem Schließen des Gehäuses.",
          alt: "Ansicht 03 – HF-Pfad Beispiel"
        },
        step4: {
          title: "Dichtkonzept",
          text: "Referenzplatzierung der Dichtung und Gehäuseschluss für Wetterbeständigkeit.",
          alt: "Ansicht 04 – Dichtkonzept"
        },
        step5: {
          title: "Systemcheck (Referenz)",
          text: "Beispiel-Checkliste für Stromstabilität, Knotenstart und LoRa-Mesh-Konnektivität.",
          alt: "Ansicht 05 – Systemcheck Referenz"
        },
        step6: {
          title: "Outdoor-Montagekontext",
          text: "Referenz-Deploymentszenario für DIY-Aufbauten; finale Montage, Verdrahtung und Inbetriebnahme erfolgen durch den Erbauer.",
          alt: "Ansicht 06 – Outdoor-Montagekontext"
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
      title: "Montageoptionen für DIY-Aufbauten",
      imageAlt: "Schnellverschluss-Montagemechanismus",
      cards: {
        universal: {
          title: "Universelles Montagesystem",
          sub: "Modulare Befestigungsschnittstelle",
          text: "Der Montagedeckel ist als universelle Befestigungsschnittstelle ausgelegt, sodass der DIY-Aufbau an unterschiedlichsten Strukturen ohne Adapter oder Gehäuseänderungen installiert werden kann."
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
      subtitle: "DIY-Kits und Komponenten-Bundles zur Selbstmontage plus Überblick der Stückliste.",
      plannedTitle: "Geplante DIY-Konfigurationsstufen",
      tier1: "DIY-Kit — gedruckte Gehäuseteile, Dichtungen und Montagematerial",
      tier2: "Elektronik-Bundle — Controller, LoRa-Modul und Leistungselektronik",
      tier3: "Referenzaufbau (nicht im Verkauf) — Beispielkonfiguration zur Selbstmontage",
      tier4: "Pro / Custom — kundenspezifische Batterie, Solarpanel, Sensoren oder Montage",
      bomTitle: "Stückliste (BOM)",
      bom1: "Gehäuse: ASA-Korpus, Dichtung, Silikagel-Fach, Schrauben",
      bom2: "Energie: Solarpanel, MPPT-Laderegler, 18650 Zellen",
      bom3: "Funk: Meshtastic-Knoten, LoRa-Modul, Antenne, HF-Adapter",
      bom4: "Montage: Universalhalter, Schellen oder Kabelbinder, Befestigungsmaterial",
      note: "Alle Pakete sind für Selbstmontage gedacht; finale Verdrahtung und Inbetriebnahme übernimmt der Erbauer."
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      top: "Nach oben",
      home: "Startseite",
      privacy: "Datenschutz",
      impressum: "Impressum",
      github: "GitHub",
      telegram: "@skrap87",
      disclaimer: "Dieses Projekt bietet ausschließlich DIY-Kits und Komponenten an. Montage, Verdrahtung und Inbetriebnahme liegen vollständig in der Verantwortung des Kunden."
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
