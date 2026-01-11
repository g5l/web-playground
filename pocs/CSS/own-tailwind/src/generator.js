function escapeClassName(className) {
  return className
    .replace(/\//g, '\\//')
    .replace(/:/g, '\\:')
    .replace(/\./g, '\\.')
    .replace(/%/g, '\\%');
}

function generateCSS(usedClasses, utilities) {
  const lines = [];

  lines.push('/*');
  lines.push(' * Auto-generated CSS');
  lines.push(` * Generated: ${new Date().toISOString()}`);
  lines.push(` * Classes included: ${usedClasses.size}`);
  lines.push(' */');
  lines.push('');

  lines.push('*, *::before, *::after { box-sizing: border-box; }');
  lines.push('');

  const sortedClasses = [...usedClasses].sort();

  for (const className of sortedClasses) {
    const properties = utilities[className];

    if (!properties) {
      continue;
    }

    const selector = `.${escapeClassName(className)}`;
    const declarations = [];

    for (const [property, value] of Object.entries(properties)) {
      declarations.push(`  ${property}: ${value};`);
    }

    lines.push(`${selector} {`);
    lines.push(declarations.join('\n'));
    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}

function generateAllCSS(utilities) {
  const allClasses = new Set(Object.keys(utilities));
  return generateCSS(allClasses, utilities);
}

module.exports = { generateCSS, generateAllCSS, escapeClassName };
