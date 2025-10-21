import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { noConsole } from './rules/noConsole.js';
import { noDebugger } from './rules/noDebugger.js';
import { indent } from './rules/indent.js';
import { maxLineLength } from './rules/maxLineLength.js';
import { noUnusedVars } from './rules/noUnusedVars.js';
import { noUndefined } from './rules/noUndefined.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RULES = [noConsole, noDebugger, indent, maxLineLength, noUnusedVars, noUndefined];

function lintFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const results = [];

  for (const rule of RULES) {
    const ruleResults = rule.run(code, filePath);
    results.push(...ruleResults);
  }

  if (results.length === 0) {
    console.log(`${filePath} passed all lint rules.`);
  } else {
    console.log(`${filePath} has issues:\n`);
    results.forEach(r => {
      console.log(`  [${r.rule}] Line ${r.line}: ${r.message}`);
    });
  }
}

function main() {
  const targetFile = process.argv[2];
  if (!targetFile) {
    console.error('Usage: node index.js <file.js>');
    process.exit(1);
  }

  const fullPath = path.resolve(targetFile);
  lintFile(fullPath);
}

main();
