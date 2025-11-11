This repository hosts small, focused POCs to study React Server Components (RSC) using Next.js App Router. The examples are simple, self‑contained, and organized so you can add more POCs over time.

## Structure

- `src/app/pocs` – entry point for all POCs
  - `intro-rsc` – introductory RSC demo showing server vs client components, async server rendering, and server actions

Visit the POCs index at `/pocs`.

## Run locally

```bash
npm run dev
# then open http://localhost:3000/pocs
```

## Intro RSC POC

Route: `/pocs/intro-rsc`

Highlights:

- Server Components (default in `app/`):
  - `ServerTime` simulates server‑side data fetching (`async/await`).
  - `ServerEnv` reads server‑only data (`process.version`).
- Client Components (`"use client"`):
  - `ClientCounter` demonstrates interactivity and client state.
- Server Actions:
  - `EchoForm` uses a server action to process form data and update UI via `useActionState`.

## Adding more POCs

1. Create `src/app/pocs/<your-poc>/page.tsx`.
2. Add server components in the same folder (no `"use client"`).
3. Add client components with `"use client"` as needed.
4. Update `src/app/pocs/page.tsx` to list your new POC.
