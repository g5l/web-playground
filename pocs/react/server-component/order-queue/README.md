# Restaurant Queue (Express + React Server Components)

Goal-focused, minimal POC that uses Express and React Server Components to show a live queue of dishes and their estimated ready times.

## Features
- Add orders (single dish per order) via simple form.
- Server computes ETA per dish based on queue order and prep times.
- UI rendered as React Server Components (no Tailwind, minimal CSS).

## Run
1. Install deps:
   - `npm --prefix order-queue install`
2. Start server:
   - `npm --prefix order-queue start`
3. Open http://localhost:3003

Notes
- In-memory store only; restart clears the queue.
- Uses Webpack to bundle the browser client.
- For development, run `npm --prefix order-queue run build:watch` in one terminal and `npm --prefix order-queue run dev` in another.
