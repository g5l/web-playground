# Restaurant Queue (Express + React Server Components)

Goal-focused, minimal POC that uses Express and React Server Components to show a live queue of dishes and their estimated ready times.

## Features
- Add orders (single dish per order) via simple form.
- Server computes ETA per dish based on queue order and prep times.
- UI rendered as React Server Components (no Tailwind, minimal CSS).

## Run
1. Install deps: `npm install`
2. Start server: `npm start`
3. Open http://localhost:3003

Notes
- In-memory store only; restart clears the queue.
- Uses Webpack to bundle the browser client.
- Server component `App.server.jsx` is compiled to `App.server.js` via `esbuild` during `npm run build`.
- For development:
  - Terminal A: `npm run build:client:watch`
  - Terminal B: `npm run build:server:watch`
  - Terminal C: `npm run dev`
