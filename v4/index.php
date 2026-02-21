<?php
$pageTitle = "MESH-S — DIY-Meshtastic- & MeshCore-Solarknoten";
include 'partials/header.php';
?>

<section id="hero" class="hero">
  <div class="container hero-grid">
    <div>
      <div class="eyebrow">DIY-Meshtastic- & MeshCore-Solarknoten</div>
      <h1 class="hero-title">
        <span class="hero-title__brand">MESH-S</span>
      </h1>
      <div class="hero-subtitle">Willkommen beim MESH-S Projekt</div>
      <p class="hero-tagline">Bitte wählen Sie ein Modell aus, um die Details, Komponenten und 3D-Ansicht zu sehen.</p>

      <div class="model-selection" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 2rem;">
        <a href="model-s.php" class="btn btn-outline" style="text-align: center; padding: 2rem;">
          <strong style="font-size: 1.5rem; display: block;">Modell S</strong>
          <span>Kompakt</span>
        </a>
        <a href="model-m.php" class="btn btn-outline" style="text-align: center; padding: 2rem;">
          <strong style="font-size: 1.5rem; display: block;">Modell M</strong>
          <span>Standard</span>
        </a>
        <a href="model-l.php" class="btn btn-outline" style="text-align: center; padding: 2rem;">
          <strong style="font-size: 1.5rem; display: block;">Modell L</strong>
          <span>Groß</span>
        </a>
        <a href="model-xl.php" class="btn btn-outline" style="text-align: center; padding: 2rem;">
          <strong style="font-size: 1.5rem; display: block;">Modell XL</strong>
          <span>Maximum</span>
        </a>
      </div>
    </div>
    <div class="hero-visual">
      <img src="../site/assets/variants/s/hero/hero.png" alt="MESH-S DIY-Solar-Mesh-Knoten" width="394" height="894" decoding="async">
    </div>
  </div>
</section>

<?php
include 'partials/footer.php';
?>
