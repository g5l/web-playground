import { useActionState } from "react";
import { loginAction } from "./actions";

export default function App() {
  const [message, formAction, pending] = useActionState(loginAction, null);

  return (
    <main style={{ padding: 24, maxWidth: 400 }}>
      <h1>useActionState POC</h1>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          style={{ padding: 8 }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={{ padding: 8 }}
          required
        />
        <button type="submit" disabled={pending} style={{ padding: 8 }}>
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 16, fontWeight: "bold" }}>{message}</p>
      )}
    </main>
  );
}
