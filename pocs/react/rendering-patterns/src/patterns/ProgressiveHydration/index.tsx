import React from 'react';
import CodeCard from '@components/CodeCard';

export default function ProgressiveHydration() {
  return (
    <div className="pattern-screen">
      <CodeCard
        title="Progressive Hydration (SSR Demo)"
        description="Server renders HTML immediately; islands hydrate progressively so interactivity unlocks in stages."
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <strong>How to run the SSR demo</strong>
            <ol style={{ margin: '8px 0 0 18px' }}>
              <li>In a second terminal, run: <code>npm run ph:server</code></li>
              <li>Open: <a href="http://localhost:4000" target="_blank" rel="noreferrer">http://localhost:4000</a></li>
              <li>
                Viewport mode: <a href="http://localhost:4000?mode=viewport" target="_blank" rel="noreferrer">http://localhost:4000?mode=viewport</a>
              </li>
            </ol>
          </div>
          <p style={{ margin: 0 }}>
            Tip: Add <code>?mode=viewport</code> to hydrate widgets as they scroll into view.
          </p>
          <p style={{ margin: 0 }}>
            The page shows three widgets: Fast, Medium, and Slow. Each is server-rendered instantly but becomes interactive later, demonstrating progressive hydration visually (badges flip from "Server-rendered" to "Hydrated").
          </p>
        </div>
      </CodeCard>

      <CodeCard title="What’s happening?">
        <ul style={{ margin: 0 }}>
          <li>Node server streams SSR HTML using React 18.</li>
          <li>Each island hydrates independently in order or on visibility.</li>
          <li>Before hydration, buttons are disabled; after, they enable and count.</li>
        </ul>
      </CodeCard>
    </div>
  );
}
