# Tax RSC (no Next.js)

A minimal React Server Components demo implementing a simple tax system: different products have different tax rates per state and year. No Next.js — an Express server streams RSC payloads; the client bootstraps with a small esbuild-bundled script.

## Features

- React Server Components streamed from `GET /rsc`
- No client components required (no manifest needed)
- Form-driven UX: calculate tax by state/product/year/price
- Admin form to add/update tax rates (persisted to `data/tax-rates.json`)

## Project layout

- `src/server/index.mjs` — Express server and routes
- `src/server/rsc-app.mjs` — RSC tree (server-only React)
- `src/server/taxStore.mjs` — JSON-backed tax store
- `src/client/index.js` — client boot; fetches and renders RSC
- `public/` — static assets (`client.js` bundle, CSS)
- `data/tax-rates.json` — auto-created with seed data on first run

## Run locally

1) Install deps

```
npm install
```

2) Build client bundle

```
npm run build:client
```

3) Start server

```
npm run dev
```

Open http://localhost:3000

## Notes

- This demo avoids client components, so the RSC server uses an empty module map. If you add `"use client"` components later, you will need a client manifest and a bundler integration for RSDW.
- Rates are stored in `data/tax-rates.json`. The POST action `/action/add-rate` upserts a rate and redirects with a 303.
- Client intercepts GET form submissions to refresh only the RSC tree (POSTs cause a normal redirect).

## Inspired by

- React Server Components tutorial structure similar to devtails.xyz’s article (no Next.js approach).

