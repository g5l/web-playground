# Own React

A React-like library built with TypeScript for learning and experimentation.

## Features
- JSX element creation
- Fiber-based reconciliation
- Custom hooks (useState)
- Modular, senior-level architecture

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Usage Example
See `src/demo/index.js` for a usage example:

```jsx
import Vibe from '../vibe';

/** @jsx Vibe.createElement */
function Counter() {
  const [state, setState] = Vibe.useState(1);
  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  );
}
const element = <Counter />;
const container = document.getElementById('root');
Vibe.render(element, container);
```

## Project Structure
- `src/`
  - `api/` - Public API (render, useState, createElement)
  - `core/` - Fiber reconciler, DOM operations, hooks
  - `jsx/` - JSX element creation
  - `types/` - TypeScript type definitions
  - `demo/` - Example/demo entry point
  - `vibe.ts` - Main export, aggregates public API
- `tests/` - Test files

## License
MIT
