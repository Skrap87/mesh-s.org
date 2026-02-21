<?php
$pageTitle = "MESH-S / S";
include 'partials/header.php';
?>

    <section id="hero" class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">DIY-Meshtastic- & MeshCore-Solarknoten</div>
          <h1 class="hero-title">
            <span class="hero-title__brand">MESH-S</span>
            <span class="hero-title__variant"> / S</span>
          </h1>
			</div>
          <div class="hero-subtitle">DIY • Solar • Mesh-Knoten</div>
          <div class="hero-tagline">DIY-Aufbau, Notizen und Doku mit Fokus auf ganzjährigen Outdoor-Betrieb.</div>
          <div class="hero-actions">
            <a class="btn btn-accent" href="#autonomy">Telemetrie ansehen</a>
            <a class="btn btn-outline" href="#bom">Komponenten</a>
			<a class="btn btn-outline "
			    href="https://makerworld.com/en/models/2183892-mesh-s-s-solar-meshtastic-meshcore-node#profileId-2370418"
			   target="_blank" rel="noopener noreferrer">MakerWorld</a>

          </div>
        </div>
        <div class="hero-visual">
			<picture>
				<source srcset="../site/assets/variants/s/hero/hero.webp" type="image/webp" sizes="(max-width: 600px) 100vw, 50vw">
			<img src="../site/assets/variants/s/hero/hero.png" alt="MESH-S DIY-Solar-Mesh-Knoten" width="394" height="894" decoding="async" fetchpriority="high" srcset="../site/assets/variants/s/hero/hero-500.png 500w, ../site/assets/variants/s/hero/hero-1000.png 1000w" sizes="(max-width: 600px) 100vw, 50vw">
			</picture>
        </div>
      </div>
    </section>

    <section class="viewer-stage" style="height: 500px; position: relative; background: #e6e6e6; margin-bottom: 2rem;">
      <div id="viewerCanvasWrap" style="width: 100%; height: 100%;"></div>
      <div id="viewerOverlay" class="viewer-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(230,230,230,0.8); z-index: 10;">
        <div class="viewer-loading" id="viewerLoading">3D-Modell wird geladen…</div>
      </div>
    </section>
    <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
        "three/addons/controls/OrbitControls.js": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js",
        "three/addons/loaders/GLTFLoader.js": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"
      }
    }
    </script>
    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

        const canvasWrap = document.getElementById("viewerCanvasWrap");
        const loadingOverlay = document.getElementById("viewerOverlay");
        const modelUrl = "../site/assets/variants/s/models/mesh-s.glb";

        let renderer, camera, controls, scene;

        function init() {
            if (!canvasWrap) return;
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xe6e6e6);

            camera = new THREE.PerspectiveCamera(45, canvasWrap.clientWidth / canvasWrap.clientHeight, 0.1, 1000);
            camera.position.set(2.5, 1.8, 2.5);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(canvasWrap.clientWidth, canvasWrap.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            canvasWrap.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

            const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1d1f2a, 1.0);
            scene.add(hemiLight);
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
            dirLight.position.set(4, 6, 3);
            scene.add(dirLight);

            const loader = new GLTFLoader();
            loader.load(modelUrl, (gltf) => {
                scene.add(gltf.scene);
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());
                gltf.scene.position.sub(center);

                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                cameraZ *= 1.5;
                camera.position.set(cameraZ, cameraZ * 0.5, cameraZ);
                camera.updateProjectionMatrix();
                controls.update();

                if (loadingOverlay) loadingOverlay.style.display = 'none';
            }, undefined, (error) => {
                console.error(error);
                if (loadingOverlay) {
                  const loadEl = loadingOverlay.querySelector('.viewer-loading');
                  if (loadEl) loadEl.textContent = 'Fehler beim Laden des 3D-Modells.';
                }
            });

            window.addEventListener('resize', onWindowResize);
            animate();
        }

        function onWindowResize() {
            if (!canvasWrap) return;
            camera.aspect = canvasWrap.clientWidth / canvasWrap.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasWrap.clientWidth, canvasWrap.clientHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            if (controls) controls.update();
            if (renderer && scene && camera) renderer.render(scene, camera);
        }

        init();
    </script>


    <section id="benefits">
      <div class="container">
        <div class="eyebrow">DIY-Überblick</div>
        <h2 class="section-title">DIY-Überblick für Outdoor-Mesh-Experimente</h2>
        <div class="card-grid">
          <div class="card">
            <div class="icon">01</div>
            <h3>Solarbetrieb</h3>
            <p>Ein praxisnaher Solaraufbau für einen DIY-Knoten.</p>
          </div>
          <div class="card">
            <div class="icon">02</div>
            <h3>Winter-Experimentnotizen</h3>
            <p>Telemetrie-Einblicke aus Situationen mit wenig Licht.</p>
          </div>
          <div class="card">
            <div class="icon">03</div>
            <h3>ASA-Gehäusekonzept</h3>
            <p>Gedrucktes Gehäuse für den Außeneinsatz; Ergebnisse können variieren.</p>
          </div>
          <div class="card">
            <div class="icon">04</div>
            <h3>Modulare DIY-Plattform</h3>
            <p>Modulares Layout mit austauschbaren Kernmodulen; Selbstmontage erforderlich.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="autonomy">
      <div class="container split">
        <div>
          <div class="eyebrow">Telemetrie</div>
          <h2 class="section-title">Telemetrie-Snapshot</h2>
          <p class="section-subtitle">Home-Assistant-Telemetrie aus realem Outdoor-Einsatz.</p>
          <div class="list">
            <div class="list-item"><span>•</span><span>Ladestrom</span></div>
            <div class="list-item"><span>•</span><span>Batteriespannung</span></div>
            <div class="list-item"><span>•</span><span>Tage ohne Sonne</span></div>
          </div>
        </div>
        <div class="autonomy-graphs">
          <figure class="graph-card">
            <div class="graph-meta">
              <div class="graph-title">Ladestrom</div>
              <div class="graph-note">HA-Verlaufs-Export</div>
            </div>
            <div class="chart" data-chart="chargeCurrent" data-json="../site/assets/variants/s/autonomy/charts/ha-charge.json" data-unit="mA" data-aria-label="Telemetrie-Diagramm" data-error-text="Diagrammdaten nicht verfügbar"></div>
          </figure>

          <figure class="graph-card">
            <div class="graph-meta">
              <div class="graph-title">Batteriestand</div>
              <div class="graph-note">HA-Verlaufs-Export</div>
            </div>
            <div class="chart" data-chart="batteryLevel" data-json="../site/assets/variants/s/autonomy/charts/ha-battery.json" data-unit="%" data-aria-label="Telemetrie-Diagramm" data-error-text="Diagrammdaten nicht verfügbar"></div>
          </figure>
        </div>
      </div>
    </section>

    <section id="winter">
      <div class="container split">
        <div>
          <div class="eyebrow">Feldnotizen</div>
          <h2 class="section-title">Beobachtungen im Winterbetrieb</h2>
          <div class="list">
            <div class="list-item"><span>•</span><span>Höhere Batteriekapazität im Kalten</span></div>
            <div class="list-item"><span>•</span><span>Konservatives Energieprofil</span></div>
            <div class="list-item"><span>•</span><span>Beobachtet bei diffusem Licht</span></div>
            <div class="list-item"><span>•</span><span>Keine beweglichen Teile</span></div>
            <div class="list-item"><span>•</span><span>Kälte- und Feuchtigkeitsaspekte</span></div>
          </div>
        </div>
        <div class="winter-stack">
          <figure class="winter-card">
            <div class="winter-meta">
              <div class="winter-title">Feldfoto</div>
              <div class="winter-note">Morgen unter 0 °C</div>
            </div>
            <img src="../site/assets/variants/s/winter/images/node_winter2.jpg" data-winter-image="1" alt="MESH-S-Knoten im Freien an einem Morgen unter 0 °C mit Kondensation" width="567" height="511" loading="lazy" decoding="async" fetchpriority="low">
          </figure>

          <figure class="winter-card">
            <div class="winter-meta">
              <div class="winter-title">Temperatur</div>
              <div class="winter-note">HA-Verlaufs-Export</div>
            </div>
            <div class="chart" data-chart="temperature" data-json="../site/assets/variants/s/winter/charts/ha-temperature.json" data-unit="°C" data-aria-label="Telemetrie-Diagramm" data-error-text="Diagrammdaten nicht verfügbar"></div>
          </figure>
        </div>
      </div>
    </section>

	<section id="moisture">
      <div class="container">
        <div class="eyebrow">Schutz</div>
        <h2 class="section-title">Feuchtigkeitsaspekte</h2>
        <div class="card-grid">
          <div class="card">
            <h3>Abgedichtetes Layout-Konzept</h3>
            <p class="card-sub">Keine externen Schnittstellen</p>
            <p>
              Das Gehäuse hat keine externen Service-Ports oder Anschlüsse. Zugriff auf die Elektronik ist nur durch Öffnen des Gehäuses möglich, wodurch potenzielle Eintrittsstellen für Feuchtigkeit reduziert werden.
            </p>
          </div>

          <div class="card">
            <h3>Silikondichtung</h3>
            <p class="card-sub">Umlaufende Abdichtung</p>
            <p>
              Eine durchgehende Silikondichtung kann die Gehäusehälften abdichten und die Exposition gegenüber Regen, Spritzwasser und Feuchtigkeit reduzieren.
            </p>
          </div>

          <div class="card">
            <h3>Druckausgleichsventil</h3>
            <p class="card-sub">Membranbasierter Druckausgleich</p>
            <p>
              Eine Druckausgleichsmembran ist dafür vorgesehen, innere Druckänderungen durch Temperaturschwankungen auszugleichen und dabei Feuchtigkeitseintritt zu begrenzen.
            </p>
          </div>

          <div class="card">
            <h3>Silicagel-Fach</h3>
            <p class="card-sub">Passive Feuchtigkeitskontrolle</p>
            <p>
              Ein internes Silicagel-Fach kann Restfeuchtigkeit binden und Kondensation in DIY-Outdoor-Experimenten begrenzen.
            </p>
          </div>
        </div>

        <div class="moisture-graphs">
          <figure class="graph-card">
            <div class="graph-meta">
              <div class="graph-title">Innen- &amp; Außenfeuchte</div>
              <div class="graph-note">HA-Verlaufs-Export</div>
            </div>
            <div class="chart" data-chart="humidityDual" data-json="../site/assets/variants/s/winter/charts/humidity-in-out.json" data-unit="%" data-aria-label="Feuchtigkeitsdiagramm" data-error-text="Diagrammdaten nicht verfügbar"></div>
          </figure>
        </div>
      </div>
    </section>

	<section id="assembly">
      <div class="container">
        <div class="eyebrow">Aufbau in Bildern</div>
        <h2 class="section-title">Aufbau in 6 Ansichten</h2>
        <div class="steps-grid">
          <div class="step">
            <img src="../site/assets/variants/s/assembly/step-01.png" alt="Ansicht 01 – Power-Core-Layout" width="800" height="803" loading="lazy" decoding="async" fetchpriority="low">

            <h4>Power-Core-Layout</h4>
            <p>Platzierung von MPPT-Regler und Hauptplatine auf der Abstandsplatte; das Layout ist anpassbar.</p>
          </div>
          <div class="step">
            <img src="../site/assets/variants/s/assembly/step-02.png" alt="Ansicht 02 – Position des Akkupacks" width="800" height="800" loading="lazy" decoding="async" fetchpriority="low">

            <h4>Position des Akkupacks</h4>
            <p>Lage des 4×18650-Akkupacks mit typischer Kabelführung.</p>
          </div>
          <div class="step">
            <img src="../site/assets/variants/s/assembly/step-03.png" alt="Ansicht 03 – HF-Pfad" width="800" height="800" loading="lazy" decoding="async" fetchpriority="low">

            <h4>HF-Pfad</h4>
            <p>Illustrative Verlegung des HF-Pfads (U.FL → N-Type) vor dem Schließen des Gehäuses.</p>
          </div>
          <div class="step">
            <img src="../site/assets/variants/s/assembly/step-04.png" alt="Ansicht 04 – Dichtkonzept" width="800" height="800" loading="lazy" decoding="async" fetchpriority="low">

            <h4>Dichtkonzept</h4>
            <p>Platzierung der Dichtung und Gehäuseschluss für Witterungsaspekte.</p>
          </div>
          <div class="step">
            <img src="../site/assets/variants/s/assembly/step-05.png" alt="Ansicht 05 – Systemcheck" width="800" height="800" loading="lazy" decoding="async" fetchpriority="low">

            <h4>Systemcheck (Beispiel)</h4>
            <p>Checkliste für Stromprüfungen, Knotenstart und LoRa-Mesh-Konnektivität.</p>
          </div>
          <div class="step">
            <img src="../site/assets/variants/s/assembly/step-06.png" alt="Ansicht 06 – Outdoor-Montagekontext" width="800" height="800" loading="lazy" decoding="async" fetchpriority="low">

            <h4>Outdoor-Montagekontext</h4>
            <p>Typischer Einsatzkontext für DIY-Aufbauten; Montage, Verdrahtung und Inbetriebnahme erfolgen durch den Erbauer.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="wiring">
      <div class="container">
        <div class="eyebrow">Elektrik</div>
        <h2 class="section-title">Verdrahtung &amp; Anschlussplan</h2>
        <p class="section-subtitle">Übersicht der empfohlenen Verkabelung für den MESH-S Solarknoten.</p>
        <div class="wiring-list">
          <div class="wiring-item">
            <button type="button" class="gallery-item" data-full="../site/assets/gallery/aufbau/aufbau-ohne-ina219.png" aria-label="Bild öffnen">
              <img src="../site/assets/gallery/aufbau/aufbau-ohne-ina219.png" alt="Verdrahtung ohne INA219 – direkter Anschluss von Solarpanel, MPPT und Akku" loading="lazy" decoding="async">
            </button>
            <h3>Direkter Anschluss ohne INA219</h3>
            <p>Grundlegende Verkabelung ohne Strom- und Spannungsmessung.</p>
          </div>
          <div class="wiring-item">
            <button type="button" class="gallery-item" data-full="../site/assets/gallery/aufbau/aufbau-mit-ina219.png" aria-label="Bild öffnen">
              <img src="../site/assets/gallery/aufbau/aufbau-mit-ina219.png" alt="Verdrahtung mit INA219 – Messung von Lade- und Verbrauchsstrom" loading="lazy" decoding="async">
            </button>
            <h3>Anschluss mit INA219 (empfohlen)</h3>
            <p>Ermöglicht Strom- und Spannungsmessung für Telemetrie.</p>
          </div>
        </div>
      </div>
    </section>

   <section id="custom-parts">
  <div class="container container-wide">
    <div class="legend-head">
      <div class="eyebrow">Sonderteile</div>
      <h2 class="section-title">Sonderteile</h2>
      <div class="legend-note">
        Gezeigt sind nur die für MESH-S modellierten und gedruckten Teile. Standardkomponenten bleiben außen vor, damit die Ansicht klar bleibt.
      </div>
    </div>

    <div class="custom-parts-grid">
      <div class="legend-item">
        <picture>
          <source srcset="../site/assets/variants/s/custom-parts/enclosure.webp"
                  type="image/webp">
          <img src="../site/assets/variants/s/custom-parts/enclosure.gif"

               alt="ASA-Gehäuse" width="220" height="300"
               loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <div class="legend-title">ASA-Gehäuse</div>
        <div class="legend-desc">UV-stabiles gedrucktes Gehäuse</div>
      </div>

      <div class="legend-item">
        <picture>
          <source srcset="../site/assets/variants/s/custom-parts/lid.webp"
                  type="image/webp">
          <img src="../site/assets/variants/s/custom-parts/lid.gif"

               alt="Montagedeckel" width="220" height="300"
               loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <div class="legend-title">Montagedeckel</div>
        <div class="legend-desc">Montage für runde und rechteckige Profile</div>
      </div>

      <div class="legend-item">
        <picture>
          <source srcset="../site/assets/variants/s/custom-parts/spacer-plate.webp"
                  type="image/webp">
          <img src="../site/assets/variants/s/custom-parts/spacer-plate.gif"

               alt="Abstandsplatte" width="220" height="300"
               loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <div class="legend-title">Abstandsplatte</div>
        <div class="legend-desc">Elektronik-Montageschnittstelle</div>
      </div>

      <div class="legend-item">
        <picture>
          <source srcset="../site/assets/variants/s/custom-parts/silica-compartment.webp"
                  type="image/webp">
          <img src="../site/assets/variants/s/custom-parts/silica-compartment.gif"

               alt="Silicagel-Fach" width="220" height="300"
               loading="lazy" decoding="async" fetchpriority="low">
        </picture>
        <div class="legend-title">Silicagel-Fach</div>
        <div class="legend-desc">Einlage zur Feuchtigkeitskontrolle</div>
      </div>
	</div>
	</section>

    <section id="mounting">
      <div class="container">
        <div class="eyebrow">Installation</div>
        <h2 class="section-title">Montageoptionen für DIY-Aufbauten</h2>

        <div class="mounting-visual">
			<picture>
				<source srcset="../site/assets/variants/s/custom-parts/mounting-latch.webp" type="image/webp">
			<img src="../site/assets/variants/s/custom-parts/mounting-latch.gif" alt="Schnellverschluss-Montagemechanismus" width="800" height="450" loading="lazy" decoding="async" fetchpriority="low">
			</picture>
        </div>

        <div class="card-grid">
          <div class="card">
            <h3>Universelles Montagesystem</h3>
            <p class="card-sub">Modulare Befestigungsschnittstelle</p>
            <p>
              Der Montagedeckel ist als universelles Befestigungskonzept dargestellt und zeigt, wie ein DIY-Aufbau an unterschiedlichen Strukturen ohne Adapter oder Gehäuseänderungen installiert werden könnte.
            </p>
          </div>

          <div class="card">
            <h3>Runde Strukturen</h3>
            <p class="card-sub">10 mm – 60 mm Durchmesser</p>
            <p>
              Kompatibilität mit vertikalen und horizontalen Masten mit Durchmessern von 10 mm bis 60 mm. Zwei versetzte Befestigungsbohrungen zeigen mögliche Positionierungen und ermöglichen Kabelbinder oder Metallschellen.
            </p>
          </div>

          <div class="card">
            <h3>Rechteckprofile</h3>
            <p class="card-sub">10×10 mm – 60×60 mm</p>
            <p>
              Eine integrierte Profilgeometrie illustriert die Montage an rechteckigen Strukturen wie Aluminiumprofilen und Rahmen von 10×10 mm bis 60×60 mm.
            </p>
          </div>

          <div class="card">
            <h3>Schnellverschluss-Halterung</h3>
            <p class="card-sub">Optionales Zubehör</p>
            <p>
              Eine Schnellverschluss-Halterung zeigt ein mechanisches Riegelsystem. Zwei Entriegelungshebel lösen vier Verriegelungsstifte und ermöglichen eine schnelle Demontage ohne Werkzeug oder Gehäusedemontage.
            </p>
          </div>

          <div class="card">
            <h3>Magnetische Montageoption</h3>
            <p class="card-sub">Optionale Konfiguration</p>
            <p>
              Die Halterung kann mit optionalen Hochleistungsmagneten (bis Ø56 mm) für temporäre Installationen auf Metallstrukturen kombiniert werden, wobei der Knoten entnehmbar bleibt.
            </p>
          </div>
        </div>
		<!-- Praxis-Demonstration -->
			<div class="mounting-videos">
			  <h3>Praxis-Demonstration: Universeller Montageadapter</h3>

			  <div class="mounting-video-grid">
				<div class="mounting-video">
				  <iframe
					src="https://www.youtube-nocookie.com/embed/k_sbZGZDxJc"
					title="Universeller Montageadapter – magnetische Befestigung"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen>
				  </iframe>
				  <p class="video-caption">
					<strong>Magnetische Befestigung</strong><br>
					Temporäre Montage auf Metalloberflächen mit schnellem Abnehmen ohne Werkzeug.
				  </p>
				</div>

				<div class="mounting-video">
				  <iframe
					src="https://www.youtube-nocookie.com/embed/960MtSkRuUs"
					title="Universeller Montageadapter – mechanische Fixierung ohne Magnete"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen>
				  </iframe>
				  <p class="video-caption">
					<strong>Mechanische Fixierung ohne Magnete</strong><br>
					Alternative Befestigung für dauerhafte Montage an Masten und Profilen.
				  </p>
				</div>
			  </div>
			</div>
			<!-- Praxis-Demonstration -->
      </div>
    </section>

    <section id="diy-context">
      <div class="container">
		<div class="eyebrow">KONTEXT</div>
        <h2 class="section-title">Projekt-Rahmen</h2>
        <div class="context-card">
          <div class="context-grid">
            <div class="context-item">
              <h3>DIY-Charakter</h3>
              <p>Zuverlässigkeit und Laufzeit hängen von der Aufbauqualität, den gewählten Komponenten sowie der Sorgfalt bei Montage, Verkabelung und Abdichtung ab.</p>
            </div>
            <div class="context-item">
              <h3>Keine industrielle Zertifizierung</h3>
              <p>Das Projekt ist nicht nach IP-, CE- oder industriellen Normen zertifiziert. Der Schutz vor Witterung basiert auf Praxistests und Langzeiterfahrung, nicht auf Laborprüfungen.</p>
            </div>
            <div class="context-item">
              <h3>Szenarienbasierte Telemetrie</h3>
              <p>Alle Messdaten stammen aus realem Einsatz unter konkreten Bedingungen (Standort, Solarausrichtung, Klima). Ergebnisse können in anderen Umgebungen abweichen.</p>
            </div>
            <div class="context-item">
              <h3>Kein Plug-and-Play-Produkt</h3>
              <p>MESH-S richtet sich an technisch interessierte Nutzer mit grundlegendem Verständnis für Meshtastic, MeshCore, Energieversorgung und LoRa-Netze.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="bom">
      <div class="container">
        <div class="eyebrow">DIY</div>
        <h2 class="section-title">Stückliste für einen DIY-Knoten</h2>
        <h2 class="hero-title">
          <span class="hero-title__brand">MESH-S</span>
          <span class="hero-title__variant"> / S</span>
        </h2>
		    </div>
        <p class="section-subtitle">Technische Komponentenliste für einen MESH-S DIY-Aufbau.</p>
        <span id="bom-choice-label" style="display: none;">Wähle eine Option:</span>
        <div class="bom-legend">
          <span class="bom-legend-item">
            <span class="bom-badge bom-badge--required">Erforderlich</span>
			<span class="bom-legend-text bom-legend-description">
            — notwendig für den Aufbau der ausgewählten Variante.
          </span>
          </span>
          <span class="bom-legend-item">
            <span class="bom-badge bom-badge--optional">Optional</span>
			<span class="bom-legend-text bom-legend-description">
            — Erweiterung oder Verbesserung, kann weggelassen werden.
          </span>
          </span>
          <span class="bom-legend-item">
            <span class="bom-badge bom-badge--choice">Wähle eine Option</span>
			<span class="bom-legend-text bom-legend-description">
            — wähle eine Komponente aus der Gruppe der Alternativen.
          </span>
          </span>
        </div>
        <?php include 'content/bom-s.php'; ?>
        <div class="disclaimer-block">
          <p>Die aufgeführten Komponenten zeigen eine mögliche Teileliste.</p>
          <p>Es wird kein Anspruch auf Vollständigkeit, Richtigkeit oder Eignung für einen bestimmten Zweck erhoben.</p>
        </div>
        <p class="packages-note">
          Alle Komponenten sind für den Selbstaufbau vorgesehen. Montage, Verdrahtung und Inbetriebnahme liegen in der Verantwortung des Erbauers.
        </p>
      </div>
    </section>

<!--	Bewertung 	-->
	<section id="rating">
	  <div class="container">
		<div class="eyebrow">Feedback</div>
		<h2 class="section-title">Bewerte diese Seite</h2>
		<p class="section-subtitle">0 = schlecht, 5 = perfekt. Anonym, ohne Konto.</p>

		<div class="rating-scale" id="ratingScale" role="group" aria-label="Bewertung 0 bis 10">
		  <button class="rating-btn" type="button" data-rate="0">0</button>
		  <button class="rating-btn" type="button" data-rate="1">1</button>
		  <button class="rating-btn" type="button" data-rate="2">2</button>
		  <button class="rating-btn" type="button" data-rate="3">3</button>
		  <button class="rating-btn" type="button" data-rate="4">4</button>
		  <button class="rating-btn" type="button" data-rate="5">5</button>
		</div>

		<div class="rating-result" id="ratingResult" aria-live="polite">
		  <div class="rating-result-label">Gesamtbewertung</div>
		  <div class="rating-result-value" id="ratingValue">—</div>
		</div>

		<div class="rating-meta" id="ratingMeta" aria-live="polite"></div>

	  </div>
	</section>
<!--	Bewertung 	-->

<?php
include 'partials/footer.php';
?>