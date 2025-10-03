export const noConsole = {
  name: 'noConsole',
  run(code) {
    const lines = code.split('\n');
    const results = [];

    lines.forEach((line, i) => {
      if (line.includes('console.')) {
        results.push({
          rule: this.name,
          line: i + 1,
          message: 'Avoid using console statements.'
        });
      }
    });

    return results;
  }
};
