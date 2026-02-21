<?php
if (!isset($pageTitle)) {
    $pageTitle = 'MESH-S v3';
}
if (!isset($pageDescription)) {
    $pageDescription = 'MESH-S v3 — eigenständige Modellseiten ohne Variantenlogik.';
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
  <link rel="icon" href="../site/assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../site/assets/apple-touch-icon.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="topbar">
  <div class="container topbar-inner">
    <a class="brand" href="index.php">MESH-S v3</a>
    <nav class="nav">
      <a href="index.php">Start</a>
      <a href="model-s.php">MESH-S / S</a>
      <a href="model-m.php">MESH-S / M</a>
      <a href="model-l.php">MESH-S / L</a>
      <a href="model-xl.php">MESH-S / XL</a>
    </nav>
  </div>
</header>
<main>
