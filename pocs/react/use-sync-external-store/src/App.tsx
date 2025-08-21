import { useSyncExternalStore } from "react";
import { counterStore } from "./store";

export default function App() {
  const { count } = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot,
  );

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24 }}>

      <hr style={{ margin: "16px 0" }} />
      
      <h1>useSyncExternalStore POC</h1>
      <p>
        <strong>Count:</strong> {count}
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => counterStore.increment()}>Increment (React)</button>
        <button onClick={() => counterStore.reset()}>Reset</button>
      </div>
      
    </main>
  );
}
