import { Fiber, Hook } from '../types/index';
import {
  getCurrentRoot,
  getWipRoot,
  setWipRoot,
  setNextUnitOfWork,
  clearDeletions,
} from './reconciler';

let wipFiber: Fiber | null = null;
let hookIndex: number | null = null;

export function useState<T = any>(initial: T): [T, (action: (prev: T) => T) => void] {
  const oldHook: Hook | undefined =
    wipFiber &&
    wipFiber.alternate &&
    wipFiber.alternate.hooks
      ? wipFiber.alternate.hooks[hookIndex as number]
      : undefined;
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
    const current = getCurrentRoot();
    if (current) {
      const newRoot: Fiber = {
        type: current.type,
        dom: current.dom,
        props: current.props,
        alternate: current,
      } as Fiber;
      setWipRoot(newRoot);
      clearDeletions();
      setNextUnitOfWork(getWipRoot());
    }
  };
  if (wipFiber) {
    if (!wipFiber.hooks) {
      wipFiber.hooks = [];
    }
    wipFiber.hooks.push(hook);
  }
  if (hookIndex !== null) {
    hookIndex++;
  }
  return [hook.state, setState];
}

export function setWipFiber(fiber: Fiber): void {
  wipFiber = fiber;
  hookIndex = 0;
}

export function useReducer<S, A>(
  reducer: (state: S, action: A) => S,
  initialArg: S,
  init?: (arg: S) => S
): [S, (action: A) => void] {
  const initialState = init ? init(initialArg) : initialArg;
  const [state, setState] = useState<S>(initialState);
  const dispatch = (action: A) => setState(prev => reducer(prev, action));
  return [state, dispatch];
}
