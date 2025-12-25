window.I18N_PARTS = window.I18N_PARTS || {};
window.I18N_PARTS.de = window.I18N_PARTS.de || {};
window.I18N_PARTS.de.common = {
  meta: {
    title: "MESH-S — DIY-Meshtastic-Solarknoten"
  },
  nav: {
    hero: "Start",
    benefits: "Vorteile",
    autonomy: "Telemetrie",
    winter: "Winter",
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
    tagline: "DIY-Aufbau, Notizen und Doku mit Fokus auf ganzjährigen Outdoor-Betrieb.",
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
    error: "3D-Modell ist noch nicht verfügbar. Bitte assets/variants/s/models/mesh-s.glb hinzufügen.",
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
        note: "HA-Verlaufs-Export",
        alt: "Temperatur während einer Winterwoche"
      }
    }
  },
  customParts: {
    eyebrow: "Sonderteile",
    title: "Sonderteile",
    note: "Gezeigt sind nur die für MESH-S modellierten und gedruckten Teile. Standardkomponenten bleiben außen vor, damit die Ansicht klar bleibt.",
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
	  eyebrow: "Montageansichten",
	  title: "Montage in 6 Ansichten",
	  steps: {
		step1: {
		  title: "Layout der Stromversorgung",
		  text: "Beispielhafte Platzierung des MPPT-Controllers und der Hauptplatine auf der Adapterplatte. Das Layout dient als Orientierung und kann angepasst werden.",
		  alt: "Ansicht 01 — Layout der Stromversorgung"
		},
		step2: {
		  title: "Positionierung des Batterieblocks",
		  text: "Beispielhafte Positionierung des 4×18650-Batterieblocks relativ zur Adapterplatte und zum Gehäuse. Gezeigt wird die Geometrie und Anordnung der Komponenten.",
		  alt: "Ansicht 02 — Positionierung des Batterieblocks"
		},
		step3: {
		  title: "Vorbereitung der RF-Anbindung",
		  text: "Wichtiger Schritt vor der Fixierung der Adapterplatte: Montage und Fixierung des Koax-Adapters U.FL → N-Type für den späteren Antennenanschluss.",
		  alt: "Ansicht 03 — Vorbereitung der RF-Anbindung"
		},
		step4: {
		  title: "Übersicht der internen Anordnung",
		  text: "Visuelle Übersicht der vollständig bestückten Baugruppe ohne Deckel. Zeigt die finale Position aller Hauptkomponenten im Gehäuse.",
		  alt: "Ansicht 04 — interne Anordnung ohne Deckel"
		},
		step5: {
		  title: "Systemprüfung (Beispiel)",
		  text: "Beispielhafte Prüfpunkte für Stromversorgung, Start des Knotens und Überprüfung der LoRa-Mesh-Verbindung.",
		  alt: "Ansicht 05 — Systemprüfung"
		},
		step6: {
		  title: "Kontext der Außenmontage",
		  text: "Typischer Installationskontext für DIY-Aufbauten. Montage, Anschluss und Inbetriebnahme erfolgen durch den Ersteller.",
		  alt: "Ansicht 06 — Kontext der Außenmontage"
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
    subtitle: "Technische Komponentenliste für einen MESH-S DIY-Aufbau.",
    table: {
      headers: {
        number: "Nr.",
        component: "Komponente",
        quantity: "Menge",
        notes: "Hinweise / Spezifikationen",
        photo: "Foto",
        buy: "Kaufen"
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
    legend: {
      required: "Erforderlich",
      optional: "Optional",
      chooseOne: "Eine Option wählen (Alternativen)"
    },
    badges: {
      optional: "Optional",
      alternative: "Alternative",
      chooseOne: "Eine wählen"
    },
    choiceLabel: "Eine wählen:",
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
    contactLabelEmail: "E-Mail:",
    contactEmail: "contact@mesh-s.org",
    projectLine1: "Diese Website dokumentiert ein privates, nicht-kommerzielles DIY-Projekt.",
    projectLine2: "Sie dient ausschließlich der technischen Dokumentation und Experimenten.",
    diyDisclaimer: "Diese Website dokumentiert ein privates, nicht-kommerzielles DIY-Projekt. Alle Inhalte dienen ausschließlich der technischen Dokumentation. Es werden keine fertigen Geräte, Bausätze oder funktionsfähigen Systeme angeboten. Jegliche Umsetzung, Modifikation oder Nutzung erfolgt vollständig auf eigene Verantwortung. Die aufgeführten Komponenten stellen lediglich eine mögliche Beispielkonfiguration dar. Es wird kein Anspruch auf Vollständigkeit, Richtigkeit oder Eignung für einen bestimmten Zweck erhoben.",
    liabilityTitle: "Haftung für Inhalte:",
    liabilityText: "Es wird keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernommen. Die Inhalte dienen ausschließlich Informationszwecken.",
    linksTitle: "Haftung für Links:",
    linksText: "Diese Website enthält Links zu externen Websites Dritter. Auf deren Inhalte besteht kein Einfluss. Für die Inhalte der verlinkten Seiten sind die jeweiligen Betreiber verantwortlich.",
    back: "Zurück zur Startseite"
  }
};
