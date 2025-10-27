import React, { useEffect, useState } from 'react';
import CodeCard from '@components/CodeCard';
import './ConditionalRendering.css';

export default function ConditionalRendering() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      // simulate success
      setItems(['Alpha', 'Beta', 'Gamma']);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pattern-screen">
      <CodeCard
        title="Conditional Rendering"
        description="Toggling UI based on state (loading/error/empty/success)."
      >
        <div className="demo-box">
          {loading && <div className="badge">Loading…</div>}
          {!loading && error && <div className="badge error">Error: {error}</div>}
          {!loading && !error && items && items.length === 0 && <div className="badge">No items</div>}
          {!loading && !error && items && items.length > 0 && (
            <ul className="pill-list">
              {items.map(it => <li key={it}>{it}</li>)}
            </ul>
          )}
        </div>
      </CodeCard>

      <CodeCard title="Example Code">
        <pre>{`{isLoading ? <Spinner/> : <List items={data}/>}`}</pre>
      </CodeCard>
    </div>
  );
}
