<?php
return [
  'name' => 'MESH-S / L',
  'summary' => 'Große Plattform in Entwicklung: vorhandene Messkurven und 3D-Stand als eigene Dokumentationsseite.',
  'heroImage' => '../site/assets/variants/l/hero/coming-soon.png',
  'gallery' => [
    '../site/assets/variants/l/hero/coming-soon.png',
    '../site/assets/gallery/knoten-10.jpg',
    '../site/assets/gallery/knoten-11.jpg'
  ],
  'features' => [
    'L-Formfaktor mit erweitertem Innenraum',
    'Autonomie- und Winterdaten als laufende Dokumentation',
    'Eigenständiges GLB-Modell für direkte Vorschau'
  ],
  'charts' => [
    ['title' => 'Ladestrom', 'json' => '../site/assets/variants/l/autonomy/charts/ha-charge.json', 'unit' => 'mA'],
    ['title' => 'Temperatur', 'json' => '../site/assets/variants/l/winter/charts/ha-temperature.json', 'unit' => '°C']
  ],
  'viewerModel' => '../site/assets/variants/l/models/mesh-l.glb',
  'bom' => [
    ['Solarpanel Reolink 6V / 6W', 'Leistungsreserve für Winter', '1'],
    ['RAK19003 Base Board', 'Alternative Trägerplatine', '1'],
    ['Sikaflex 554', 'Dicht- und Klebeelement', '1'],
    ['M3 Gewindeeinsätze', 'Mechanische Fixierung', '8']
  ]
];
