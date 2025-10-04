export const indent = {
  name: 'indent',
  run(code) {
    const lines = code.split('\n');
    const results = [];
    const indentSize = 2;

    lines.forEach((line, i) => {
      if (line.trim() === '') return;

      const match = line.match(/^(\s*)/);
      const spaces = match ? match[1].length : 0;

      if (spaces % indentSize !== 0) {
        results.push({
          rule: this.name,
          line: i + 1,
          message: `Expected indentation multiple of ${indentSize} spaces.`
        });
      }
    });

    return results;
  }
};