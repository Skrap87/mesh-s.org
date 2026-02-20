<?php
$rootPath = $rootPath ?? '';
$u = static fn(string $path): string => $rootPath . ltrim($path, '/');
?>
</main>
<footer>
  <div class="container footer-inner">
    <div>© <span id="year"></span> MESH-S. <span>Alle Rechte vorbehalten.</span></div>
    <div class="footer-disclaimer">Privates, nicht-kommerzielles DIY-Projekt. Nichts im Verkauf.</div>
    <div class="footer-links">
      <a href="<?= htmlspecialchars($u('index.php'), ENT_QUOTES) ?>">Startseite</a>
      <a href="<?= htmlspecialchars($u('privacy.php'), ENT_QUOTES) ?>">Datenschutz</a>
      <a href="<?= htmlspecialchars($u('impressum.php'), ENT_QUOTES) ?>">Impressum</a>
    </div>
  </div>
  <div class="container footer-license">
    <p>Inhalt lizenziert unter <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener">CC BY-NC 4.0</a> — nur für nicht-kommerzielle Nutzung.</p>
  </div>
</footer>

<div id="cookie-banner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie-Hinweis">
  <p><span>Diese Website verwendet keine Tracking-Cookies. Technische Einstellungen werden lokal im Browser gespeichert.</span> <a href="<?= htmlspecialchars($u('privacy.php'), ENT_QUOTES) ?>">Datenschutzerklärung</a></p>
  <button id="cookie-accept" class="btn btn-outline" type="button">OK</button>
</div>

<div class="lightbox" id="lightbox" inert role="dialog" aria-label="Bildvorschau">
  <div class="lightbox-backdrop" data-close></div>
  <div class="lightbox-panel" role="document">
    <div class="lightbox-header"><button class="lightbox-close" type="button" data-close aria-label="Schließen">×</button></div>
    <div class="lightbox-body">
      <img class="lightbox-img" id="lightboxImg" src="" alt="">
      <div class="lightbox-caption" id="lightboxCaption"></div>
    </div>
  </div>
</div>

<script src="<?= htmlspecialchars($u('js/site.js'), ENT_QUOTES) ?>" defer></script>
<?php foreach (($pageScripts ?? []) as $script): ?>
<script src="<?= htmlspecialchars($u($script), ENT_QUOTES) ?>" defer></script>
<?php endforeach; ?>
</body>
</html>
