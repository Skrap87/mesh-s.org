<?php
return [
  'name' => 'MESH-S / S',
  'summary' => 'Kompakte Basisplattform für ganzjährigen Outdoor-Betrieb mit realer Telemetrie und vollständiger Dokumentation.',
  'heroImage' => '../site/assets/variants/s/hero/hero.png',
  'gallery' => [
    '../site/assets/variants/s/winter/images/node_winter2.jpg',
    '../site/assets/gallery/knoten-01.jpg',
    '../site/assets/gallery/knoten-02.jpg'
  ],
  'features' => [
    '4x 18650 Energiepaket im modularen Innenlayout',
    'ASA-Gehäuse mit Silikondichtung und Druckausgleichsventil',
    'Praxisdaten aus Home Assistant für Ladestrom, Spannung und Temperatur'
  ],
  'charts' => [
    ['title' => 'Ladestrom', 'json' => '../site/assets/variants/s/autonomy/charts/ha-charge.json', 'unit' => 'mA'],
    ['title' => 'Batterielevel', 'json' => '../site/assets/variants/s/autonomy/charts/ha-battery.json', 'unit' => '%']
  ],
  'viewerModel' => '../site/assets/variants/s/models/mesh-s.glb',
  'bom' => [
    ['XIAO nRF52840 + Wio-SX1262', 'Controller + Funkmodul', '1'],
    ['Solarpanel 5V / 2.7W', 'Energieversorgung', '1'],
    ['CN3065 MPPT Modul', 'Solar-Laderegelung', '1'],
    ['18650 Zellen', 'Akkupack', '4']
  ]
];
