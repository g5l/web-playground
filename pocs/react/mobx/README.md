React + MobX POC (TypeScript)

This is a minimal proof‑of‑concept showing how to use MobX with React and TypeScript. No Tailwind, just basic CSS. It includes:

- Global stores via a RootStore and React context
- `CounterStore` with computed values and actions
- `TodoStore` with CRUD, derived counts, and a simulated async load
- Local component state with `useLocalObservable`

Getting Started

1) Install deps:

   npm install

2) Run dev server:

   npm run dev

3) Build for production:

   npm run build

Project Structure

- `src/stores/` — MobX stores (`CounterStore`, `TodoStore`, `RootStore`)
- `src/lib/StoreContext.tsx` — React context wiring for the stores
- `src/components/` — Simple components using `observer`
- `src/App.tsx` — Composition of examples

Key MobX Concepts in this POC

- makeAutoObservable: Turns class fields into observables, getters into computed, and methods into actions.
- observer: React component wrapper that tracks observable usage and re-renders when needed.
- runInAction: Groups state changes inside async flows.
- useLocalObservable: Lightweight local observable state inside a function component.

