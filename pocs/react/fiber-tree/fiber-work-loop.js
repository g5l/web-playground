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

const app = createFiberNode('App');
const header = createFiberNode('Header');
const main = createFiberNode('Main');
const footer = createFiberNode('Footer');

app.child = header;
header.return = app;
header.sibling = main;
main.return = app;
main.sibling = footer;
footer.return = app;

function performUnitOfWork(fiber) {
  console.log(`Begin Work: ${fiber.type}`);
  // Simulate work
  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    console.log(`Complete Work: ${nextFiber.type}`);
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.return;
  }

  return null;
}

function workLoop(root) {
  let nextUnit = root;
  while (nextUnit) {
    nextUnit = performUnitOfWork(nextUnit);
  }
}

workLoop(app);