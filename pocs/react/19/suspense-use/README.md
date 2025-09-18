# Suspense + use() in Server Components (React 19)

This proof-of-concept demonstrates React 19 Server Components using `use(promise)` to suspend rendering under `<Suspense>` boundaries, streamed by Next.js App Router.

## What it shows

- Server Components that call `use(promise)` to read async data
- `<Suspense>` fallbacks that render while data is loading
- One fast data request and one with an artificial delay to make streaming visible

## Tech

- React `^19`
- Next.js `^15` (App Router, Server Components by default)

## Project structure

- `app/`
  - `layout.jsx` — Root layout
  - `page.jsx` — Renders two Suspense boundaries
  - `sections/Post.jsx` — Server Component, `use(getPost())`
  - `sections/Users.jsx` — Server Component, `use(getUsers({ delayMs }))`
- `lib/data.js` — Data helpers that return Promises

## Run locally

Prereqs: Node 18.18+ or 20+ recommended.

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

You should briefly see “Loading …” fallbacks, then the Post and Users content as each Promise resolves. The Users section has a ~1.5s artificial delay to highlight streaming.

## Key code snippets

Server Component using `use()`:

```jsx
import { use } from 'react';
import { getPost } from '../../lib/data.js';

export default function Post() {
  const post = use(getPost());
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
}
```

Suspense boundary in the page:

```jsx
<Suspense fallback={<p>Loading post…</p>}>
  <Post />
</Suspense>
```

## Notes

- The example fetches from `jsonplaceholder.typicode.com`; you can replace with your own API.
- This PoC focuses on showing `Suspense` + `use()` in Server Components rather than client interactivity or styling.

