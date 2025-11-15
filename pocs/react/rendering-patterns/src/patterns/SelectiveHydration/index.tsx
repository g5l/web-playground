import React from 'react';
import CodeCard from '@components/CodeCard';

export default function SelectiveHydration() {
  return (
    <div className="pattern-screen">
      <CodeCard
        title="Selective Hydration (SSR Demo)"
        description="Problem: a slow part of the page can block hydration. Solution: React 18 can hydrate the interacted part first (via Suspense boundaries and event replay)."
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <strong>How to run the SSR demo</strong>
            <ol style={{ margin: '8px 0 0 18px' }}>
              <li>In a second terminal, run: <code>npm run sh:server</code></li>
              <li>Open: <a href="http://localhost:4001" target="_blank" rel="noreferrer">http://localhost:4001</a></li>
              <li>Immediately click the "Chat" button. Notice it works even while the heavy chart is still hydrating.</li>
            </ol>
          </div>
          <p style={{ margin: 0 }}>
            The page renders on the server. The heavy chart is wrapped in a Suspense boundary that delays its hydration on the client, but if you interact with another island (the Chat button), React prioritizes hydrating that part so the event is handled promptly.
          </p>
        </div>
      </CodeCard>

      <CodeCard title="What’s the problem?">
        <ul style={{ margin: 0 }}>
          <li>Without boundaries, a slow subtree can block hydration of the whole root.</li>
          <li>Events during hydration are queued; without selective hydration they may feel unresponsive.</li>
          <li>This is common when expensive widgets are high in the tree.</li>
        </ul>
      </CodeCard>

      <CodeCard title="How React resolves it">
        <ul style={{ margin: 0 }}>
          <li>React 18 replays events and hydrates the closest boundary first.</li>
          <li>Wrap slow parts in <code>{`<Suspense>`}</code> so other parts can hydrate sooner.</li>
          <li>Use streaming SSR or islands so independent regions hydrate independently.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Example snippets">
        <pre>{`// Server markup includes both sections. On the client, delay hydrating the heavy part.
function LazyHydrationGate({ delay, children }) {
  if (typeof window === 'undefined') return children;
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setReady(true), delay); return () => clearTimeout(t); }, [delay]);
  if (!ready) throw new Promise(r => setTimeout(r, delay)); // Suspense pause during hydration
  return children;
}

function App() {
  return (
    <>
      <ChatButton /> {/* Hydrates immediately and handles clicks */}
      <React.Suspense fallback={<div>Chart hydrating…</div>}>
        <LazyHydrationGate delay={3000}>
          <HeavyChart />
        </LazyHydrationGate>
      </React.Suspense>
    </>
  );
}`}</pre>
      </CodeCard>
    </div>
  );
}

