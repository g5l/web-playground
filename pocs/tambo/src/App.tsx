import React from "react";
import { useTambo, useTamboThreadInput } from "@tambo-ai/react";

export default function App() {
  const { messages } = useTambo();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  return (
    <div style={{ padding: 40 }}>
      <h1>Tambo Demo</h1>

      <div>
        {messages.map((m) => (
          <div key={m.id}>
            {Array.isArray(m.content)
              ? m.content.map((p, i) =>
                p.type === "text" ? <p key={i}>{p.text}</p> : null
              )
              : null}

            {m.renderedComponent}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Say something..."
        />

        <button disabled={isPending}>Send</button>
      </form>
    </div>
  );
}
