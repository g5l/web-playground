import { Fiber, Hook } from '../types/index';

let wipFiber: Fiber | null = null;
let hookIndex: number | null = null;

export function useState<T = any>(initial: T): [T, (action: (prev: T) => T) => void] {
  const oldHook: Hook | undefined =
    wipFiber &&
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex as number];
  const hook: Hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action: (prev: T) => T) => {
    hook.state = action(hook.state);
  });

  const setState = (action: (prev: T) => T) => {
    hook.queue.push(action);
    // wipRoot, currentRoot, nextUnitOfWork, deletions must be handled in reconciler
  };

  (wipFiber as Fiber).hooks.push(hook);
  (hookIndex as number)++;
  return [hook.state, setState];
}

export function setWipFiber(fiber: Fiber): void {
  wipFiber = fiber;
  hookIndex = 0;
} 