// Process hanko/stamp images: remove white BG, optionally invert for dark sections
// Run from this directory: node process-stamps.js
const sharp = require('sharp');
const path = require('path');

// Dark stamps that will be displayed on DARK page backgrounds
// → INVERT colors + alpha based on darkness (so light stamp appears with dark carved kanji)
const DARK_STAMPS_FOR_DARK_BG = [
  'hanko-jisseki-gohon.png',
  'hanko-taio-gogyo.png',
  'hanko-saitan-yokujitsu.png',
  'hanko-shijo-no-ri.png',
  'hanko-godan-no-michi.png',
  'hanko-ryokin-sandan.png',
];

// Colored stamps (red/朱赤) and ink images - just remove white BG to transparency
const COLORED_STAMPS_KEEP_COLOR = [
  'hanko-hien-brand.png',  // B-7 朱赤 square with white 飛燕
  'hien-mark-v3.png',      // A-2 朱赤 square with white 飛
  'hien-logo-v3.png',      // A-1 black 飛燕+HIEN+red rule on white
  'hero-brand-sumi.png',   // D-1 black 飛 燕 brushwork on white
];

// Output target widths (must match earlier sharp resize sizes)
const TARGET_WIDTH = {
  'hanko-jisseki-gohon.png': 384,
  'hanko-taio-gogyo.png': 384,
  'hanko-saitan-yokujitsu.png': 384,
  'hanko-shijo-no-ri.png': 384,
  'hanko-godan-no-michi.png': 384,
  'hanko-ryokin-sandan.png': 384,
  'hanko-hien-brand.png': 512,
  'hien-mark-v3.png': 512,
  'hien-logo-v3.png': 720,
  'hero-brand-sumi.png': 1200,
};

async function processInvertWithAlpha(filename) {
  const targetW = TARGET_WIDTH[filename];
  // Resize first, then read raw pixels
  const { data, info } = await sharp(filename)
    .resize(targetW)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data); // make mutable copy
  const len = pixels.length;
  const channels = info.channels;

  for (let i = 0; i < len; i += channels) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const brightness = (r + g + b) / 3;
    // Invert RGB
    pixels[i] = 255 - r;
    pixels[i + 1] = 255 - g;
    pixels[i + 2] = 255 - b;
    // Alpha = inverted brightness (originally dark pixels → high alpha after invert)
    // White (brightness 255) → alpha 0 (transparent)
    // Black (brightness 0) → alpha 255 (opaque)
    pixels[i + 3] = Math.round(255 - brightness);
  }

  const outBase = filename.replace('.png', '-trans');
  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toFile(outBase + '.png');

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(outBase + '.webp');

  console.log(`✓ inverted: ${filename} → ${outBase}.{png,webp}`);
}

async function processRemoveWhite(filename) {
  const targetW = TARGET_WIDTH[filename];
  const { data, info } = await sharp(filename)
    .resize(targetW)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  const len = pixels.length;
  const channels = info.channels;

  for (let i = 0; i < len; i += channels) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const brightness = (r + g + b) / 3;
    // Steeper ramp: 215 → alpha 255, 235 → alpha 0
    if (brightness > 215) {
      const alpha = Math.max(0, Math.round(255 - (brightness - 215) * (255 / 20)));
      pixels[i + 3] = alpha;
    }
  }

  const outBase = filename.replace('.png', '-trans');
  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toFile(outBase + '.png');

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(outBase + '.webp');

  console.log(`✓ keyed: ${filename} → ${outBase}.{png,webp}`);
}

(async () => {
  console.log('=== Processing dark stamps (invert + alpha) ===');
  for (const f of DARK_STAMPS_FOR_DARK_BG) {
    await processInvertWithAlpha(f);
  }
  console.log('=== Processing colored stamps (remove white BG) ===');
  for (const f of COLORED_STAMPS_KEEP_COLOR) {
    await processRemoveWhite(f);
  }
  console.log('Done.');
})().catch(e => { console.error(e); process.exit(1); });
