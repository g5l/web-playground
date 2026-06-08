# useEffect Race Condition Guard

A side-by-side POC demonstrating the classic race condition that happens when `useEffect` triggers async data fetching, and two patterns that fix it.

## The Problem

When `query` changes faster than the network responds, multiple in-flight requests overlap. Whichever one resolves last "wins" and paints the UI, even if it was triggered by an older, now-irrelevant query. The result is stale data clobbering fresh results.

```
Type "a"   → request A fires (slow: 1800ms)
Type "ap"  → request B fires (fast: 300ms)
B resolves → UI shows results for "ap"  ✓
A resolves → UI overwrites with results for "a"  ✗ (stale!)
```

## The Fixes

### AbortController (preferred)

Use the `useEffect` cleanup to call `controller.abort()`. The browser cancels the underlying network request immediately, so no unnecessary work happens on the wire either.

```tsx
useEffect(() => {
  const controller = new AbortController()
  ;(async () => {
    try {
      const res = await fetch(`/api/search?q=${query}`, { signal: controller.signal })
      setResults(await res.json())
    } catch (err) {
      if (err instanceof DOMException && err.name !== 'AbortError') throw err
    }
  })()
  return () => controller.abort()
}, [query])
```

### Ignore flag (fallback)

For APIs that do not support `AbortSignal` (third-party SDKs, older clients), a boolean flag in the closure achieves the same effect at the React level. The request still completes in the background, but its result is discarded.

```tsx
useEffect(() => {
  let ignore = false
  fetchResults(query).then((data) => {
    if (!ignore) setResults(data)
  })
  return () => { ignore = true }
}, [query])
```

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174).

## How to Trigger the Race Condition

Type a fruit name **one character at a time**, pausing briefly between characters (e.g. type `a`, wait, type `p`, wait, type `p`). The fake API deliberately slows down single-character queries (~1.8s) relative to longer ones (~300ms), so the first request reliably resolves after the second. The **Broken** panel will flash stale results; the two **Safe** panels will always show the current query's results.

The event log under each panel shows every fetch, abort, and resolved event so you can trace the exact execution order.

## File Structure

```
src/
  App.tsx        Main component with all three search panels
  App.css        Styles
  fakeApi.ts     Simulated search API with configurable delays
  useLog.ts      Tiny hook for the per-panel event log
  main.tsx       Entry point
  index.css      Global reset and shared styles
```

## Key Takeaway

The `useEffect` cleanup function is not just for unsubscribing from observables. For any async operation that writes to state, the cleanup must either abort the request or set an ignore flag. Without it, React has no way to know that an older response is now irrelevant.
