import React, { useRef } from "react";
import CustomInput, {type CustomInputHandle } from "./CustomInput";

export default function App() {
  const inputRef = useRef<CustomInputHandle>(null);

  return (
    <main style={{ padding: 24 }}>
      <h1>useImperativeHandle POC</h1>

      <CustomInput ref={inputRef} placeholder="Your name" />

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => inputRef.current?.focus()}>Focus</button>
        <button onClick={() => inputRef.current?.clear()}>Clear</button>
      </div>
    </main>
  );
}
