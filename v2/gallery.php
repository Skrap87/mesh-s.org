<?php
$pageTitle = 'Galerie — MESH-S v2';
$metaDescription = 'Fotogalerie des MESH-S Projekts in neuer PHP-Struktur.';
$activeNav = 'gallery';
$pageScripts = ['js/variants.js', 'js/gallery.js', 'js/lightbox.js'];
require __DIR__ . '/partials/header.php';
?>
<section>
  <div class="container">
    <div class="eyebrow">Galerie</div>
    <h1 class="section-title">Fotos der Nodes im Einsatz</h1>
    <p class="section-subtitle">Bestehende Galerie + Lightbox, unverändert in Funktion.</p>
    <div class="gallery-grid" aria-live="polite"></div>
  </div>
</section>
<?php require __DIR__ . '/partials/footer.php'; ?>
