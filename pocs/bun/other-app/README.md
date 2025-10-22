# Bun POC — Notes App

Tiny full‑stack notes app showcasing Bun’s batteries‑included runtime:

- Serve HTTP with `Bun.serve` (API + static files)
- Persist data with `bun:sqlite` (no external deps)
- Broadcast changes over WebSockets
- Minimal frontend that consumes the API
- A few unit tests using `bun:test`

## Quick Start

Prerequisite: Bun v1.x installed (https://bun.sh)

- Install: `bun install`
- Dev server (hot reload): `bun run dev` then open `http://localhost:3000`
- Seed demo data (optional): `bun run seed`
- Run tests: `bun test`

Environment:

- `PORT` — server port (default `3000`)
- Data file lives at `./var/data.sqlite` (created on first run)

## Scripts

- `bun run dev` — start server with hot reload
- `bun run start` — start server once (no hot reload)
- `bun test` — run tests
- `bun run seed` — insert a few example notes

## API

Base URL: `http://localhost:3000`

- `GET /api/health` → `{ ok: true }`
- `GET /api/time` → `{ now: "2025-..." }`
- `GET /api/notes` → `{ notes: [...] }`
- `POST /api/notes` body `{ text }` → created note
- `GET /api/notes/:id` → note or 404
- `PUT /api/notes/:id` body `{ text }` → updated note
- `DELETE /api/notes/:id` → `{ ok: true }` or 404

Examples:

```sh
curl http://localhost:3000/api/health

curl http://localhost:3000/api/notes

curl -X POST http://localhost:3000/api/notes \
  -H 'content-type: application/json' \
  -d '{"text":"Hello from curl"}'

curl -X PUT http://localhost:3000/api/notes/1 \
  -H 'content-type: application/json' \
  -d '{"text":"Updated"}'

curl -X DELETE http://localhost:3000/api/notes/1
```

### WebSocket

- Connect to `ws://localhost:3000/ws`
- On connect you receive: `{"type":"hello","message":"connected"}`
- Server broadcasts on note changes:
  - `{"type":"created","note":{...}}`
  - `{"type":"updated","note":{...}}`
  - `{"type":"deleted","id":123}`

## Project Structure

- `src/server.js` — HTTP + WebSocket server, static file handler
- `src/api.js` — `/api/*` routes: health/time and Notes CRUD
- `src/db.js` — SQLite setup (database at `./var/data.sqlite`)
- `src/notes.js` — Notes model (schema + CRUD helpers)
- `public/` — Frontend (HTML/CSS/JS)
- `tests/` — Unit tests for the notes model
- `scripts/seed.js` — Simple seeding script

## Development Notes

- No external dependencies — everything runs with Bun’s stdlib.
- Database schema is created on startup; delete `./var/data.sqlite` to reset.
- Static file server prevents path traversal and only serves from `public/`.
- Hot reload uses `bun run --hot`.

## Troubleshooting

- Bun not found: install from https://bun.sh and ensure `bun --version` works.
- Port in use: set `PORT=3001 bun run dev`.
- Reset data: stop the server and delete `./var/data.sqlite`, then restart.
