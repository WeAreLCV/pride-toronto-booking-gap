#!/usr/bin/env node
/**
 * Build-time rasterizer: converts public/og-image.svg → public/og-image.png
 * at 1200×630 with a density boost for crisp typography.
 *
 * Runs automatically via the `prebuild` npm hook, and can be executed
 * manually:   node scripts/build-og-image.js
 *
 * Note on fonts: sharp/librsvg do not load Google Fonts from <style> @import.
 * The SVG deliberately declares a serif + mono fallback stack, which yields
 * a clean, editorial look in the rasterized PNG even without Fraunces.
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const INPUT = path.join(ROOT, "public", "og-image.svg");
const OUTPUT = path.join(ROOT, "public", "og-image.png");

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`[og] SVG not found: ${INPUT}`);
    process.exit(1);
  }

  const svg = fs.readFileSync(INPUT);

  await sharp(svg, { density: 288 }) // 4× 72dpi for crisp raster output
    .resize(1200, 630, {
      fit: "contain",
      background: { r: 41, g: 41, b: 41, alpha: 1 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(OUTPUT);

  const stat = fs.statSync(OUTPUT);
  console.log(
    `[og] Wrote ${path.relative(ROOT, OUTPUT)} (${(stat.size / 1024).toFixed(1)} kB, 1200×630)`
  );
}

main().catch((err) => {
  console.error("[og] Failed to build og-image.png:", err);
  process.exit(1);
});
