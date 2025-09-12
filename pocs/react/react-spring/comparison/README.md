# CSS Animation vs React Spring: Performance Comparison

This project compares the performance of browser-based animations using pure CSS and [react-spring](https://react-spring.dev/).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Performance Test

## How it Works

- **CSS Animation:** Uses a simple `transform: translateX` with a CSS transition.
- **react-spring:** Uses the `useSpring` hook to animate the same movement.
- Each performance test page renders 200 of the selected component to stress test the browser.

---
### Example Results

| Animation Type | CPU (%) | Memory (MB) |
|---------------|---------|-------------|
| CSS           |   10    | 20          |
| react-spring  |   22    | 35          |

**On my machine, interacting with the CSS animation brings CPU usage to ~10%, while interacting with react-spring brings CPU usage to ~22%.**


## Performance Reports

#### CSS Animation
<img width="1507" height="940" alt="Screenshot 2025-09-11 at 20 55 32" src="https://github.com/user-attachments/assets/dc03d160-9df4-4250-b5d9-8625e66bed4f" />


#### React Spring
<img width="1509" height="938" alt="Screenshot 2025-09-11 at 20 54 25" src="https://github.com/user-attachments/assets/2901653c-c43d-4989-a736-33bc6dc8eb7c" />

