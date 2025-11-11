export default function ServerEnv() {
  return (
    <section className="card">
      <h3>ServerEnv (Server Component)</h3>
      <p>Node runtime: {process.version}</p>
      <small>Access to server-only data is allowed here.</small>
    </section>
  );
}
