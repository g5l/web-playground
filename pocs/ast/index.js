import fs from 'fs';
import path from 'path';
import { parse } from 'acorn';
import * as walk from 'acorn-walk';

function loadCode(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function showAst(code) {
  const ast = parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    locations: true,
  });
  console.log('--- AST root object ---');
  console.dir(ast, { depth: 4 });
  return ast;
}

function simpleWalk(ast) {
  console.log('\n-- simpleWalk: Literals & Identifiers --');
  walk.simple(ast, {
    Literal(node) {
      console.log(`Literal found: value="${node.value}", at line ${node.loc.start.line}`);
    },
    Identifier(node) {
      console.log(`Identifier: name="${node.name}", line ${node.loc.start.line}`);
    }
  });
}

function fullWalk(ast) {
  console.log('\n-- fullWalk: Node types visited --');
  walk.full(ast, (node) => {
    console.log(node.type);
  });
}

function ancestorWalk(ast) {
  console.log('\n-- ancestorWalk: BinaryExpressions and ancestors --');
  walk.ancestor(ast, {
    BinaryExpression(node, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      console.log(`BinaryExpression at line ${node.loc.start.line}: operator="${node.operator}"`);
      console.log(` → Parent node type: ${parent.type}`);
    }
  });
}

function main() {
  const code = loadCode(path.join(process.cwd(), 'sample.js'));
  const ast = showAst(code);
  simpleWalk(ast);
  fullWalk(ast);
  ancestorWalk(ast);
}

main();
