# React Fiber Tree Demo

A simple demonstration of React's Fiber tree structure. This project visualizes a basic fiber tree in the browser console.

## Project Structure

- `fiber-tree-basic.js` - Contains the code that creates a simple fiber tree structure
- `type.ts` - Contains TypeScript type definitions for the fiber tree
- `index.html` - The HTML entry point for the application
- `index.js` - The JavaScript entry point that imports and runs the fiber tree code

## Setup and Running

Follow these steps to run the application:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

   This will automatically open the application in your default browser.

3. View the output:
   - Open the browser console (F12 or right-click > Inspect > Console)
   - You should see the fiber tree structure printed in the console

## Building for Production

To build the application for production:

```
npm run build
```

This will create a `dist` directory with the bundled application.

## Understanding the Code

The `fiber-tree-basic.js` file demonstrates a simplified version of React's Fiber architecture:

- It creates a fiber node structure with `App`, `Header`, `Main`, and `Footer` components
- It links these nodes together in a tree structure
- It includes a traversal function to print the tree structure

This is a basic educational example to help understand how React's reconciliation works under the hood.