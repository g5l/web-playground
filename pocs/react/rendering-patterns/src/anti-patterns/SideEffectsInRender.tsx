import React, { useEffect, useState } from 'react';
import CodeCard from '@components/CodeCard';
import './SideEffectsInRender.css';

const LS_WRONG = 'side-effects-render-wrong';
const LS_RIGHT = 'side-effects-render-right';

function readLog(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function appendLog(key: string, message: string) {
  const next = [...readLog(key), message];
  localStorage.setItem(key, JSON.stringify(next));
}

export default function SideEffectsInRender() {
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongLog, setWrongLog] = useState<string[]>([]);

  
  const [rightCount, setRightCount] = useState(0);
  const [rightLog, setRightLog] = useState<string[]>([]);

  // Anti-pattern: side effect inside render path
  appendLog(LS_WRONG, `render: count=${wrongCount} @ ${new Date().toLocaleTimeString()}`);

  // Keep UI in sync with current logs 
  useEffect(() => setWrongLog(readLog(LS_WRONG)), []);
  useEffect(() => setWrongLog(readLog(LS_WRONG)), [wrongCount]);

  // Correct usage
  useEffect(() => {
    appendLog(LS_RIGHT, `effect: count=${rightCount} @ ${new Date().toLocaleTimeString()}`);
    setRightLog(readLog(LS_RIGHT));
  }, [rightCount]);
  useEffect(() => setRightLog(readLog(LS_RIGHT)), []);

  const clearAll = () => {
    localStorage.removeItem(LS_WRONG);
    localStorage.removeItem(LS_RIGHT);
    setWrongLog([]);
    setRightLog([]);
    setWrongCount(0);
    setRightCount(0);
  };

  return (
    <div className="anti-screen">
      <CodeCard
        title="Anti-Pattern: Side Effects in Render"
        description="Triggering effects (API calls, localStorage writes) inside render breaks React's predictable model, use useEffect instead."
      >
        <div className="demo-row">
          <div className="panel">
            <div className="panel__title">Wrong (side effects in render)</div>
            <div className="controls">
              <button className="btn btn--wrong" onClick={() => setWrongCount(c => c + 1)}>
                Re-render (count: {wrongCount})
              </button>
            </div>
            <div className="log">
              <div className="log__title">localStorage log</div>
              <ul>
                {wrongLog.slice().reverse().map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
              <p className="hint">Note: This logs on every render because the write happens in render.</p>
            </div>
          </div>

          <div className="panel">
            <div className="panel__title">Correct (use useEffect)</div>
            <div className="controls">
              <button className="btn btn--right" onClick={() => setRightCount(c => c + 1)}>
                Update (count: {rightCount})
              </button>
            </div>
            <div className="log">
              <div className="log__title">localStorage log</div>
              <ul>
                {rightLog.slice().reverse().map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
              <p className="hint">Side effects run in useEffect tied to dependencies, not during render. In development Strict Mode, effects run twice on mount.</p>
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={clearAll}>Clear logs</button>
        </div>
      </CodeCard>

      <CodeCard title="Why it's a problem">
        <p>
          React may render components multiple times before committing updates (e.g., in Strict Mode and during
          concurrent rendering). If you perform side effects during render, they can run repeatedly and out of order,
          leading to duplicate network requests, corrupted localStorage writes, and hard-to-reason-about behavior.
        </p>
      </CodeCard>

      <CodeCard title="Correct Usage">
        <pre>
          {`
            // Wrong: side effect in render
            function Profile({ id }) {
              // DON'T do this, runs every render, may duplicate in Strict Mode
              localStorage.setItem('lastProfile', id);
              return <div>Profile {id}</div>;
            }
            
            // Right: move effects to useEffect
            function Profile({ id }) {
              useEffect(() => {
                localStorage.setItem('lastProfile', id);
              }, [id]);
              return <div>Profile {id}</div>;
            }
            
            // Fetching data, wrap in useEffect or a data layer
            function UserList() {
              const [users, setUsers] = useState<User[]>([]);
              useEffect(() => {
                let cancelled = false;
                fetch('/api/users')
                  .then(r => r.json())
                  .then(d => { if (!cancelled) setUsers(d); });
                return () => { cancelled = true; };
              }, []);
              return <List users={users}/>;
            }
          `}
        </pre>
      </CodeCard>
    </div>
  );
}
