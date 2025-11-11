"use client";

import { useActionState, useTransition } from "react";

type EchoAction = (state: string | null, formData: FormData) => Promise<string>;

export default function EchoForm({ action }: { action: EchoAction }) {
  const [state, formAction] = useActionState(action, null);
  const [isPending] = useTransition();

  return (
    <section>
      <h3>EchoForm (Client + Server Action)</h3>
      <form action={formAction} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          name="text"
          placeholder="Type something"
          required
          aria-label="text"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting…" : "Submit"}
        </button>
      </form>
      {state && (
        <p>
          <strong>Server response:</strong> {state}
        </p>
      )}
    </section>
  );
}

