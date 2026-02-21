<?php
$baseDir = dirname(__DIR__, 2) . '/site/assets/bom';
$indexPath = $baseDir . '/index.json';

if (!is_file($indexPath)) {
    return [];
}

$index = json_decode((string) file_get_contents($indexPath), true);
$itemFiles = $index['items'] ?? [];
$items = [];

foreach ($itemFiles as $itemFile) {
    $path = $baseDir . '/items/' . $itemFile;
    if (!is_file($path)) {
        continue;
    }
    $item = json_decode((string) file_get_contents($path), true);
    if (!is_array($item)) {
        continue;
    }
    $items[] = $item;
}

usort($items, static fn(array $a, array $b): int => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));

return $items;
