async function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function ServerTime() {
  await wait(1000);
  const now = new Date().toISOString();

  return (
    <section>
      <h3>ServerTime (Server Component)</h3>
      <p>Rendered on the server at: {now}</p>
      <small>Includes an artificial 300ms delay to simulate I/O.</small>
    </section>
  );
}

