# AbortController POC

Minimal proof of concept showing how to cancel a `fetch` request using the native [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) API.

## How it works

1. A new `AbortController` instance is created when a fetch starts.
2. Its `signal` is passed to `fetch` via the options object.
3. Calling `controller.abort()` cancels the in-flight request.
4. The `catch` block checks `err.name === 'AbortError'` to distinguish a cancellation from a real error.

## Running

```bash
npm start
```

Then open `http://localhost:3000`. Opening `index.html` directly as a `file://` URL causes CORS errors because browsers treat that origin as `null`.

## Files

- `index.html` — markup
- `main.js` — all logic

## Notes

The fetch target is `https://reqres.in/api/users?delay=5`, a public CORS-friendly endpoint that waits 5 seconds before responding. This gives enough time to test the abort. Replace it with any URL you like.
