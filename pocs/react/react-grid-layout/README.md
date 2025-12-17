# react-grid-layout — Vite React examples

Two small examples using `react-grid-layout` with a modern React setup (Vite). No Tailwind.

## Structure

- `index.html` — Vite entry
- `src/main.jsx` — React entry
- `src/App.jsx` — toggles between two examples
- `src/examples/BasicGrid.jsx` — basic draggable + resizable grid
- `src/examples/ResponsiveGrid.jsx` — responsive grid with breakpoints
- `src/styles.css` — minimal styling

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview built app

## Setup

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the URL printed in the terminal (typically http://localhost:5173)

If you previously saw `vite: command not found`, it means dependencies weren't installed yet. Running `npm install` fixes it.

CSS from `react-grid-layout` and `react-resizable` is imported in `src/main.jsx`.
