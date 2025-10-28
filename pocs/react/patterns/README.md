# Compound Pattern React (Vite)

A small React + TypeScript project showcasing the Compound Components pattern, migrated from Create React App to Vite for a faster dev/build setup.

## Tech Stack
- React 18 + TypeScript
- Vite 5 with `@vitejs/plugin-react`

## Quickstart
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Type check: `npm run typecheck`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Scripts
- `dev` – runs Vite dev server on localhost
- `build` – builds production assets to `dist/`
- `preview` – serves the production build locally
- `typecheck` – runs TypeScript without emitting files

## Project Structure
- `index.html` – Vite entry HTML
- `src/main.tsx` – React entry (bootstraps the app)
- `src/App.tsx` – top-level app component
- `src/pages/FlyoutExample.tsx` – example page using the compound component
- `src/components/FlyOut/` – compound components (FlyOut, Toggle, List, Item)

## Compound Pattern
The FlyOut menu is implemented using the Compound Components pattern. The parent component provides context and state; children consume it implicitly via context.

Usage example:

```tsx
import React from 'react';
import { FlyOut } from '../components/FlyOut';

const FlyoutExample: React.FC = () => (
  <FlyOut>
    <FlyOut.Toggle>Toggle Menu</FlyOut.Toggle>
    <FlyOut.List>
      <FlyOut.Item>Edit</FlyOut.Item>
      <FlyOut.Item>Delete</FlyOut.Item>
    </FlyOut.List>
  </FlyOut>
);

export default FlyoutExample;
```

How it’s wired:
- `FlyOut` provides `{ open, toggle }` via context.
- `FlyOut.Toggle` toggles the open state.
- `FlyOut.List` renders only when `open` is true.
- `FlyOut.Item` renders a list item within the menu.

## Notes
- This repo was migrated from CRA to Vite. If you previously used `npm start`, use `npm run dev` now.
- Keep new components organized by feature, and prefer the compound pattern when children need shared implicit state.
