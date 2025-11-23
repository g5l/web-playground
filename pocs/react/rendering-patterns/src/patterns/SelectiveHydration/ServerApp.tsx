import React, { Suspense, useEffect, useState } from 'react';
import './SelectiveHydration.css';

function HydrationBadge() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <span className={hydrated ? 'badge hydrated' : 'badge server'}>
      {hydrated ? 'Hydrated' : 'Server-rendered'}
    </span>
  );
}

function ChatButton() {
  const [count, setCount] = useState(0);
  return (
    <div className="widget" style={{ borderColor: '#22c55e' }}>
      <div className="widget-hdr" style={{ color: '#22c55e' }}>
        <strong>Chat</strong>
        <HydrationBadge />
      </div>
      <div className="widget-body">
        <p>Click quickly after load, with selective hydration this is responsive even while the chart hydrates.</p>
        <button className="btn" onClick={() => setCount(c => c + 1)}>Send ping ({count})</button>
      </div>
    </div>
  );
}

// Suspends client hydration for a while so other parts can hydrate first.
function LazyHydrationGate({ delay, children }: { delay: number; children: React.ReactNode }) {
  if (typeof window === 'undefined') return <>{children}</>;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!ready) {
    // During client hydration, throw a thenable to pause this subtree
    throw new Promise<void>(resolve => setTimeout(resolve, delay));
  }
  return <>{children}</>;
}

function HeavyChart() {
  return (
    <div className="widget" style={{ borderColor: '#f59e0b' }}>
      <div className="widget-hdr" style={{ color: '#f59e0b' }}>
        <strong>Heavy Chart</strong>
        <HydrationBadge />
      </div>
      <div className="widget-body">
        <p>Server-rendered markup appears immediately. Client hydration is intentionally delayed.</p>
        <div className="chart-skel" aria-hidden>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <small className="muted">Hydration delayed via Suspense gate.</small>
      </div>
    </div>
  );
}

export function App() {
  return (
    <div className="sh-page">
      <header className="sh-header">
        <h1>Selective Hydration</h1>
        <p>Hydrate interacted parts first while deferring slow subtrees.</p>
      </header>
      <main className="sh-grid">
        <section>
          <ChatButton />
        </section>
        <section>
          <Suspense fallback={<div className="fallback">Chart hydrating…</div>}>
            <LazyHydrationGate delay={3000}>
              <HeavyChart />
            </LazyHydrationGate>
          </Suspense>
        </section>
      </main>
    </div>
  );
}

export default App;
