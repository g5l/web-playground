# HTTP Cache POC

A tiny Express server + static page to demonstrate practical HTTP caching:

- Cache-Control directives: `max-age`, `must-revalidate`, `immutable`, `no-store`, `stale-while-revalidate`
- Validators and conditional requests: `ETag`, `Last-Modified`, `If-None-Match`, `If-Modified-Since`
- `Expires` header vs `Cache-Control`
- Per‑type static asset caching and long‑term immutable images
- `Vary: Accept-Encoding` example on a dynamic route

## Quick Start

Requirements: Node.js 18+.

```bash
npm install
npm start
# Server: http://localhost:4000  (set PORT to change)
```

Open http://localhost:4000 and use the buttons to fetch different endpoints. The page shows status, headers, and body so you can see 200 vs 304 transitions and cache directives.

## Endpoints

- `/` — Demo page at `public/index.html` with a simple client (`public/app.js`).
- `/public/*` — Static files with per‑type caching:
  - Images (`.png/.jpg/.webp`): `Cache-Control: public, max-age=31536000, immutable`
  - JS/CSS: `Cache-Control: public, max-age=3600, must-revalidate`
  - Others: `Cache-Control: public, max-age=60`
- `/resource` — Dynamic resource with:
  - Body changes every 10s (time buckets) to simulate content updates
  - `Cache-Control: public, max-age=5, stale-while-revalidate=30`
  - Strong `ETag` and `Last-Modified`
  - `Vary: Accept-Encoding`
  - Responds `304 Not Modified` when validators match (`If-None-Match` or `If-Modified-Since`)
- `/resource/:id` — Simple variant per id with `ETag` + `Cache-Control: public, max-age=10` and 304 handling.
- `/no-cache` — `Cache-Control: no-cache, no-store, must-revalidate` (+ legacy `Pragma` and `Expires: 0`). Never stored.
- `/expires` — Uses `Cache-Control: public, max-age=30` and sets an explicit `Expires` header to compare behaviors.

Server entry: `server.js` (Express). Static assets: `public/`.

## What to Observe

1) Strong validator flow (ETag)

```bash
# First request — 200, returns ETag and body
curl -i http://localhost:4000/resource

# Repeat with conditional header — expect 304 if content unchanged
ETAG=$(curl -sI http://localhost:4000/resource | awk -F': ' 'tolower($1)=="etag"{print $2}' | tr -d '\r')
curl -i -H "If-None-Match: $ETAG" http://localhost:4000/resource

# Wait until the 10s content bucket flips, then the ETag changes → 200
sleep 11 && curl -i -H "If-None-Match: $ETAG" http://localhost:4000/resource
```

2) Last-Modified flow

```bash
# Get current Last-Modified
LM=$(curl -sI http://localhost:4000/resource | awk -F': ' 'tolower($1)=="last-modified"{print $2}' | tr -d '\r')

# Conditional request by time — expect 304 while still in same 10s bucket
curl -i -H "If-Modified-Since: $LM" http://localhost:4000/resource

# After the bucket advances, expect 200
sleep 11 && curl -i -H "If-Modified-Since: $LM" http://localhost:4000/resource
```

3) Expires vs Cache-Control

```bash
curl -I http://localhost:4000/expires
# Note both Cache-Control: max-age=30 and an absolute Expires date
```

4) Static assets and immutable images

```bash
# JS served with must-revalidate and 1h TTL
curl -I http://localhost:4000/public/app.js

# Image served with a 1y TTL and immutable
curl -I http://localhost:4000/public/img/placeholder.png
```

5) Vary example

```bash
# Response includes Vary: Accept-Encoding (even without compression here)
curl -I http://localhost:4000/resource
```

## Browser Testing Tips

- Use DevTools → Network to see 200 vs 304 and which cache (memory/disk) is used.
- Normal reload can serve from cache; hard reload forces revalidation; “Disable cache” bypasses caches while DevTools is open.
- For immutable images, updates require a new URL (fingerprint) because caches will not revalidate.

## Notes

- The app uses a strong `ETag` (quoted) derived from the response body.
- `/resource` advertises `stale-while-revalidate=30`; not all intermediaries honor it, but modern browsers understand it for HTTP cache.
- The demo is intentionally minimal; no compression or CDN is configured, but headers illustrate common patterns you’d use with a proxy or CDN in front.

## File Map

- `server.js` — Express server implementing routes and cache headers
- `public/index.html` — Demo UI
- `public/app.js` — Fetch helpers displaying status/headers/body
- `public/img/placeholder.png` — Example immutable asset

## License

This proof‑of‑concept is for educational purposes.
