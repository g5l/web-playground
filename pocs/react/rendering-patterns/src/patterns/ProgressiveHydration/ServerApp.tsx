import React, { useEffect, useState } from 'react';
import './ProgressiveHydration.css';

export function HydrationBadge() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <span className={hydrated ? 'badge hydrated' : 'badge server'}>
      {hydrated ? 'Hydrated' : 'Server-rendered'}
    </span>
  );
}

export function Widget({ title, color }: { title: string; color: string }) {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="widget" style={{ borderColor: color }}>
      <div className="widget-hdr" style={{ color }}>
        <strong>{title}</strong>
        <HydrationBadge />
      </div>
      <div className="widget-body">
        <p>
          This content is server-rendered immediately. Interactivity unlocks when the island hydrates.
        </p>
        <button
          className="btn"
          disabled={!ready}
          onClick={() => setCount(c => c + 1)}
          title={ready ? 'Interactive' : 'Hydrating…'}
        >
          {ready ? 'Click me' : 'Hydrating…'} ({count})
        </button>
      </div>
    </div>
  );
}

export function Page() {
  return (
    <div className="ph-page">
      <header className="ph-header">
        <h1>Progressive Hydration</h1>
        <p>SSR first. Hydrate islands over time or when visible.</p>
      </header>

      <main className="ph-grid">
        <section id="island-fast" data-island>
          <Widget title="Fast widget" color="#16a34a" />
        </section>

        <section id="island-medium" data-island>
          <Widget title="Medium widget" color="#2563eb" />
        </section>

        <section id="island-slow" data-island>
          <Widget title="Slow widget" color="#ea580c" />
        </section>
      </main>

      <footer className="ph-footer">
        <small>
          Try query <code>?mode=viewport</code> to hydrate on visibility. Without it, hydration staggers: fast → medium → slow.
        </small>
      </footer>
    </div>
  );
}

export function render() {
  return <Page />;
}
