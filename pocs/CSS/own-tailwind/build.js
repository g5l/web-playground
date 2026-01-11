const fs = require('fs');
const path = require('path');
const { scanFiles } = require('./src/scanner');
const { generateCSS, generateAllCSS } = require('./src/generator');
const utilities = require('./src/utilities');

const CONFIG = {
  input: ['./test'],
  output: './dist/styles.css',
  extensions: ['.html', '.jsx', '.tsx', '.vue', '.js', '.ts'],
};

const distDir = path.dirname(CONFIG.output);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('🔍 Scanning files for classes...\n');

const usedClasses = scanFiles(CONFIG.input, CONFIG.extensions);

const matched = [];
const unmatched = [];

for (const cls of usedClasses) {
  if (utilities[cls]) {
    matched.push(cls);
  } else {
    unmatched.push(cls);
  }
}

console.log('\n📝 Generating CSS...');
const css = generateCSS(usedClasses, utilities);

fs.writeFileSync(CONFIG.output, css, 'utf-8');

console.log('\n✅ Build complete!\n');
console.log('=== SUMMARY ===');
console.log(`Total utilities available: ${Object.keys(utilities).length}`);
console.log(`Classes found in files:    ${usedClasses.size}`);
console.log(`Classes with CSS rules:    ${matched.length}`);
console.log(`Classes without rules:     ${unmatched.length}`);

if (unmatched.length > 0) {
  console.log('\n⚠️  Unmatched classes (no CSS generated):');
  unmatched.forEach(c => console.log(`   - ${c}`));
}

const stats = fs.statSync(CONFIG.output);
const fileSizeKB = (stats.size / 1024).toFixed(2);

console.log(`\n📦 Output: ${CONFIG.output}`);
console.log(`   Size: ${stats.size} bytes (${fileSizeKB} KB)`);

const fullCSS = generateAllCSS(utilities);
const fullSizeKB = (Buffer.byteLength(fullCSS, 'utf-8') / 1024).toFixed(2);
const savings = (100 - (stats.size / Buffer.byteLength(fullCSS, 'utf-8')) * 100).toFixed(1);

console.log(`\n🌳 Tree-shaking results:`);
console.log(`   Full bundle would be: ${fullSizeKB} KB`);
console.log(`   Your bundle is:       ${fileSizeKB} KB`);
console.log(`   You saved:            ${savings}% 🎉`);
