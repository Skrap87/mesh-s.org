<?php
$allowed = ['s', 'm', 'l', 'xl'];
$model = in_array(($model ?? 's'), $allowed, true) ? $model : 's';
$pageTitle = 'MESH-S / ' . strtoupper($model) . ' — Modellseite';
$metaDescription = 'MESH-S Modellseite ' . strtoupper($model) . ' mit Telemetrie, Aufbau, Sonderteilen und BOM.';
$activeNav = 'models';
$rootPath = '../';
$pageScripts = ['js/variants.js', 'js/bom-loader.js', 'js/charts.js', 'js/lightbox.js'];
require __DIR__ . '/../partials/header.php';
?>
<script>
window.ASSET_BASE = '../';
window.MODEL_ID = '<?= $model ?>';
(() => {
  const next = window.MODEL_ID || 's';
  const url = new URL(window.location.href);
  url.searchParams.set('v', next);
  window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  try { localStorage.setItem('meshSVariant', next); } catch (_) {}
})();
</script>
<section class="hero">
  <div class="container model-layout">
    <aside class="model-toc">
      <strong>Inhalt / <?= strtoupper($model) ?></strong>
      <a href="#telemetry">Telemetrie</a>
      <a href="#winter">Winter</a>
      <a href="#moisture">Feuchtigkeit</a>
      <a href="#assembly">Aufbau</a>
      <a href="#custom-parts">Sonderteile</a>
      <a href="#mounting">Befestigung</a>
      <a href="#bom">Stückliste</a>
      <a href="#rating">Bewertung</a>
    </aside>
    <div class="model-main">
      <div class="eyebrow">Modellseite</div>
      <h1 class="hero-title"><span class="hero-title__brand">MESH-S</span><span class="hero-title__variant" data-variant-title></span></h1>
      <p>Alle technischen Inhalte bleiben erhalten, sind aber je Modell als eigene Seite strukturiert.</p>
      <div class="viewer-inline"><a class="btn btn-outline" href="<?= htmlspecialchars($u('viewer.php'), ENT_QUOTES) ?>" data-variant-viewer-link>3D-Ansicht</a></div>
      <picture data-variant-hero>
        <source srcset="<?= htmlspecialchars($u('assets/variants/s/hero/hero.webp'), ENT_QUOTES) ?>" type="image/webp" data-variant-hero-webp>
        <img src="<?= htmlspecialchars($u('assets/variants/s/hero/hero.png'), ENT_QUOTES) ?>" data-variant-hero-img alt="MESH-S Modell" loading="lazy">
      </picture>

      <section id="telemetry">
        <h2 class="section-title">Telemetrie</h2>
        <div class="autonomy-graphs">
          <figure class="graph-card"><div class="chart" data-chart="charge" data-json="<?= htmlspecialchars($u('assets/variants/s/autonomy/charts/ha-charge.json'), ENT_QUOTES) ?>" data-unit="%"></div></figure>
          <figure class="graph-card"><div class="chart" data-chart="battery" data-json="<?= htmlspecialchars($u('assets/variants/s/autonomy/charts/ha-battery.json'), ENT_QUOTES) ?>" data-unit="V"></div></figure>
        </div>
      </section>

      <section id="winter"><h2 class="section-title">Winterbetrieb</h2><img src="<?= htmlspecialchars($u('assets/variants/s/winter/images/node_winter2.jpg'), ENT_QUOTES) ?>" data-winter-image="1" alt="Wintereinsatz" loading="lazy"></section>
      <section id="moisture"><h2 class="section-title">Feuchtigkeit</h2><div class="chart" data-chart="humidityDual" data-json="<?= htmlspecialchars($u('assets/variants/s/winter/charts/humidity-in-out.json'), ENT_QUOTES) ?>" data-unit="%"></div></section>

      <section id="assembly"><h2 class="section-title">Aufbau in 6 Schritten</h2><div class="steps-grid">
        <?php for ($i=1; $i<=6; $i++): $key='step0'.$i; ?>
          <div class="step"><img data-variant-asset="<?= $key ?>" src="<?= htmlspecialchars($u('assets/variants/s/assembly/step-0' . $i . '.png'), ENT_QUOTES) ?>" alt="Schritt <?= $i ?>" loading="lazy"></div>
        <?php endfor; ?>
      </div></section>

      <section id="custom-parts"><h2 class="section-title">Sonderteile</h2><div class="custom-parts-grid">
        <div class="legend-item"><img data-variant-asset="enclosureGif" src="<?= htmlspecialchars($u('assets/variants/s/custom-parts/enclosure.gif'), ENT_QUOTES) ?>" alt="Gehäuse" loading="lazy"></div>
        <div class="legend-item"><img data-variant-asset="lidGif" src="<?= htmlspecialchars($u('assets/variants/s/custom-parts/lid.gif'), ENT_QUOTES) ?>" alt="Lid" loading="lazy"></div>
        <div class="legend-item"><img data-variant-asset="spacerPlateGif" src="<?= htmlspecialchars($u('assets/variants/s/custom-parts/spacer-plate.gif'), ENT_QUOTES) ?>" alt="Spacer" loading="lazy"></div>
        <div class="legend-item"><img data-variant-asset="silicaCompartmentGif" src="<?= htmlspecialchars($u('assets/variants/s/custom-parts/silica-compartment.gif'), ENT_QUOTES) ?>" alt="Silica" loading="lazy"></div>
      </div></section>

      <section id="mounting"><h2 class="section-title">Befestigung & Video</h2><div class="video-wrap"><iframe width="560" height="315" src="https://www.youtube.com/embed/89fr6fH8f8s" title="MESH-S mounting" loading="lazy" allowfullscreen></iframe></div></section>

      <section id="bom">
        <h2 class="section-title">BOM für <?= strtoupper($model) ?></h2>
        <table class="bom-table"><thead><tr><th>Komponente</th><th>Menge</th><th>Hinweise / Spezifikationen</th><th class="bom-col-photo">Foto</th><th class="bom-col-link">Link</th></tr></thead><tbody id="bomTbody"></tbody></table>
      </section>

      <section id="rating">
        <div class="eyebrow">Feedback</div>
        <h2 class="section-title">Bewerte diese Seite</h2>
        <div class="rating-scale" id="ratingScale" role="group" aria-label="Bewertung 0 bis 10">
          <button class="rating-btn" type="button" data-rate="0">0</button><button class="rating-btn" type="button" data-rate="1">1</button><button class="rating-btn" type="button" data-rate="2">2</button><button class="rating-btn" type="button" data-rate="3">3</button><button class="rating-btn" type="button" data-rate="4">4</button><button class="rating-btn" type="button" data-rate="5">5</button>
        </div>
        <div class="rating-result" id="ratingResult"><div class="rating-result-value" id="ratingValue">—</div></div>
        <div class="rating-meta" id="ratingMeta"></div>
      </section>
    </div>
  </div>
</section>
<?php require __DIR__ . '/../partials/footer.php'; ?>
