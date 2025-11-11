import ClientCounter from "./ClientCounter";
import ServerEnv from "./ServerEnv";
import ServerTime from "./ServerTime";
import EchoForm from "./EchoForm";

export default async function IntroRSCPage() {
  async function echoAction(_prev: string | null, formData: FormData) {
    "use server";
    const text = formData.get("text");
    const normalized = typeof text === "string" ? text.trim() : "";
    return normalized ? `Server says: ${normalized.toUpperCase()}` : "";
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
      <div className="card">
        <h1>Intro: React Server Components</h1>
        <p>
          This page demonstrates server components, client component islands, and
          server actions in a minimal setup.
        </p>
      </div>

      <ServerTime />
      <ServerEnv />
      <ClientCounter />
      <EchoForm action={echoAction} />
    </div>
  );
}
