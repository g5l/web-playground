## What is requestIdleCallback?
It’s a function provided by the browser:

```
window.requestIdleCallback(callback: (IdleDeadline) => void, options?: { timeout: number }): number;
```

### Key Concepts:
* **Main Use Case**: Defer non-essential work.
* **IdleDeadline**: Passed to the callback. Contains:
  * `timeRemaining()`: Time left in the current idle period (in ms).
  * `didTimeout`: Boolean indicating whether the callback was executed after the timeout.

## When to Use
Good for:
* Background tasks
* Lazy-loading images or modules 
* Sending analytics data 
* Prefetching resources

Avoid for:
* Critical UI updates
* Time-sensitive logic

### Browser Support
**Supported**: Chrome, Edge

**Not Supported**: Firefox, Safari (you’ll need a polyfill)