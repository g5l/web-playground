export const maxLineLength = {
  name: 'maxLineLength',
  limit: 120,

  run(code) {
    const lines = code.split('\n');
    const results = [];

    lines.forEach((line, i) => {
      if (line.length > this.limit) {
        results.push({
          rule: this.name,
          line: i + 1,
          message: `Line exceeds ${this.limit} characters (found ${line.length}).`
        });
      }
    });

    return results;
  }
};
