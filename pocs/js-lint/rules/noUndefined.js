import { parse } from 'acorn';
import * as walk from 'acorn-walk';

function isFunction(node) {
  return (
    node?.type === 'FunctionDeclaration' ||
    node?.type === 'FunctionExpression' ||
    node?.type === 'ArrowFunctionExpression'
  );
}

function isBlock(node) {
  return node?.type === 'Program' || node?.type === 'BlockStatement' || isFunction(node);
}

function nearestVarScope(ancestors) {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const a = ancestors[i];
    if (a.type === 'Program' || isFunction(a)) return a;
  }
  return ancestors[0];
}

function nearestBlockScope(ancestors) {
  for (let i = ancestors.length - 2; i >= 0; i--) {
    const a = ancestors[i];
    if (isBlock(a)) return a;
  }
  return ancestors[0];
}

function ensure(map, node) {
  let set = map.get(node);
  if (!set) map.set(node, (set = new Set()));
  return set;
}

export const noUndefined = {
  name: 'noUndefined',

  run(code) {
    const ruleName = this.name;
    const ast = parse(code, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      locations: true
    });

    const scopes = new Map();

    walk.ancestor(ast, {
      VariableDeclarator(node, ancestors) {
        const decl = ancestors[ancestors.length - 2];
        if (!decl || decl.type !== 'VariableDeclaration') return;
        if (node.id?.type !== 'Identifier') return;
        const name = node.id.name;
        const target = decl.kind === 'var' ? nearestVarScope(ancestors) : nearestBlockScope(ancestors);
        ensure(scopes, target).add(name);
      },
      FunctionDeclaration(node, ancestors) {
        if (!node.id?.name) return;
        const target = nearestBlockScope(ancestors);
        ensure(scopes, target).add(node.id.name);
        for (const p of node.params) {
          if (p?.type === 'Identifier') ensure(scopes, node).add(p.name);
        }
      },
      FunctionExpression(node /*, ancestors */) {
        if (node.id?.name) ensure(scopes, node).add(node.id.name);
        for (const p of node.params) {
          if (p?.type === 'Identifier') ensure(scopes, node).add(p.name);
        }
      },
      ArrowFunctionExpression(node /*, ancestors */) {
        for (const p of node.params) {
          if (p?.type === 'Identifier') ensure(scopes, node).add(p.name);
        }
      }
    });
    
    function isDeclared(name, ancestors) {
      for (let i = ancestors.length - 1; i >= 0; i--) {
        const s = scopes.get(ancestors[i]);
        if (s && s.has(name)) return true;
      }
      return false;
    }

    const results = [];

    walk.ancestor(ast, {
      Identifier(node, ancestors) {
        const parent = ancestors[ancestors.length - 2];

        if (parent?.type === 'VariableDeclarator' && parent.id === node) return;
        if (parent?.type === 'FunctionDeclaration' && parent.id === node) return;

        if (parent?.type === 'MemberExpression' && parent.property === node && !parent.computed) return;
        if (parent?.type === 'Property' && parent.key === node && !parent.computed && !parent.shorthand) return;

        const name = node.name;
        if (!isDeclared(name, ancestors)) {
          results.push({ rule: ruleName, line: node.loc.start.line, message: `Identifier "${name}" is not defined.` });
        }
      },
    });

    return results;
  },
};
