// This page demonstrates Incremental Static Regeneration (ISR)
// It will be statically generated once at build time, and then
// revalidated on-demand every 30 seconds when requested.
export const revalidate = 30;

export default function ISRPage() {
  const now = new Date();
  return (
    <section>
      <h1>ISR Example</h1>
      <p>
        This page uses <code>export const revalidate = 30;</code> to opt into
        Incremental Static Regeneration.
      </p>
      <p>
        Build time or last regeneration timestamp:
        <br />
        <strong>{now.toISOString()}</strong>
      </p>
      <p>
        Refresh this page. If it has been at least 30 seconds since the last
        regeneration, a new static HTML will be produced and cached.
      </p>
    </section>
  );
}

