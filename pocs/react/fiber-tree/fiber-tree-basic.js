function createFiberNode(type, key = null, props = {}) {
  return {
    type,
    key,
    props,
    stateNode: null,
    child: null, // First child
    sibling: null, // Next sibling
    return: null, // Parent node
    alternate: null,
    effectTag: null,
  };
}

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
