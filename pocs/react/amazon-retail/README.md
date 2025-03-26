# Amazon Retail POC

A proof of concept for an Amazon Retail clone built with React, TypeScript, Redux, and Mantine UI.

## Features

- Product listing with search functionality
- Product details page
- Related products recommendations
- Responsive design
- Clean architecture with proper separation of concerns
- Comprehensive test coverage

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- Mantine UI for components
- React Router for navigation
- Jest and React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd amazon-retail
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

Run the tests:
```bash
npm test
```

Run tests with coverage report:
```bash
npm run test:coverage
```

Watch mode for development:
```bash
npm run test:watch
```

## Project Structure

```
src/
  ├── components/        # React components
  │   └── __tests__/    # Component tests
  ├── features/         # Redux slices and feature-specific code
  ├── services/         # API and external service integrations
  ├── store/           # Redux store configuration
  ├── hooks/           # Custom React hooks
  ├── types/           # TypeScript type definitions
  └── utils/           # Utility functions
```

## Code Coverage

The project aims for high test coverage with Jest and React Testing Library. Current thresholds:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## Contributing

1. Create a feature branch
2. Make your changes
3. Write or update tests
4. Submit a pull request

## License

MIT
