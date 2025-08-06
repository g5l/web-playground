let nextUnitOfWork = null;

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}

function performUnitOfWork(fiber) {
  console.log(`Working on ${fiber.type}`);

  if (fiber.child) return fiber.child;

  let next = fiber;
  while (next) {
    if (next.sibling) return next.sibling;
    next = next.return;
  }

  return null;
}

// Build a large tree
function createBigTree() {
  const root = createFiberNode('Root');
  let current = root;
  for (let i = 0; i < 1000; i++) {
    const child = createFiberNode(`Div${i}`);
    current.child = child;
    child.return = current;
    current = child;
  }
  return root;
}

nextUnitOfWork = createBigTree();
requestIdleCallback(workLoop);
