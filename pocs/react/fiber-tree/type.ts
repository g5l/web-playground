export type FiberNode = {
  type: string | Function;
  key: string | null;
  stateNode: any;
  child: FiberNode | null;
  sibling: FiberNode | null;
  return: FiberNode | null;
  alternate: FiberNode | null;
  pendingProps: any;
  memoizedProps: any;
  effectTag: string | null;
};