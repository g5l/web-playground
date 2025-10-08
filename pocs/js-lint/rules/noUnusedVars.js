import { parse } from 'acorn';
import * as walk from 'acorn-walk';

export const noUnusedVars = {
  name: 'noUnusedVars',
  run(code) {
    const ast = parse(code, { ecmaVersion: 'latest', sourceType: 'module' });

    const declared = new Map();
    const used = new Set();
    const results = [];

    walk.simple(ast, {
      VariableDeclarator(node) {
        declared.set(node.id.name, node.loc.start.line);
      },
      FunctionDeclaration(node) {
        declared.set(node.id.name, node.loc.start.line);
      },
    });

    walk.simple(ast, {
      Identifier(node) {
        used.add(node.name);
      },
    });

    for (const [name, line] of declared.entries()) {
      if (!used.has(name)) {
        results.push({
          rule: this.name,
          line,
          message: `Variable "${name}" is declared but never used.`,
        });
      }
    }

    return results;
  },
};
