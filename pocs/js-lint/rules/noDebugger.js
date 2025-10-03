export const noDebugger = {
  name: 'noDebugger',
  run(code) {
    const lines = code.split('\n');
    const results = [];

    lines.forEach((line, i) => {
      if (line.includes('debugger')) {
        results.push({
          rule: this.name,
          line: i + 1,
          message: 'Remove debugger statements.'
        });
      }
    });

    return results;
  }
};
