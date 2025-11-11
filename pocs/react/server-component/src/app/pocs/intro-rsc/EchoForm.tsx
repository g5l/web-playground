"use client";

import { useActionState, useTransition } from "react";

type EchoAction = (state: string | null, formData: FormData) => Promise<string>;

export default function EchoForm({ action }: { action: EchoAction }) {
  const [state, formAction] = useActionState(action, null);
  const [isPending] = useTransition();

  return (
    <section className="card">
      <h3>EchoForm (Client + Server Action)</h3>
      <form action={formAction}>
        <input
          type="text"
          name="text"
          placeholder="Type something"
          required
          aria-label="text"
        />
        <button className="btn" type="submit" disabled={isPending}>
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
