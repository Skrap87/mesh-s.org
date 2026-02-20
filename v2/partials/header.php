<?php
$pageTitle = $pageTitle ?? 'MESH-S v2';
$metaDescription = $metaDescription ?? 'MESH-S v2 – neu strukturierte PHP-Version des DIY-Solarknoten-Projekts.';
$activeNav = $activeNav ?? '';
$rootPath = $rootPath ?? '';
$u = static fn(string $path): string => $rootPath . ltrim($path, '/');
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES) ?>">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES) ?></title>
  <link rel="icon" href="<?= htmlspecialchars($u('assets/favicon.svg'), ENT_QUOTES) ?>" type="image/svg+xml">
  <link rel="apple-touch-icon" href="<?= htmlspecialchars($u('assets/apple-touch-icon.png'), ENT_QUOTES) ?>">
  <link rel="stylesheet" href="<?= htmlspecialchars($u('css/base.css'), ENT_QUOTES) ?>">
  <link rel="stylesheet" href="<?= htmlspecialchars($u('css/themes.css'), ENT_QUOTES) ?>">
  <link rel="stylesheet" href="<?= htmlspecialchars($u('css/v2.css'), ENT_QUOTES) ?>">
</head>
<body>
<a href="#main-content" class="skip-link">Zum Inhalt springen</a>
<header class="v2-header">
  <div class="container nav">
    <a class="nav-logo" href="<?= htmlspecialchars($u('index.php'), ENT_QUOTES) ?>">
      <img src="<?= htmlspecialchars($u('assets/favicon.svg'), ENT_QUOTES) ?>" alt="" class="nav-logo-icon" width="64" height="64" decoding="async">
      <span>MESH-S v2</span>
    </a>
    <nav class="nav-links">
      <a href="<?= htmlspecialchars($u('index.php'), ENT_QUOTES) ?>" <?= $activeNav === 'home' ? 'aria-current="page"' : '' ?>>Start</a>
      <a href="<?= htmlspecialchars($u('models/s.php'), ENT_QUOTES) ?>" <?= $activeNav === 'models' ? 'aria-current="page"' : '' ?>>Modelle</a>
      <a href="<?= htmlspecialchars($u('gallery.php'), ENT_QUOTES) ?>" <?= $activeNav === 'gallery' ? 'aria-current="page"' : '' ?>>Galerie</a>
      <a href="<?= htmlspecialchars($u('viewer.php'), ENT_QUOTES) ?>" <?= $activeNav === 'viewer' ? 'aria-current="page"' : '' ?>>3D-Viewer</a>
      <details class="nav-more" aria-expanded="false">
        <summary>Mehr</summary>
        <div class="nav-more-menu">
          <a href="<?= htmlspecialchars($u('privacy.php'), ENT_QUOTES) ?>">Datenschutz</a>
          <a href="<?= htmlspecialchars($u('impressum.php'), ENT_QUOTES) ?>">Impressum</a>
        </div>
      </details>
    </nav>
    <div class="nav-actions">
      <a class="btn btn-outline" href="mailto:contact@mesh-s.org">contact@mesh-s.org</a>
    </div>
  </div>
</header>
<main id="main-content">
