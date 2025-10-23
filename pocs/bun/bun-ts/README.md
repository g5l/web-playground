# bun-ts

A TypeScript HTTP server proof of concept built with [Bun](https://bun.sh), demonstrating modern TypeScript features, path aliases, and CommonJS/ESM interoperability.

## Features

- 🚀 **Bun Runtime** - Fast JavaScript/TypeScript runtime
- 📦 **TypeScript** - Strict type checking with advanced compiler options
- 🛣️ **Path Aliases** - Clean imports using `@/*` prefix
- 🔄 **Hot Reload** - Development mode with automatic restart
- 🧪 **Testing** - Built-in test runner with Bun
- 🔗 **CJS Interop** - CommonJS and ESM module compatibility

## Prerequisites

- [Bun](https://bun.sh) installed on your system

## Installation

```bash
bun install
```

## Usage

### Development Mode

Run the server with hot reload:

```bash
bun run dev
```

### Production Mode

Run the server without hot reload:

```bash
bun run start
```

The server starts on port `3000` by default (configurable via `PORT` environment variable).

## API Endpoints

### `GET /`

Main endpoint that demonstrates various features.

**Query Parameters:**
- `a` (optional) - First number (default: 2)
- `b` (optional) - Second number (default: 40)

**Example:**
```bash
curl "http://localhost:3000/?a=5&b=10"
```

**Response:**
```json
{
  "message": "Hello, Bun + TypeScript",
  "sum": {
    "a": 5,
    "b": 10,
    "total": 15
  },
  "product": 50,
  "runtime": "bun",
  "tsPathsWorking": true
}
```

### `GET /health`

Health check endpoint.

**Example:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "ok": true,
  "uptime": 123.456
}
```

## Testing

Run the test suite:

```bash
bun test
```

## Type Checking

Verify TypeScript types:

```bash
bun run typecheck
```

## Project Structure

```
.
├── src/
│   ├── lib/           # Reusable library functions
│   │   ├── greeter.ts
│   │   └── index.ts
│   ├── routes/        # Route handlers
│   │   └── health.ts
│   ├── utils/         # Utility functions
│   │   └── sum.ts
│   └── server.ts      # Main server entry point
├── test/              # Test files
│   ├── sum.test.ts
│   └── types.test.ts
├── bunfig.toml        # Bun configuration
├── package.json
└── tsconfig.json      # TypeScript configuration
```

## Configuration

### TypeScript

The project uses strict TypeScript settings:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- Path alias: `@/*` → `src/*`

### Bun

Configuration is minimal, with Bun automatically picking up TypeScript settings from `tsconfig.json`.

## License

MIT
