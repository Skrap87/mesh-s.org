<?php
return [
  'name' => 'MESH-S / M',
  'summary' => 'Mittelgroße Ausführung mit alternativer Innenstruktur und Winterbeobachtungen aus dem Feldeinsatz.',
  'heroImage' => '../site/assets/variants/m/hero/hero-m.PNG',
  'gallery' => [
    '../site/assets/variants/m/winter/images/node_winter.jpg',
    '../site/assets/gallery/knoten-06.jpg',
    '../site/assets/gallery/knoten-09.jpg'
  ],
  'features' => [
    'Angepasste Spacer-Geometrie für M-Chassis',
    'Dokumentierte Feuchteverläufe innen/außen',
    '3D-Modell und STEP-Teile für Nachbau verfügbar'
  ],
  'charts' => [
    ['title' => 'Ladestrom', 'json' => '../site/assets/variants/m/autonomy/charts/ha-charge.json', 'unit' => 'mA'],
    ['title' => 'Batteriespannung', 'json' => '../site/assets/variants/m/autonomy/charts/ha-voltage.json', 'unit' => 'V']
  ],
  'viewerModel' => '../site/assets/variants/m/models/mesh-m.glb',
  'bom' => [
    ['XIAO nRF52840 + Wio-SX1262', 'Controller + Funkmodul', '1'],
    ['18650 Battery Holder (4 Slot)', 'Akkuhalter', '1'],
    ['INA219', 'Strom-/Spannungsmessung', '1'],
    ['Amphenol Druckausgleichsventil', 'Feuchtigkeitsmanagement', '1']
  ]
];
