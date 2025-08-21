type Listener = () => void;

function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<Listener>();

  const getSnapshot = () => state;

  const setState = (update: T | ((prev: T) => T)) => {
    state = typeof update === "function" ? (update as (p: T) => T)(state) : update;
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getSnapshot, setState, subscribe };
}

export const counterStore = (() => {
  const core = createStore({ count: 0 });

  return {
    getSnapshot: core.getSnapshot,
    subscribe: core.subscribe,

    increment() {
      core.setState((s) => ({ count: s.count + 1 }));
    },
    reset() {
      core.setState({ count: 0 });
    },
  };
})();
