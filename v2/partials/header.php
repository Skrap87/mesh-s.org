<?php
$pageTitle = $pageTitle ?? 'MESH-S v2';
$metaDescription = $metaDescription ?? 'MESH-S v2 – neu strukturierte PHP-Version des DIY-Solarknoten-Projekts.';
$activeNav = $activeNav ?? '';
$basePath = '/v2/';
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= htmlspecialchars($metaDescription, ENT_QUOTES) ?>">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES) ?></title>
  <base href="<?= $basePath ?>">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/themes.css">
  <link rel="stylesheet" href="css/v2.css">
</head>
<body>
<a href="#main-content" class="skip-link">Zum Inhalt springen</a>
<header class="v2-header">
  <div class="container nav">
    <a class="nav-logo" href="index.php">
      <img src="assets/favicon.svg" alt="" class="nav-logo-icon" width="64" height="64" decoding="async">
      <span>MESH-S v2</span>
    </a>
    <nav class="nav-links">
      <a href="index.php" <?= $activeNav === 'home' ? 'aria-current="page"' : '' ?>>Start</a>
      <a href="models/s.php" <?= $activeNav === 'models' ? 'aria-current="page"' : '' ?>>Modelle</a>
      <a href="gallery.php" <?= $activeNav === 'gallery' ? 'aria-current="page"' : '' ?>>Galerie</a>
      <a href="viewer.php" <?= $activeNav === 'viewer' ? 'aria-current="page"' : '' ?>>3D-Viewer</a>
      <details class="nav-more" aria-expanded="false">
        <summary>Mehr</summary>
        <div class="nav-more-menu">
          <a href="privacy.php">Datenschutz</a>
          <a href="impressum.php">Impressum</a>
        </div>
      </details>
    </nav>
    <div class="nav-actions">
      <a class="btn btn-outline" href="mailto:contact@mesh-s.org">contact@mesh-s.org</a>
    </div>
  </div>
</header>
<main id="main-content">
