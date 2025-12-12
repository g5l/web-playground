# Tax Calculator (React Server Components Demo)

A small demo app that showcases React Server Components (RSC) working with a client-side form that submits via GET and renders the result with a Server Component. It uses an Express server to stream the RSC tree and Webpack to build the client bundle and client manifest.

## Features

- Server component shell with streaming UI (`App.server.jsx`).
- Client-side form (`TaxForm.client.jsx`) that submits via GET and renders server-calculated results.
- Shared data and tax calculation logic (`src/data/taxData.js`).
- Express server that serves `/` and streams RSC from `/react`.
- Webpack build wired with `react-server-dom-webpack` plugin.

## Quick Start

Prerequisites: Node.js 18+ recommended.

1. Install dependencies
   ```bash
   npm install
   ```

2. Build the client bundle and manifest
   ```bash
   npm run build
   ```

3. Start the server
   ```bash
   npm start
   ```

4. Open the app
   - http://localhost:3000

## Scripts

- `npm run build` — Runs Webpack to emit `public/main.js` and the client manifest used by RSC.
- `npm start` — Starts the Express server with `--conditions react-server`.

## Project Structure

```
.
├─ public/                      # Static assets + built client bundle
│  ├─ index.html
│  ├─ main.js                   # Built client bundle
│  └─ react-client-manifest.json
├─ server/
│  └─ server.js                 # Express + RSC streaming
├─ scripts/
│  └─ build.js                  # Webpack build with RSC plugin
├─ src/
│  ├─ components/
│  │  ├─ App.server.jsx         # Server component shell
│  │  ├─ TaxForm.client.jsx     # Client form (GET submit)
│  │  └─ TaxResult.server.jsx   # Server result view (default)
│  ├─ data/
│  │  └─ taxData.js             # Products, states, years, calculateTax()
│  └─ index.js                  # Client entry using createFromFetch()
└─ package.json
```

## How It Works

- Server: `server/server.js` sets up RSC with `react-server-dom-webpack/node-register` and `@babel/register`. It serves `/` with `public/index.html` and streams the server component tree from `/react` using `renderToPipeableStream` and the client manifest.
- Client: `src/index.js` uses `createFromFetch(fetch('/react'))` to stream and render the server component payload.
- App composition: `App.server.jsx` (Server Component) renders `TaxForm.client.jsx` and `TaxResult.server.jsx`. The form submits to `/` with GET, the client boot code fetches `/react` with the same query string, and the server computes the result and renders it in the Server Component.

## RSC Gotchas (and how this repo handles them)

- Event handlers cannot cross the server→client boundary. Do not pass function props (e.g., `onClick`, `onCalculate`) from a Server Component into a Client Component.
  - This app avoids that by submitting the form via GET and letting the server compute and stream the result.
- If you change components, re-run `npm run build` so the client manifest is up to date.

## Customization

- Add or edit products, states, years, and tax rates in `src/data/taxData.js`.
- Adjust the form or calculation UX in `src/components/TaxForm.client.jsx`.
- If you want server-side calculation, you can:
  - Use Server Actions (React 19) and invoke them from the client; or
  - Post to an API route and render a server result component based on response state.

## Troubleshooting

- Error: "Event handlers cannot be passed to Client Component props" — Ensure you are not passing functions from a Server Component to a Client Component. Move the handler into a Client Component or use Server Actions.
- Blank page or missing UI — Make sure you ran `npm run build` before `npm start` so `public/react-client-manifest.json` exists.
- Port conflicts — The server uses `PORT` env or defaults to `3000`.
