const translations = {
  en: {
    meta: {
      title: "MESH-S — DIY Meshtastic Solar Node"
    },
    nav: {
      hero: "Home",
      benefits: "Benefits",
      autonomy: "Telemetry",
      winter: "Winter",
      exploded: "Exploded",
      customParts: "Custom parts",
      assembly: "Build views",
      moisture: "Moisture",
      mounting: "Mounting",
      bom: "Components",
      more: "More",
      telegram: "Email contact@mesh-s.org",
      github: "GitHub"
    },
    lang: {
      aria: "Language switcher"
    },
    hero: {
      eyebrow: "DIY Meshtastic Solar Node",
      subtitle: "DIY • Solar • Mesh Node",
      tagline: "DIY build notes and documentation for makers and hobbyists.",
      ctaAutonomy: "View telemetry",
      ctaBom: "Components",
      ctaViewer: "3D view",
      imageAlt: "MESH-S DIY solar mesh node"
    },
    viewer: {
      title: "3D Viewer",
      hint: "Drag to rotate, scroll/pinch to zoom.",
      reset: "Reset view",
      loading: "Loading 3D model…",
      error: "3D model is not available yet. Please add assets/models/mesh-s.glb.",
      errorhint: "Try clearing your browser cache and reloading the page.",
      back: "← Back"
    },
    benefits: {
      eyebrow: "DIY overview",
      title: "DIY overview for outdoor mesh experiments",
      cards: {
        solar: {
          title: "Solar powered",
          text: "A practical solar setup for a DIY node."
        },
        winter: {
          title: "Winter experiment notes",
          text: "Telemetry snapshots from low-light conditions."
        },
        enclosure: {
          title: "ASA enclosure concept",
          text: "Printed housing for outdoor use; results may vary."
        },
        modular: {
          title: "Modular DIY platform",
          text: "Modular layout with replaceable core modules; self-assembly required."
        }
      }
    },
    autonomy: {
      eyebrow: "Telemetry",
      title: "Telemetry snapshot",
      subtitle: "Home Assistant telemetry from real outdoor use.",
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
      eyebrow: "Field notes",
      title: "Winter behavior observations",
      list: {
        capacity: "Higher battery capacity in cold weather",
        profile: "Conservative power profile",
        diffuse: "Observed in diffuse light",
        moving: "No moving parts",
        design: "Cold & moisture considerations"
      },
      cards: {
        field: {
          title: "Field photo",
          note: "Sub-zero morning",
          alt: "MESH-S node outdoors in sub-zero morning with condensation"
        },
        temp: {
          title: "Temperature",
          note: "Winter week overview",
          alt: "Temperature during winter week"
        }
      }
    },
    exploded: {
      eyebrow: "Inside overview",
      title: "Illustrative internal layout",
      imageAlt: "MESH-S illustrative internal layout",
      custom: {
        eyebrow: "Custom parts",
        note: "Shown here are only the printed parts made for MESH-S. Store-bought components are left out to keep the view clean."
      },
      legend: {
        enclosure: {
          title: "ASA enclosure",
          desc: "UV-stable printed housing",
          alt: "ASA enclosure"
        },
        lid: {
          title: "Mounting lid",
          desc: "Round & rectangular mounting",
          alt: "Mounting lid"
        },
        spacer: {
          title: "Spacer plate",
          desc: "Electronics mounting interface",
          alt: "Spacer plate"
        },
        silica: {
          title: "Silica compartment",
          desc: "Humidity control insert",
          alt: "Silica compartment"
        }
      }
    },
    assembly: {
      eyebrow: "Build views",
      title: "Build in 6 views",
      steps: {
        step1: {
          title: "Power core layout",
          text: "Placement of the MPPT controller and main node board on the spacer plate; layout can be adapted.",
          alt: "View 01 – power core layout"
        },
        step2: {
          title: "Battery pack positioning",
          text: "Location of the 4×18650 battery pack with typical cable routing.",
          alt: "View 02 – battery pack positioning"
        },
        step3: {
          title: "RF path routing",
          text: "Illustrative routing of the RF path (U.FL → N-Type) prior to closing the enclosure.",
          alt: "View 03 – RF path routing"
        },
        step4: {
          title: "Sealing concept",
          text: "Gasket placement and enclosure closure for weather exposure considerations.",
          alt: "View 04 – sealing concept"
        },
        step5: {
          title: "System check",
          text: "Checklist items for power checks, node startup, and LoRa mesh connectivity.",
          alt: "View 05 – system check"
        },
        step6: {
          title: "Outdoor mounting context",
          text: "Outdoor mounting context for DIY builds; assembly, wiring, and commissioning are completed by the builder.",
          alt: "View 06 – outdoor mounting context"
        }
      }
    },
    moisture: {
      eyebrow: "Protection",
      title: "Moisture considerations",
      cards: {
        sealed: {
          title: "Sealed layout concept",
          sub: "No external interfaces",
          text: "The enclosure uses no external service ports or connectors. Access to electronics is only possible by opening the housing, reducing potential ingress points for moisture."
        },
        gasket: {
          title: "Silicone gasket",
          sub: "Full perimeter sealing",
          text: "A continuous silicone gasket can help seal the enclosure halves, aiming to reduce exposure to rain, splashes, and humidity."
        },
        vent: {
          title: "Pressure equalization vent",
          sub: "Membrane-based breathing",
          text: "A pressure equalization membrane is intended to balance internal pressure changes caused by temperature fluctuations while aiming to limit moisture ingress."
        },
        silica: {
          title: "Silica gel compartment",
          sub: "Passive humidity control",
          text: "An internal silica gel compartment can capture residual moisture, helping limit condensation in DIY outdoor experiments."
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
          text: "The mounting lid is presented as a universal attachment concept, showing how a DIY build could be installed on a range of structures without adapters or enclosure modifications."
        },
        round: {
          title: "Round structures",
          sub: "10 mm – 60 mm diameter",
          text: "Compatibility with vertical and horizontal poles with diameters from 10 mm to 60 mm. Two mounting hole offsets show possible positioning, enabling the use of cable ties or metal clamps."
        },
        rectangular: {
          title: "Rectangular profiles",
          sub: "10×10 mm – 60×60 mm",
          text: "An integrated profile geometry illustrates mounting on rectangular structures such as aluminum profiles and frames from 10×10 mm up to 60×60 mm."
        },
        quickRelease: {
          title: "Quick-release bracket",
          sub: "Optional accessory",
          text: "A dedicated quick-release bracket shows a mechanical latch system. Two release levers disengage four locking pins, enabling fast removal without tools or enclosure disassembly."
        },
        magnetic: {
          title: "Magnetic mounting option",
          sub: "Optional configuration",
          text: "The bracket can be paired with optional high-strength magnets (up to Ø56 mm) for temporary installation on metal structures while keeping the node removable."
        }
      }
    },
    bom: {
      eyebrow: "DIY",
      title: "Bill of materials for one DIY node",
      subtitle: "Technical reference list of components for one MESH-S DIY build.",
      table: {
        headers: {
          number: "№",
          component: "Component",
          quantity: "Quantity",
          notes: "Notes / Specs",
          photo: "Photo"
        },
        rows: {
          r1: {
            component: "XIAO nRF52840 & Wio-SX1262",
            quantity: "1",
            notes: "—",
            photo: "—"
          },
          r2: {
            component: "Solar panel",
            quantity: "1",
            notes: "5 V / 2.7 W (118×173 mm)",
            photo: "—"
          },
          r3: {
            component: "MPPT charge controller",
            quantity: "1",
            notes: "CN3065",
            photo: "—"
          },
          r4: {
            component: "U.FL → N-Type coax",
            quantity: "1",
            notes: "RG178 (≥150 mm)",
            photo: "—"
          },
          r5: {
            component: "18650 battery holder",
            quantity: "1",
            notes: "4-slot",
            photo: "—"
          },
          r6: {
            component: "ALFA 868 MHz antenna",
            quantity: "1",
            notes: "5 dBi",
            photo: "—"
          },
          r7: {
            component: "18650 Li-Ion cells",
            quantity: "4 pcs",
            notes: "—",
            photo: "—"
          },
          r8: {
            component: "M3×12 screws",
            quantity: "18 pcs",
            notes: "cylinder head",
            photo: "—"
          },
          r9: {
            component: "M3 brass threaded inserts",
            quantity: "18 pcs",
            notes: "brass",
            photo: "—"
          },
          r10: {
            component: "Self-tapping screws 2×10",
            quantity: "17 pcs",
            notes: "hex head",
            photo: "—"
          },
          r11: {
            component: "Amphenol pressure equalization vent",
            quantity: "1",
            notes: "Ø12 mm",
            photo: "—"
          },
          r12: {
            component: "Silicone gasket",
            quantity: "1174 mm",
            notes: "Ø 2 mm",
            photo: "—"
          },
          r13: {
            component: "Sikaflex 554",
            quantity: "~1–2 mm layer",
            notes: "—",
            photo: "—"
          },
          r14: {
            component: "Silicone sealant",
            quantity: "as required",
            notes: "—",
            photo: "—"
          },
          r15: {
            component: "Silica gel",
            quantity: "as required",
            notes: "—",
            photo: "—"
          },
          r16: {
            component: "ASA filament (3D print)",
            quantity: "242 g",
            notes: "2 colors",
            photo: "—"
          }
        }
      },
      note: "All components are intended for self-assembly. Assembly, wiring and commissioning are the responsibility of the builder.",
      disclaimer: {
        line1: "The listed components represent one possible parts list.",
        line2: "No claim is made regarding completeness, correctness or suitability for a specific purpose."
      }
    },
    footer: {
      rights: "All rights reserved.",
      top: "Top",
      home: "Home",
      privacy: "Privacy",
      impressum: "Legal notice",
      github: "GitHub",
      telegram: "contact@mesh-s.org",
      disclaimer: "Private non-commercial DIY project. Nothing for sale."
    },
    disclaimer: {
      global: {
        line1: "This website documents a private, non-commercial DIY project.",
        line2: "All information is shared for learning and documentation.",
        line3: "No finished devices, kits or functional systems are offered.",
        line4: "Any implementation, modification or use is carried out entirely at the user's own responsibility."
      }
    },
    captions: {
      prototype: "DIY build / prototype"
    },
    cookie: {
      aria: "Cookie notice",
      text: "This website does not use tracking, analytics, or marketing cookies. Technical settings are stored locally in your browser.",
      link: "Privacy policy",
      button: "OK"
    },
    privacy: {
      metaTitle: "Privacy policy – MESH-S",
      eyebrow: "Privacy",
      title: "Privacy policy",
      subtitle: "The following information describes how personal data is processed on this website.",
      sections: {
        intro: {
          title: "Introduction",
          body1: "This website is a private non-commercial DIY project.",
          body2: "No tracking, analytics, or marketing tools are used."
        },
        controller: {
          title: "Controller",
          body1: "Eduard Herzog, Germany.",
          body2: "Contact: contact@mesh-s.org."
        },
        logs: {
          title: "Access data / server logs",
          body1: "When you access the website, the hosting provider automatically processes access data in server logs.",
          item1: "IP address (truncated/anonymized)",
          item2: "Date and time of access",
          item3: "Browser type and operating system",
          item4: "Accessed pages",
          body2: "Processing is carried out to ensure security and operational stability.",
          body3: "No merging with other data sources takes place."
        },
        storage: {
          title: "Cookies / Local Storage",
          body1: "No cookies are set for tracking, analytics, or marketing purposes.",
          body2: "Only local storage in the browser is used for technical settings (e.g. the cookie notice)."
        },
        sharing: {
          title: "Data sharing",
          body1: "Personal data is not shared with third parties."
        },
        rights: {
          title: "User rights",
          body1: "Within the scope of statutory provisions, users have the right to:",
          item1: "Access",
          item2: "Rectification",
          item3: "Deletion"
        },
        changes: {
          title: "Changes",
          body1: "This privacy policy may be updated if necessary."
        }
      },
      back: "Back to home"
    },
    impressum: {
      metaTitle: "Legal notice – MESH-S",
      eyebrow: "Legal",
      title: "Impressum",
      intro: "This website is a private non-commercial DIY project for technical documentation and experiments.",
      responsibleTitle: "Responsible for the content of this website:",
      name: "Eduard Herzog",
      country: "Germany",
      contactTitle: "Contact:",
      contactLabelTelegram: "Telegram:",
      contactHandle: "@skrap87",
      contactLabelEmail: "E-mail:",
      contactEmail: "contact@mesh-s.org",
      projectLine1: "This website documents a private non-commercial DIY project.",
      projectLine2: "It serves only for technical documentation and experiments.",
      liabilityTitle: "Liability for content:",
      liabilityText: "No guarantee is given for the correctness, completeness, or timeliness of the content. The content is provided for informational purposes only.",
      linksTitle: "Liability for links:",
      linksText: "This website contains links to external third-party websites. I have no influence on their content. Responsibility lies with the respective operators.",
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
      autonomy: "Telemetrie",
      winter: "Winter",
      exploded: "Explosionsansicht",
      customParts: "Sonderteile",
      assembly: "Aufbau in Bildern",
      moisture: "Feuchtigkeit",
      mounting: "Befestigung",
      bom: "Komponenten",
      more: "Mehr",
      telegram: "E-Mail contact@mesh-s.org",
      github: "GitHub"
    },
    lang: {
      aria: "Sprachumschalter"
    },
    hero: {
      eyebrow: "DIY-Meshtastic-Solarknoten",
      subtitle: "DIY • Solar • Mesh-Knoten",
      tagline: "DIY-Aufbau, Notizen und Doku für Maker und Bastler.",
      ctaAutonomy: "Telemetrie ansehen",
      ctaBom: "Komponenten",
      ctaViewer: "3D-Ansicht",
      imageAlt: "MESH-S DIY-Solar-Mesh-Knoten"
    },
    viewer: {
      title: "3D-Viewer",
      hint: "Ziehen zum Drehen, Scrollen/Pinch zum Zoomen.",
      reset: "Ansicht zurücksetzen",
      loading: "3D-Modell wird geladen…",
      error: "3D-Modell ist noch nicht verfügbar. Bitte assets/models/mesh-s.glb hinzufügen.",
      errorhint: "Versuche, den Browser-Cache zu leeren und die Seite neu zu laden.",
      back: "← Zurück"
    },
    benefits: {
      eyebrow: "DIY-Überblick",
      title: "DIY-Überblick für Outdoor-Mesh-Experimente",
      cards: {
        solar: {
          title: "Solarbetrieb",
          text: "Ein praxisnaher Solaraufbau für einen DIY-Knoten."
        },
        winter: {
          title: "Winter-Experimentnotizen",
          text: "Telemetrie-Einblicke aus Situationen mit wenig Licht."
        },
        enclosure: {
          title: "ASA-Gehäusekonzept",
          text: "Gedrucktes Gehäuse für den Außeneinsatz; Ergebnisse können variieren."
        },
        modular: {
          title: "Modulare DIY-Plattform",
          text: "Modulares Layout mit austauschbaren Kernmodulen; Selbstmontage erforderlich."
        }
      }
    },
    autonomy: {
      eyebrow: "Telemetrie",
      title: "Telemetrie-Snapshot",
      subtitle: "Home-Assistant-Telemetrie aus realem Outdoor-Einsatz.",
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
      eyebrow: "Feldnotizen",
      title: "Beobachtungen im Winterbetrieb",
      list: {
        capacity: "Höhere Batteriekapazität im Kalten",
        profile: "Konservatives Energieprofil",
        diffuse: "Beobachtet bei diffusem Licht",
        moving: "Keine beweglichen Teile",
        design: "Kälte- und Feuchtigkeitsaspekte"
      },
      cards: {
        field: {
          title: "Feldfoto",
          note: "Morgen unter 0 °C",
          alt: "MESH-S-Knoten im Freien an einem Morgen unter 0 °C mit Kondensation"
        },
        temp: {
          title: "Temperatur",
          note: "Überblick über eine Winterwoche",
          alt: "Temperatur während einer Winterwoche"
        }
      }
    },
    exploded: {
      eyebrow: "Innenansicht",
      title: "Illustrativer Innenaufbau",
      imageAlt: "MESH-S illustriertes internes Layout",
      custom: {
        eyebrow: "Sonderteile",
        note: "Gezeigt sind nur die für MESH-S modellierten und gedruckten Teile. Standardkomponenten bleiben außen vor, damit die Ansicht klar bleibt."
      },
      legend: {
        enclosure: {
          title: "ASA-Gehäuse",
          desc: "UV-stabiles gedrucktes Gehäuse",
          alt: "ASA-Gehäuse"
        },
        lid: {
          title: "Montagedeckel",
          desc: "Montage für runde und rechteckige Profile",
          alt: "Montagedeckel"
        },
        spacer: {
          title: "Abstandsplatte",
          desc: "Elektronik-Montageschnittstelle",
          alt: "Abstandsplatte"
        },
        silica: {
          title: "Silicagel-Fach",
          desc: "Einlage zur Feuchtigkeitskontrolle",
          alt: "Silicagel-Fach"
        }
      }
    },
    assembly: {
      eyebrow: "Aufbau in Bildern",
      title: "Aufbau in 6 Ansichten",
      steps: {
        step1: {
          title: "Power-Core-Layout",
          text: "Platzierung von MPPT-Regler und Hauptplatine auf der Abstandsplatte; das Layout ist anpassbar.",
          alt: "Ansicht 01 – Power-Core-Layout"
        },
        step2: {
          title: "Position des Akkupacks",
          text: "Lage des 4×18650-Akkupacks mit typischer Kabelführung.",
          alt: "Ansicht 02 – Position des Akkupacks"
        },
        step3: {
          title: "HF-Pfad",
          text: "Illustrative Verlegung des HF-Pfads (U.FL → N-Type) vor dem Schließen des Gehäuses.",
          alt: "Ansicht 03 – HF-Pfad"
        },
        step4: {
          title: "Dichtkonzept",
          text: "Platzierung der Dichtung und Gehäuseschluss für Witterungsaspekte.",
          alt: "Ansicht 04 – Dichtkonzept"
        },
        step5: {
          title: "Systemcheck",
          text: "Checkliste für Stromprüfungen, Knotenstart und LoRa-Mesh-Konnektivität.",
          alt: "Ansicht 05 – Systemcheck"
        },
        step6: {
          title: "Outdoor-Montagekontext",
          text: "Outdoor-Montagekontext für DIY-Aufbauten; Montage, Verdrahtung und Inbetriebnahme erfolgen durch den Erbauer.",
          alt: "Ansicht 06 – Outdoor-Montagekontext"
        }
      }
    },
    moisture: {
      eyebrow: "Schutz",
      title: "Feuchtigkeitsaspekte",
      cards: {
        sealed: {
          title: "Abgedichtetes Layout-Konzept",
          sub: "Keine externen Schnittstellen",
          text: "Das Gehäuse hat keine externen Service-Ports oder Anschlüsse. Zugriff auf die Elektronik ist nur durch Öffnen des Gehäuses möglich, wodurch potenzielle Eintrittsstellen für Feuchtigkeit reduziert werden."
        },
        gasket: {
          title: "Silikondichtung",
          sub: "Umlaufende Abdichtung",
          text: "Eine durchgehende Silikondichtung kann die Gehäusehälften abdichten und die Exposition gegenüber Regen, Spritzwasser und Feuchtigkeit reduzieren."
        },
        vent: {
          title: "Druckausgleichsventil",
          sub: "Membranbasierter Druckausgleich",
          text: "Eine Druckausgleichsmembran ist dafür vorgesehen, innere Druckänderungen durch Temperaturschwankungen auszugleichen und dabei Feuchtigkeitseintritt zu begrenzen."
        },
        silica: {
          title: "Silicagel-Fach",
          sub: "Passive Feuchtigkeitskontrolle",
          text: "Ein internes Silicagel-Fach kann Restfeuchtigkeit binden und Kondensation in DIY-Outdoor-Experimenten begrenzen."
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
          text: "Der Montagedeckel ist als universelles Befestigungskonzept dargestellt und zeigt, wie ein DIY-Aufbau an unterschiedlichen Strukturen ohne Adapter oder Gehäuseänderungen installiert werden könnte."
        },
        round: {
          title: "Runde Strukturen",
          sub: "10 mm – 60 mm Durchmesser",
          text: "Kompatibilität mit vertikalen und horizontalen Masten mit Durchmessern von 10 mm bis 60 mm. Zwei versetzte Befestigungsbohrungen zeigen mögliche Positionierungen und ermöglichen Kabelbinder oder Metallschellen."
        },
        rectangular: {
          title: "Rechteckprofile",
          sub: "10×10 mm – 60×60 mm",
          text: "Eine integrierte Profilgeometrie illustriert die Montage an rechteckigen Strukturen wie Aluminiumprofilen und Rahmen von 10×10 mm bis 60×60 mm."
        },
        quickRelease: {
          title: "Schnellverschluss-Halterung",
          sub: "Optionales Zubehör",
          text: "Eine Schnellverschluss-Halterung zeigt ein mechanisches Riegelsystem. Zwei Entriegelungshebel lösen vier Verriegelungsstifte und ermöglichen eine schnelle Demontage ohne Werkzeug oder Gehäusedemontage."
        },
        magnetic: {
          title: "Magnetische Montageoption",
          sub: "Optionale Konfiguration",
          text: "Die Halterung kann mit optionalen Hochleistungsmagneten (bis Ø56 mm) für temporäre Installationen auf Metallstrukturen kombiniert werden, wobei der Knoten entnehmbar bleibt."
        }
      }
    },
    bom: {
      eyebrow: "DIY",
      title: "Stückliste für einen DIY-Knoten",
      subtitle: "Technische Referenzliste der Komponenten für einen MESH-S DIY-Aufbau.",
      table: {
        headers: {
          number: "Nr.",
          component: "Komponente",
          quantity: "Menge",
          notes: "Hinweise / Spezifikationen",
          photo: "Foto"
        },
        rows: {
          r1: {
            component: "XIAO nRF52840 & Wio-SX1262",
            quantity: "1",
            notes: "—",
            photo: "—"
          },
          r2: {
            component: "Solarmodul",
            quantity: "1",
            notes: "5 V / 2,7 W (118×173 mm)",
            photo: "—"
          },
          r3: {
            component: "MPPT-Laderegler",
            quantity: "1",
            notes: "CN3065",
            photo: "—"
          },
          r4: {
            component: "U.FL → N-Typ Koax",
            quantity: "1",
            notes: "RG178 (≥150 mm)",
            photo: "—"
          },
          r5: {
            component: "18650-Batteriehalter",
            quantity: "1",
            notes: "4-fach",
            photo: "—"
          },
          r6: {
            component: "ALFA 868 MHz Antenne",
            quantity: "1",
            notes: "5 dBi",
            photo: "—"
          },
          r7: {
            component: "18650 Li-Ion Zellen",
            quantity: "4 Stück",
            notes: "—",
            photo: "—"
          },
          r8: {
            component: "M3×12 Schrauben",
            quantity: "18 Stück",
            notes: "Zylinderkopf",
            photo: "—"
          },
          r9: {
            component: "M3 Messing-Gewindeeinsätze",
            quantity: "18 Stück",
            notes: "Messing",
            photo: "—"
          },
          r10: {
            component: "Selbstschneidende Schrauben 2×10",
            quantity: "17 Stück",
            notes: "Sechskantkopf",
            photo: "—"
          },
          r11: {
            component: "Amphenol Druckausgleichsventil",
            quantity: "1",
            notes: "Ø12 mm",
            photo: "—"
          },
          r12: {
            component: "Silikondichtung",
            quantity: "1174 mm",
            notes: "Ø 2 mm",
            photo: "—"
          },
          r13: {
            component: "Sikaflex 554",
            quantity: "~1–2 mm Schicht",
            notes: "—",
            photo: "—"
          },
          r14: {
            component: "Silikon-Dichtmasse",
            quantity: "bei Bedarf",
            notes: "—",
            photo: "—"
          },
          r15: {
            component: "Silicagel",
            quantity: "bei Bedarf",
            notes: "—",
            photo: "—"
          },
          r16: {
            component: "ASA-Filament (3D-Druck)",
            quantity: "242 g",
            notes: "2 Farben",
            photo: "—"
          }
        }
      },
      note: "Alle Komponenten sind für den Selbstaufbau vorgesehen. Montage, Verdrahtung und Inbetriebnahme liegen in der Verantwortung des Erbauers.",
      disclaimer: {
        line1: "Die aufgeführten Komponenten zeigen eine mögliche Teileliste.",
        line2: "Es wird kein Anspruch auf Vollständigkeit, Richtigkeit oder Eignung für einen bestimmten Zweck erhoben."
      }
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      top: "Nach oben",
      home: "Startseite",
      privacy: "Datenschutz",
      impressum: "Impressum",
      github: "GitHub",
      telegram: "contact@mesh-s.org",
      disclaimer: "Privates, nicht-kommerzielles DIY-Projekt. Nichts im Verkauf."
    },
    disclaimer: {
      global: {
        line1: "Diese Website dokumentiert ein privates, nicht-kommerzielles DIY-Projekt.",
        line2: "Alle Inhalte dienen der Doku und dem Erfahrungsaustausch.",
        line3: "Es werden keine fertigen Geräte, Bausätze oder funktionsfähigen Systeme angeboten.",
        line4: "Jegliche Umsetzung, Modifikation oder Nutzung erfolgt vollständig auf eigene Verantwortung."
      }
    },
    captions: {
      prototype: "DIY-Aufbau / Prototyp"
    },
    cookie: {
      aria: "Cookie-Hinweis",
      text: "Diese Website verwendet keine Tracking-, Analytics- oder Marketing-Cookies. Technische Einstellungen werden lokal im Browser gespeichert.",
      link: "Datenschutzerklärung",
      button: "OK"
    },
    privacy: {
      metaTitle: "Datenschutzerklärung – MESH-S",
      eyebrow: "Datenschutz",
      title: "Datenschutzerklärung",
      subtitle: "Die folgenden Informationen beschreiben, wie personenbezogene Daten auf dieser Website verarbeitet werden.",
      sections: {
        intro: {
          title: "Einleitung",
          body1: "Diese Website ist ein privates, nichtkommerzielles DIY-Projekt.",
          body2: "Es werden keine Tracking-, Analytics- oder Marketing-Tools eingesetzt."
        },
        controller: {
          title: "Verantwortlicher",
          body1: "Eduard Herzog, Deutschland.",
          body2: "Kontakt: contact@mesh-s.org."
        },
        logs: {
          title: "Zugriffsdaten / Server-Logfiles",
          body1: "Beim Aufruf der Website verarbeitet der Hosting-Provider automatisch Zugriffsdaten in Server-Logfiles.",
          item1: "IP-Adresse (gekürzt/anonymisiert)",
          item2: "Datum und Uhrzeit des Zugriffs",
          item3: "Browsertyp und Betriebssystem",
          item4: "Aufgerufene Seiten",
          body2: "Die Verarbeitung erfolgt zur Sicherstellung von Sicherheit und Stabilität des Betriebs.",
          body3: "Eine Zusammenführung mit anderen Datenquellen findet nicht statt."
        },
        storage: {
          title: "Cookies / Local Storage",
          body1: "Es werden keine Cookies für Tracking-, Analytics- oder Marketingzwecke gesetzt.",
          body2: "Für technische Einstellungen (z. B. den Cookie-Hinweis) wird ausschließlich localStorage im Browser genutzt."
        },
        sharing: {
          title: "Weitergabe von Daten",
          body1: "Personenbezogene Daten werden nicht an Dritte weitergegeben."
        },
        rights: {
          title: "Rechte der Nutzer",
          body1: "Nutzer haben im Rahmen der gesetzlichen Vorgaben das Recht auf:",
          item1: "Auskunft",
          item2: "Berichtigung",
          item3: "Löschung"
        },
        changes: {
          title: "Änderungen",
          body1: "Diese Datenschutzerklärung kann bei Bedarf angepasst werden."
        }
      },
      back: "Zurück zur Startseite"
    },
    impressum: {
      metaTitle: "Impressum – MESH-S",
      eyebrow: "Rechtliches",
      title: "Impressum",
      intro: "Diese Website ist ein privates, nicht-kommerzielles DIY-Projekt zur Dokumentation und Demonstration technischer Experimente.",
      responsibleTitle: "Verantwortlich für den Inhalt dieser Website:",
      name: "Eduard Herzog",
      country: "Deutschland",
      contactTitle: "Kontakt:",
      contactLabelTelegram: "Telegram:",
      contactHandle: "@skrap87",
      contactLabelEmail: "E-Mail:",
      contactEmail: "contact@mesh-s.org",
      projectLine1: "Diese Website dokumentiert ein privates, nicht-kommerzielles DIY-Projekt.",
      projectLine2: "Sie dient ausschließlich der technischen Dokumentation und Experimenten.",
      liabilityTitle: "Haftung für Inhalte:",
      liabilityText: "Es wird keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernommen. Die Inhalte dienen ausschließlich Informationszwecken.",
      linksTitle: "Haftung für Links:",
      linksText: "Diese Website enthält Links zu externen Websites Dritter. Auf deren Inhalte besteht kein Einfluss. Für die Inhalte der verlinkten Seiten sind die jeweiligen Betreiber verantwortlich.",
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
      if (typeof value === "string" && value.includes("<br")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
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
