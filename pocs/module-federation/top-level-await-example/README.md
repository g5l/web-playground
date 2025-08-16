# Webpack Top-Level Await Example

This is a Proof of Concept (POC) demonstrating the use of the `topLevelAwait` feature in webpack configuration.

## What is Top-Level Await?

Top-level await enables developers to use the `await` keyword outside of async functions, at the top level of a module. This is particularly useful for:

- Initializing modules with asynchronously fetched data
- Conditional importing of dependencies
- Resource initialization
- Error handling

## Project Structure

- `webpack.config.js` - Contains the webpack configuration with `experiments.topLevelAwait: true`
- `src/index.html` - HTML template
- `src/index.js` - Main entry point that imports the data module
- `src/data.js` - Module that uses top-level await to fetch data before export

## Key Configuration

The key part of this POC is the webpack configuration that enables top-level await:

```javascript
// webpack.config.js
module.exports = {
  experiments: {
    topLevelAwait: true
  },
  // ... other config
};
```

## Dependencies

To run this example, you'll need to install the following dependencies:

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env
```

## Running the Example

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:9000`

## What to Observe

When you run this example, notice that:

1. The data module uses top-level await to fetch data before exporting it
2. The main module imports this data and can use it immediately without additional awaiting
3. This is only possible because webpack's `topLevelAwait` experiment is enabled

Without the `topLevelAwait` experiment enabled, this code would cause a syntax error during the build process.