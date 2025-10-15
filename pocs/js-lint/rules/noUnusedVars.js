import { parse } from 'acorn';
import * as walk from 'acorn-walk';

export const noUnusedVars = {
  name: 'noUnusedVars',

  run(code) {
    const ast = parse(code, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      locations: true,
    });

    const declaredVars = new Map();
    const usedNames = new Set();

    walk.simple(ast, {
      VariableDeclarator(node) {
        if (node.id?.name) {
          declaredVars.set(node.id.name, {
            line: node.loc.start.line,
            isParam: false,
          });
        }
      },
      FunctionDeclaration(node) {
        if (node.id?.name) {
          declaredVars.set(node.id.name, {
            line: node.loc.start.line,
            isParam: false,
          });
        }
        for (const param of node.params) {
          if (param.type === 'Identifier') {
            declaredVars.set(param.name, {
              line: param.loc.start.line,
              isParam: true,
            });
          }
        }
      },
      FunctionExpression(node) {
        for (const param of node.params) {
          if (param.type === 'Identifier') {
            declaredVars.set(param.name, {
              line: param.loc.start.line,
              isParam: true,
            });
          }
        }
      },
      ArrowFunctionExpression(node) {
        for (const param of node.params) {
          if (param.type === 'Identifier') {
            declaredVars.set(param.name, {
              line: param.loc.start.line,
              isParam: true,
            });
          }
        }
      },
    });

    walk.ancestor(ast, {
      Identifier(node, ancestors) {
        const parent = ancestors[ancestors.length - 2];

        if (
          (parent.type === 'VariableDeclarator' && parent.id === node) ||
          (parent.type === 'FunctionDeclaration' && parent.params.includes(node)) ||
          (parent.type === 'FunctionExpression' && parent.params.includes(node)) ||
          (parent.type === 'ArrowFunctionExpression' && parent.params.includes(node))
        ) {
          return;
        }

        usedNames.add(node.name);
      },
    });

    const results = [];

    for (const [name, info] of declaredVars.entries()) {
      if (!usedNames.has(name)) {
        results.push({
          rule: this.name,
          line: info.line,
          message: `Identifier "${name}" is declared but never used.`,
        });
      }
    }

    return results;
  },
};
