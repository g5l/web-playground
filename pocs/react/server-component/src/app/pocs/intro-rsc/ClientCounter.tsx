"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  return (
    <section>
      <h3>ClientCounter (Client Component)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </section>
  );
}

