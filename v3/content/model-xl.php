<?php
return [
  'name' => 'MESH-S / XL',
  'summary' => 'Maximale Ausbauvariante mit großem Akkuraum und eigenem XL-3D-Modell.',
  'heroImage' => '../site/assets/variants/xl/hero/hero-xl.PNG',
  'gallery' => [
    '../site/assets/variants/xl/winter/images/coming-soon.png',
    '../site/assets/gallery/knoten-03.jpg',
    '../site/assets/gallery/knoten-12.jpg'
  ],
  'features' => [
    'XL-Spacer und Gehäuseteile für größere Energiepakete',
    'Ladestrom- und Batteriekurven aus dem XL-Teststand',
    'Modularer Aufbau für Antennen- und Sensoranpassungen'
  ],
  'charts' => [
    ['title' => 'Ladestrom', 'json' => '../site/assets/variants/xl/autonomy/charts/ha-charge.json', 'unit' => 'mA'],
    ['title' => 'Batterielevel', 'json' => '../site/assets/variants/xl/autonomy/charts/ha-battery.json', 'unit' => '%']
  ],
  'viewerModel' => '../site/assets/variants/xl/models/mesh-xl.glb',
  'bom' => [
    ['U.FL auf N-Type RG178', 'HF-Verbindung', '1'],
    ['Alfa 868MHz Antenne', 'LoRa-Antenne', '1'],
    ['Silikondichtung', 'Gehäuseabdichtung', '1'],
    ['Selbstschneidende Schrauben 2x10', 'Gehäusemontage', '12']
  ]
];
