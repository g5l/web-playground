# CSS Animation vs React Spring: Performance Comparison

This project compares the performance of browser-based animations using pure CSS and [react-spring](https://react-spring.dev/).

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Performance Test

## 📋 How it Works

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
- [CSS Performance Report (JSON)](perf-reports/css-performance-report.json)
- ![CSS Performance Screenshot](perf-screenshots/css-performance.png)

#### React Spring
- [React Spring Performance Report (JSON)](perf-reports/react-spring-performance-report.json)
- ![React Spring Performance Screenshot](perf-screenshots/react-spring-performance.png)
