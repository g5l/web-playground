# Own React

A React clone built with TypeScript for learning purposes.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Build the project and start development server
npm run dev
```

This will:
1. Build the TypeScript files with esbuild in watch mode
2. Start a development server at http://localhost:3000

### Other Commands

```bash
# Build the project once
npm run build

# Build for production (minified)
npm run build:prod

# Run tests
npm test

# Run TypeScript type checking
npm run type-check
```

## Project Structure

- `src/` - Source files
  - `index.ts` - Entry point
  - `vibe.ts` - Main React-like implementation
  - `createElement.ts` - JSX element creation
  - `vdom.ts` - Virtual DOM implementation
  - `render.ts` - Rendering logic
  - `types.ts` - TypeScript type definitions
- `dist/` - Compiled output
- `tests/` - Test files

## Troubleshooting

If you encounter issues running the project:

1. Make sure all dependencies are installed: `npm install`
2. Check if the build was successful: `npm run build`
3. Verify that the `dist/index.js` file exists
4. Open browser console for any JavaScript errors
5. Try clearing browser cache or using incognito mode

## License

MIT
