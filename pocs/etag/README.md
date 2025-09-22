# ETag POC

Small Express app demonstrating conditional requests with ETag.

What it shows:
- Generates an ETag from the response body.
- Returns 304 Not Modified when `If-None-Match` matches.
- Uses `Cache-Control: public, max-age=0` to force revalidation each request (good for demos).
- The resource "version" changes every 15 seconds to trigger a new ETag.

## Setup
- Node.js 18+ recommended.
- Install dependencies: `npm install`

## Run
- Dev (with reload): `npm run dev`
- Or plain Node: `node server.js`

Server starts at `http://localhost:3000/resource`.

## Try it
1) First request (200 OK with body and ETag):
```
curl -i http://localhost:3000/resource
```

2) Copy the `ETag` value from the response headers, then send it back via `If-None-Match` (expect 304):
```
curl -i -H "If-None-Match: <ETAG_FROM_STEP_1>" http://localhost:3000/resource
```

3) Wait ~15 seconds (the demo rotates versions), then request again using the old ETag (expect 200 with new body and new ETag):
```
curl -i -H "If-None-Match: <OLD_ETAG>" http://localhost:3000/resource
```

## Notes
- This app manually computes the ETag with the `etag` package for clarity. You could also let Express handle it with `app.set('etag', true)`.
- To change how often the resource changes, edit the divisor in `getResource()` inside `server.js`.

