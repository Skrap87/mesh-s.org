<?php
$pageTitle = 'MESH-S v2 — Überblick';
$metaDescription = 'Neu strukturierter Einstieg zu MESH-S mit Modellnavigation und zentralem Überblick.';
$activeNav = 'home';
$pageScripts = ['js/lightbox.js'];
require __DIR__ . '/partials/header.php';
?>
<section class="intro-hero">
  <div class="container intro-grid">
    <div>
      <div class="eyebrow">Neue PHP-Struktur</div>
      <h1 class="section-title">MESH-S als neu gegliederte Projektseite</h1>
      <p class="intro-lead">Diese Version ist eine vollständige Neuaufteilung: kurze Übersicht auf der Startseite, einzelne Modellseiten für S/M/L/XL und wiederverwendete Inhalte wie BOM, Charts, Galerie und Viewer.</p>
      <div class="quick-actions">
        <a class="btn btn-accent" href="models/s.php">S ansehen</a>
        <a class="btn btn-outline" href="gallery.php">Galerie</a>
        <a class="btn btn-outline" href="viewer.php?v=s">3D-Ansicht</a>
      </div>
    </div>
    <div>
      <img src="assets/variants/s/hero/hero.png" alt="MESH-S Hero" loading="lazy">
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div class="eyebrow">Vorteile</div>
    <div class="card-grid">
      <article class="card"><h3>Solarbetrieb</h3><p>Ganzjähriger Outdoor-Einsatz mit dokumentierter Energieversorgung.</p></article>
      <article class="card"><h3>Telemetrie</h3><p>JSON-basierte Diagramme für Ladeverhalten, Temperatur und Feuchte.</p></article>
      <article class="card"><h3>Modular</h3><p>Sonderteile, Montagevarianten und gefilterte Stückliste pro Modell.</p></article>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div class="eyebrow">Modelle</div>
    <h2 class="section-title">Wähle eine Baugröße</h2>
    <div class="model-grid">
      <?php foreach (['s' => 'Kompakt & etabliert', 'm' => 'Mehr Kapazität', 'l' => 'Großvolumig', 'xl' => 'Maximale Reserve'] as $id => $desc): ?>
        <article class="model-card">
          <h3>MESH-S / <?= strtoupper($id) ?></h3>
          <p><?= $desc ?></p>
          <a class="btn btn-outline model-link" href="models/<?= $id ?>.php">Zur Modellseite</a>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php require __DIR__ . '/partials/footer.php'; ?>
