# State Management POC

This project demonstrates different state management approaches in React using Redux, Zustand, and Jotai.

## Project Structure

- `redux-counter`: A counter application using Redux for state management
- `zustand-counter`: A counter application using Zustand for state management
- `jotai-counter`: A counter application using Jotai for state management

## Getting Started

1. Install dependencies:
```bash
npm run install-all
```

2. Start all applications:
```bash
npm start
```

This will start:
- Redux Counter on http://localhost:3000
- Zustand Counter on http://localhost:3001
- Jotai Counter on http://localhost:3002

## Available Scripts

- `npm start`: Starts all applications concurrently
- `npm run install-all`: Installs dependencies for all projects

# State Management in React: Redux vs Zustand vs Jotai

This repository explores three popular state management libraries for React: **Redux**, **Zustand**, and **Jotai**. Each has its strengths and ideal use cases depending on the complexity and scale of your application.

---

## Redux

Redux is a predictable state container for JavaScript apps. While it's commonly used with React, it can work with any JavaScript framework.

### 🔑 Core Concepts

- **Store**: A single source of truth for the app state.
- **Actions**: Plain objects that describe what happened.
- **Reducers**: Pure functions that specify how the state changes in response to actions.
- **Middleware**: Enhances Redux with custom behavior, like handling asynchronous actions (e.g., `redux-thunk`).

### ✅ Pros

- Large ecosystem (DevTools, middleware, extensions).
- Predictable and testable state logic.
- Ideal for large-scale and complex applications.

### ❌ Cons

- Requires boilerplate code.
- Slight learning curve for newcomers.

---

## Zustand

Zustand is a minimalistic, fast, and scalable state-management library tailored for React.

### 🔑 Core Concepts

- Uses simple functions to create stores.
- No need for context providers.
- No actions or reducers required (but can be mimicked if needed).

### ✅ Pros

- Extremely easy to set up and use.
- No boilerplate.
- Excellent for small to medium apps or managing isolated logic.

### ❌ Cons

- Less structure, which can be problematic in larger applications.
- Smaller ecosystem compared to Redux.

---

## Jotai

Jotai is a primitive and flexible state management library for React, based on atomic state units (atoms).

### 🔑 Core Concepts

- **Atoms**: Smallest units of state, can be shared and composed.
- **Hooks**: Use atoms directly in components with hooks.

### ✅ Pros

- Minimal and flexible.
- No boilerplate.
- Fine-grained reactivity.

### ❌ Cons

- Less structure for large apps.
- Smaller ecosystem compared to Redux.

---

## 📌 Summary

| Feature         | Redux                                | Zustand                               | Jotai                                 |
|----------------|--------------------------------------|----------------------------------------|---------------------------------------|
| Boilerplate     | High                                 | Low                                    | Low                                   |
| Ecosystem       | Large                                | Smaller                                | Smaller                               |
