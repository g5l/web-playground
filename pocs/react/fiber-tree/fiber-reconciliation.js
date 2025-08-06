function createFiberNode(type, key = null, props = {}) {
  return {
    type,
    key,
    props,
    stateNode: null,
    child: null,
    sibling: null,
    return: null,
    alternate: null, // Link to old fiber for reconciliation
    effectTag: null, // Flags (e.g., "PLACEMENT", "UPDATE", "DELETION")
  };
}

// Previous ren
const prevMain = createFiberNode('Main', null, { className: 'old-main' });
const prevApp = createFiberNode('App');
prevApp.child = prevMain;
prevMain.return = prevApp;

// New render
const nextMain = createFiberNode('Main', null, { className: 'new-main' });
const nextApp = createFiberNode('App');
nextApp.child = nextMain;
nextMain.return = nextApp;

// Link alternates
nextApp.alternate = prevApp;
nextMain.alternate = prevMain;

// Simple reconciliation check
function reconcile(current, workInProgress) {
  if (
    current.type === workInProgress.type &&
    JSON.stringify(current.props) !== JSON.stringify(workInProgress.props)
  ) {
    workInProgress.effectTag = 'UPDATE';
  } else if (current.type !== workInProgress.type) {
    workInProgress.effectTag = 'REPLACE';
  } else {
    workInProgress.effectTag = 'NO_CHANGE';
  }
}

reconcile(prevMain, nextMain);
console.log(`${nextMain.type} effect:`, nextMain.effectTag);
