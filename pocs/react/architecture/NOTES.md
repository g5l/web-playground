# Reconciler POC — Notes

## What this implementation handles

| Feature | Where in code |
|---|---|
| createElement / text boxing | `createElement`, `createTextElement` |
| Fresh mount | `createDom`, `render` |
| Prop diffing (attrs + listeners) | `updateDom` |
| Four base cases (null/null, remove, mount, same/diff type) | `update` |
| Unkeyed children diff (pairwise by index) | `diffUnkeyed` |
| Keyed children diff (map lookup + reorder) | `diffKeyed` |
| Mixed keyed/unkeyed fallback with warning | `reconcileChildren` |

## What it deliberately skips

- **Components** — there are no class or function components. `type` is always a DOM tag string. Components are the next layer (requires a fiber/work loop to handle re-renders and hooks).
- **Fragments** — no `<>...</>`. Would need a virtual container element.
- **Refs** — no `ref` prop.
- **Controlled inputs** — `value`/`checked` are uncontrolled here by design (the demo relies on this).
- **SVG namespaces** — `createElement` always uses `document.createElement`, not `createElementNS`.
- **Event delegation** — we attach listeners directly to each node; React attaches one listener at the root.
- **Batched updates / async rendering** — every state change synchronously re-renders the whole subtree.

## Key simplification vs React's keyed diff

React's `reconcileChildrenArray` (ReactChildFiber.js) uses a "last placed index" variable to track the furthest-right old position seen so far. A node is only moved if its old index is less than `lastPlacedIndex`. This implicitly finds the longest non-decreasing subsequence of old positions, minimising `insertBefore` calls. Our Step 4 always re-inserts any node that is not already at the correct index — correct but O(n) extra moves on reverse-sorted lists.

## Where to look in the React source

| This POC | Real React |
|---|---|
| `createElement` | `packages/react/src/jsx/ReactJSXElement.js` |
| `createDom` / `render` | `packages/react-dom/src/client/ReactDOMRoot.js`, `ReactFiberReconciler.js` |
| `updateDom` | `packages/react-dom-bindings/src/client/ReactDOMComponent.js` — `updateProperties` |
| `update` (four base cases) | `packages/react-reconciler/src/ReactFiber.js` — `createFiberFromElement` + `reconcileSingleElement` |
| `diffUnkeyed` | `packages/react-reconciler/src/ReactChildFiber.js` — `reconcileChildrenArray` (unkeyed path) |
| `diffKeyed` | same file — the `existingChildren` Map + placement loop |
