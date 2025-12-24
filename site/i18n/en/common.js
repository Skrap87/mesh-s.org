window.I18N_PARTS = window.I18N_PARTS || {};
window.I18N_PARTS.en = window.I18N_PARTS.en || {};
window.I18N_PARTS.en.common = {
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
    tagline: "DIY build notes and documentation focused on year-round outdoor operation.",
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
    error: "3D model is not available yet. Please add assets/variants/s/models/mesh-s.glb.",
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
        note: "HA history export",
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
        text: "Example placement of the MPPT controller and main node board on the spacer plate; layout can be adapted.",
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
        title: "System check (example)",
        text: "Checklist items for power checks, node startup, and LoRa mesh connectivity.",
        alt: "View 05 – system check"
      },
      step6: {
        title: "Outdoor mounting context",
        text: "Typical deployment context for DIY builds; assembly, wiring, and commissioning are completed by the builder.",
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
    subtitle: "Technical component list for one MESH-S DIY build.",
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
};
