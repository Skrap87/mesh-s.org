<?php
$pageTitle = 'MESH-S v3 — Modellübersicht';
$pageDescription = 'Neue v3-Struktur mit eigenständigen Seiten für jede MESH-S-Modellgröße.';
require __DIR__ . '/partials/header.php';
?>
<section class="container intro">
  <p class="eyebrow">MESH-S v3</p>
  <h1>Eigenständige Modellseiten ohne Varianten-Architektur</h1>
  <p class="lead">Diese Version trennt jede Modellgröße in eine eigene Seite mit statischem Inhalt, eigener Galerie, eigenen Charts, eigenem 3D-Block und eigener BOM-Tabelle.</p>
</section>

<section class="container cards section">
  <a class="model-card" href="model-s.php">
    <img src="../site/assets/variants/s/hero/hero.webp" alt="MESH-S S">
    <h2>MESH-S / S</h2>
    <p>Kompakter Outdoor-Solarknoten mit vollständiger Dokumentation.</p>
  </a>

  <a class="model-card" href="model-m.php">
    <img src="../site/assets/variants/m/hero/hero-m.webp" alt="MESH-S M">
    <h2>MESH-S / M</h2>
    <p>Mittlere Baugröße mit alternativer Innenstruktur.</p>
  </a>

  <a class="model-card" href="model-l.php">
    <img src="../site/assets/variants/l/hero/coming-soon.webp" alt="MESH-S L">
    <h2>MESH-S / L</h2>
    <p>Große Plattform mit separater Entwicklungsdokumentation.</p>
  </a>

  <a class="model-card" href="model-xl.php">
    <img src="../site/assets/variants/xl/hero/hero-xl.webp" alt="MESH-S XL">
    <h2>MESH-S / XL</h2>
    <p>XL-Plattform für hohe Energiereserven und lange Autonomie.</p>
  </a>
</section>

<?php require __DIR__ . '/partials/footer.php'; ?>
