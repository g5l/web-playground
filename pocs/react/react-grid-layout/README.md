# react-grid-layout — Vite React examples

Two small examples using `react-grid-layout` with a modern React setup (Vite). No Tailwind.

<img width="1512" height="900" alt="image" src="https://github.com/user-attachments/assets/58ddcb42-127b-49dd-bf27-9cc0f6417dce" />

<img width="1504" height="632" alt="image" src="https://github.com/user-attachments/assets/3660f232-02a8-412e-abac-1cf7d0d4ee04" />

<img width="388" height="763" alt="image" src="https://github.com/user-attachments/assets/fc56771e-d798-4804-8a04-89169fe52618" />


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
