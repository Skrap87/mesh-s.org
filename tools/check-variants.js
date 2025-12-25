#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const siteRoot = path.join(repoRoot, "site");
const variantsRoot = path.join(siteRoot, "assets", "variants");

const requiredChartKeys = ["temperature", "batteryLevel", "chargeCurrent"];
const requiredAssetArrays = ["customParts", "assembly", "bom"];

const errors = [];
const report = [];

const fileExists = (relativePath, context) => {
  const normalized = relativePath.replace(/^\/+/, "");
  const fullPath = path.join(siteRoot, normalized);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing file for ${context}: ${relativePath}`);
    return false;
  }
  return true;
};

const validateAssetList = (list, variantId, label) => {
  if (!Array.isArray(list)) {
    errors.push(`Variant ${variantId}: assets.${label} must be an array`);
    return;
  }
  list.forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      errors.push(`Variant ${variantId}: assets.${label} has invalid entry`);
      return;
    }
    if (!entry.id) {
      errors.push(`Variant ${variantId}: assets.${label} entry missing id`);
    }
    if (!entry.src) {
      errors.push(`Variant ${variantId}: assets.${label} entry missing src`);
      return;
    }
    fileExists(entry.src, `variant ${variantId} assets.${label}.${entry.id || "unknown"}`);
  });
};

const validateChart = (chart, variantId, key) => {
  if (!chart || typeof chart !== "object") {
    errors.push(`Variant ${variantId}: sections.charts.${key} missing`);
    return;
  }
  if (!chart.selector) {
    errors.push(`Variant ${variantId}: sections.charts.${key} missing selector`);
  }
  if (!chart.json) {
    errors.push(`Variant ${variantId}: sections.charts.${key} missing json`);
  } else {
    fileExists(chart.json, `variant ${variantId} chart ${key}`);
  }
  if (!chart.unit) {
    errors.push(`Variant ${variantId}: sections.charts.${key} missing unit`);
  }
};

const validateWinterImages = (images, variantId) => {
  if (!Array.isArray(images)) {
    errors.push(`Variant ${variantId}: sections.winter.images must be an array`);
    return;
  }
  images.forEach((image, index) => {
    if (!image || typeof image !== "object") {
      errors.push(`Variant ${variantId}: winter image ${index + 1} invalid`);
      return;
    }
    if (!image.selector) {
      errors.push(`Variant ${variantId}: winter image ${index + 1} missing selector`);
    }
    if (!image.src) {
      errors.push(`Variant ${variantId}: winter image ${index + 1} missing src`);
    } else {
      fileExists(image.src, `variant ${variantId} winter image ${index + 1}`);
    }
    if (!image.altKey) {
      errors.push(`Variant ${variantId}: winter image ${index + 1} missing altKey`);
    }
  });
};

const variantDirs = fs
  .readdirSync(variantsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

variantDirs.forEach((variantId) => {
  const variantPath = path.join(variantsRoot, variantId, "variant.json");
  if (!fs.existsSync(variantPath)) {
    errors.push(`Variant ${variantId}: missing variant.json`);
    return;
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(variantPath, "utf8"));
  } catch (error) {
    errors.push(`Variant ${variantId}: invalid JSON (${error.message})`);
    return;
  }

  if (!data.id) {
    errors.push(`Variant ${variantId}: missing id`);
  }
  if (!data.labels || !data.labels.badge || !data.labels.full) {
    errors.push(`Variant ${variantId}: labels.badge/full missing`);
  }
  if (!data.i18n || !data.i18n.modelLineKey) {
    errors.push(`Variant ${variantId}: i18n.modelLineKey missing`);
  }
  if (!data.assets) {
    errors.push(`Variant ${variantId}: assets missing`);
  } else {
    if (!data.assets.heroImage) {
      errors.push(`Variant ${variantId}: assets.heroImage missing`);
    } else {
      fileExists(data.assets.heroImage, `variant ${variantId} heroImage`);
    }
    if (!data.assets.heroImageWebp) {
      errors.push(`Variant ${variantId}: assets.heroImageWebp missing`);
    } else {
      fileExists(data.assets.heroImageWebp, `variant ${variantId} heroImageWebp`);
    }
    if (!data.assets.viewerModel) {
      errors.push(`Variant ${variantId}: assets.viewerModel missing`);
    } else {
      fileExists(data.assets.viewerModel, `variant ${variantId} viewerModel`);
    }

    requiredAssetArrays.forEach((key) => {
      validateAssetList(data.assets[key], variantId, key);
    });
  }

  if (!data.sections) {
    errors.push(`Variant ${variantId}: sections missing`);
  } else {
    if (!data.sections.winter) {
      errors.push(`Variant ${variantId}: sections.winter missing`);
    } else {
      validateWinterImages(data.sections.winter.images, variantId);
    }

    if (!data.sections.charts) {
      errors.push(`Variant ${variantId}: sections.charts missing`);
    } else {
      requiredChartKeys.forEach((key) => validateChart(data.sections.charts[key], variantId, key));
    }
  }

  report.push(`Checked ${variantId}`);
});

report.forEach((line) => console.log(line));

if (errors.length) {
  console.error("\nVariant validation failed:");
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

console.log("\nAll variants are valid.");
