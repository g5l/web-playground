"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  return (
    <section className="card">
      <h3>ClientCounter (Client Component)</h3>
      <p>Count: {count}</p>
      <button className="btn" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
    </section>
  );
}
