# Next.js Static Rendering Playground

This minimal Next.js app demonstrates static rendering (SSG) and Incremental Static Regeneration (ISR) using the App Router.

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – build for production
- `npm start` – run the production server

## Install and Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`.

## What to Explore

- `/` – Static page (no dynamic data), rendered at build time.
- `/blog` – Blog index is statically rendered (SSG).
- `/blog/[slug]` – Detail pages generated via `generateStaticParams`.
- `/isr` – ISR example with `revalidate = 30`.

## Notes

- Static rendering happens when a route has no dynamic data or uses static data at build time.
- `generateStaticParams` pre-builds dynamic routes for provided params.
- ISR updates previously generated static pages after deployment on a schedule using `export const revalidate`.

