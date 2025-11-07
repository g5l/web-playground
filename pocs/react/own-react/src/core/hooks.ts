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
let pendingEffects: Array<{ hook: Hook; create: () => void | (() => void); prevCleanup?: (() => void) | void }> = [];

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

export function useEffect(effect: () => void | (() => void), deps?: any[]): void {
  const oldHook: Hook | undefined =
    wipFiber &&
    wipFiber.alternate &&
    wipFiber.alternate.hooks
      ? wipFiber.alternate.hooks[hookIndex as number]
      : undefined;

  const hasChanged =
    !oldHook ||
    !('deps' in oldHook) ||
    deps === undefined ||
    !oldHook.deps ||
    oldHook.deps.length !== (deps ? deps.length : 0) ||
    (deps || []).some((d, i) => !Object.is(d, (oldHook.deps || [])[i]));

  const hook: Hook = {
    state: undefined,
    queue: [],
    deps: deps,
    effect: effect,
    cleanup: oldHook && oldHook.cleanup ? oldHook.cleanup : undefined,
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

  if (hasChanged) {
    pendingEffects.push({ hook, create: effect, prevCleanup: oldHook?.cleanup });
  }
}

export function flushEffects(): void {
  const toRun = pendingEffects;
  pendingEffects = [];
  for (const item of toRun) {
    if (typeof item.prevCleanup === 'function') {
      try {
        item.prevCleanup();
      } catch {
        // swallow cleanup errors in this minimal implementation
      }
    }
    try {
      const ret = item.create();
      item.hook.cleanup = ret as any;
    } catch {
      // swallow effect errors in this minimal implementation
    }
  }
}

export function cleanupFiber(fiber: Fiber): void {
  if (!fiber || !fiber.hooks) return;
  for (const h of fiber.hooks) {
    if (typeof h.cleanup === 'function') {
      try {
        h.cleanup();
      } catch {
        // ignore cleanup errors
      } finally {
        h.cleanup = undefined;
      }
    }
  }
}
