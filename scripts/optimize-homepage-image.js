/**
 * One-off script to optimize assets/homepage-image.jpg for the hero.
 * Run from project root: node scripts/optimize-homepage-image.js
 * Requires: npm install sharp
 */
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '..', 'assets', 'homepage-image.jpg');
const outputPath = inputPath;

if (!fs.existsSync(inputPath)) {
  console.warn('assets/homepage-image.jpg not found. Add the file then run this script.');
  process.exit(1);
}

async function run() {
  try {
    const sharp = require('sharp');
    await sharp(inputPath)
      .resize(1600, null, { withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outputPath + '.tmp');
    fs.renameSync(outputPath + '.tmp', outputPath);
    console.log('Optimized assets/homepage-image.jpg');
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.warn('Run: npm install sharp');
    } else {
      console.error(e);
    }
    process.exit(1);
  }
}

run();
