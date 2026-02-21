<?php
$model = require __DIR__ . '/content/model-m.php';
$bomItems = require __DIR__ . '/content/bom-all.php';
$pageTitle = $model['name'] . ' — MESH-S v3';
$pageDescription = $model['summary'];
require __DIR__ . '/partials/header.php';
?>
<section class="hero container">
  <div>
    <p class="eyebrow">Eigenständige Modellseite</p>
    <h1><?= htmlspecialchars($model['name'], ENT_QUOTES, 'UTF-8') ?></h1>
    <p class="lead"><?= htmlspecialchars($model['summary'], ENT_QUOTES, 'UTF-8') ?></p>
  </div>
  <img class="hero-image" src="<?= htmlspecialchars($model['heroImage'], ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($model['name'], ENT_QUOTES, 'UTF-8') ?>">
</section>

<section class="container section">
  <h2>Fotos / Galerie</h2>
  <div class="gallery">
    <?php foreach ($model['gallery'] as $image): ?>
      <img src="<?= htmlspecialchars($image, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($model['name'], ENT_QUOTES, 'UTF-8') ?> Galerie">
    <?php endforeach; ?>
  </div>
</section>

<section class="container section">
  <h2>Beschreibung & Besonderheiten</h2>
  <ul class="feature-list">
    <?php foreach ($model['features'] as $feature): ?>
      <li><?= htmlspecialchars($feature, ENT_QUOTES, 'UTF-8') ?></li>
    <?php endforeach; ?>
  </ul>
</section>

<section class="container section">
  <h2>Grafiken / Charts</h2>
  <div class="charts">
    <?php foreach ($model['charts'] as $chart): ?>
      <article class="chart-card">
        <h3><?= htmlspecialchars($chart['title'], ENT_QUOTES, 'UTF-8') ?></h3>
        <div class="chart" data-json="<?= htmlspecialchars($chart['json'], ENT_QUOTES, 'UTF-8') ?>" data-unit="<?= htmlspecialchars($chart['unit'], ENT_QUOTES, 'UTF-8') ?>" data-aria-label="<?= htmlspecialchars($chart['title'], ENT_QUOTES, 'UTF-8') ?>" data-error-text="Diagrammdaten nicht verfügbar"></div>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<section class="container section">
  <h2>3D Preview</h2>
  <model-viewer class="viewer"
    src="<?= htmlspecialchars($model['viewerModel'], ENT_QUOTES, 'UTF-8') ?>"
    camera-controls
    auto-rotate
    shadow-intensity="1"
    alt="3D-Vorschau <?= htmlspecialchars($model['name'], ENT_QUOTES, 'UTF-8') ?>">
  </model-viewer>
</section>

<section class="container section">
  <h2>Komponenten (vollständige BOM mit Foto & Link)</h2>
  <table class="bom-table">
    <thead>
      <tr><th>#</th><th>Foto</th><th>Komponente</th><th>Menge</th><th>Hinweise</th><th>Link</th></tr>
    </thead>
    <tbody>
      <?php foreach ($bomItems as $item): ?>
      <tr>
        <td><?= htmlspecialchars((string) ($item['order'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
        <td>
          <?php if (!empty($item['photoThumb'])): ?>
            <img class="bom-photo" src="../site/<?= htmlspecialchars(ltrim((string) $item['photoThumb'], '/'), ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars((string) ($item['name'] ?? 'BOM Foto'), ENT_QUOTES, 'UTF-8') ?>">
          <?php endif; ?>
        </td>
        <td><?= htmlspecialchars((string) ($item['name'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
        <td><?= htmlspecialchars((string) ($item['qty'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
        <td><?= htmlspecialchars((string) ($item['notes'] ?? '—'), ENT_QUOTES, 'UTF-8') ?></td>
        <td>
          <?php if (!empty($item['shopUrl'])): ?>
            <a class="bom-link" href="<?= htmlspecialchars((string) $item['shopUrl'], ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener noreferrer"><?= htmlspecialchars((string) ($item['shopLabel'] ?? 'Shop'), ENT_QUOTES, 'UTF-8') ?></a>
          <?php else: ?>—<?php endif; ?>
        </td>
      </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</section>

<?php require __DIR__ . '/partials/footer.php'; ?>
