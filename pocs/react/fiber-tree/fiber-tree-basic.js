function createFiberNode(type, key = null, props = {}) {
  return {
    type,
    key,
    props,
    stateNode: null,
    child: null,
    sibling: null,
    return: null,
    alternate: null,
    effectTag: null,
  };
}

// Create nodes
const app = createFiberNode('App');
const header = createFiberNode('Header');
const main = createFiberNode('Main');
const footer = createFiberNode('Footer');

// Link the tree
app.child = header;
header.return = app;
header.sibling = main;

main.return = app;
main.sibling = footer;

footer.return = app;

// Simple traversal
function printFiberTree(fiber, indent = 0) {
  while (fiber) {
    console.log(' '.repeat(indent) + fiber.type);
    if (fiber.child) {
      printFiberTree(fiber.child, indent + 2);
    }
    fiber = fiber.sibling;
  }
}

printFiberTree(app);
