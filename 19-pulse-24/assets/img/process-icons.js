// Flood-fill transparency: 外側corners から expand、内側(P)は保護
const sharp = require('sharp');

const ICONS = [
  { in: 'pulse24-app-icon.png', size: 512 },
  { in: 'pulse24-mark.png', size: 720 },
  { in: 'pulse24-logo.png', size: 1200 },
];

async function floodTransparency(filename, targetWidth) {
  // removeAlpha → ensureAlpha でアルファをリセット (255)
  const { data, info } = await sharp(filename)
    .resize(targetWidth)
    .removeAlpha()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const pixels = Buffer.from(data);
  const visited = new Uint8Array(w * h);
  const THRESHOLD = 215;

  // Stack-based flood fill (BFS using array .pop())
  const stack = [];

  // Seed from all 4 edges
  for (let x = 0; x < w; x++) {
    stack.push(x);
    stack.push(x + (h - 1) * w);
  }
  for (let y = 0; y < h; y++) {
    stack.push(y * w);
    stack.push(y * w + w - 1);
  }

  while (stack.length > 0) {
    const idx = stack.pop();
    if (idx < 0 || idx >= w * h) continue;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const i = idx * 4;
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const brightness = (r + g + b) / 3;

    if (brightness < THRESHOLD) continue; // 暗い ピクセルで expansion 停止 (黒い枠など)

    // Smooth alpha ramp: 240+ → 0, 215 → 255
    const alpha = brightness > 240
      ? 0
      : Math.max(0, Math.round(255 - (brightness - 215) * (255 / 25)));
    pixels[i + 3] = alpha;

    // Expand to 4 neighbors
    const x = idx % w;
    const y = Math.floor(idx / w);
    if (x > 0) stack.push(idx - 1);
    if (x < w - 1) stack.push(idx + 1);
    if (y > 0) stack.push(idx - w);
    if (y < h - 1) stack.push(idx + w);
  }

  // Save PNG (overwrite)
  await sharp(pixels, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(filename);

  // Save WebP
  const webpPath = filename.replace('.png', '.webp');
  await sharp(pixels, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(webpPath);

  console.log(`✓ ${filename} (${w}x${h}) → flood-fill from edges done`);
}

(async () => {
  for (const cfg of ICONS) {
    await floodTransparency(cfg.in, cfg.size);
  }
  console.log('All icons processed. P/inner contents preserved.');
})().catch(e => { console.error(e); process.exit(1); });
