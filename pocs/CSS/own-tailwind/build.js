const { scanFiles } = require('./src/scanner');
const utilities = require('./src/utilities');

const usedClasses = scanFiles(['./test']);

console.log([...usedClasses].join('\n'));

const matched = [];
const unmatched = [];

for (const cls of usedClasses) {
  if (utilities[cls]) {
    matched.push(cls);
  } else {
    unmatched.push(cls);
  }
}

console.log(`\n Matched: ${matched.length}`);
matched.forEach(c => console.log(`  - ${c}`));

if (unmatched.length > 0) {
  console.log(`\n Unmatched: ${unmatched.length}`);
  unmatched.forEach(c => console.log(`  - ${c}`));
}

console.log(`Total: ${Object.keys(utilities).length}`);
console.log(`Classes found in files: ${usedClasses.size}`);
console.log(`Classes with CSS rules: ${matched.length}`);
console.log(`\n unused utilities will NOT be in the bundle: ${Object.keys(utilities).length - matched.length}`);