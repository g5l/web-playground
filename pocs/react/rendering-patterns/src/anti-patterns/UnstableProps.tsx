import React, { useCallback, useMemo, useRef, useState } from 'react';
import CodeCard from '@components/CodeCard';
import './UnstableProps.css';

function useRenderCount() {
  const ref = useRef(0);
  ref.current++;
  return ref.current;
}

type ChildProps = { config: { color: string; size: number }; onAction: () => void };

const MemoChild: React.FC<ChildProps> = React.memo(function MemoChild({ config, onAction }) {
  const renders = useRenderCount();
  return (
    <div className="child" style={{ borderColor: config.color }}>
      <div className="child__hdr">
        <strong>Memoized child</strong>
        <span className="render-badge">Renders: {renders}</span>
      </div>
      <div className="child__body">
        <div>config: <code>{JSON.stringify(config)}</code></div>
        <button className="btn" onClick={onAction}>Action</button>
      </div>
    </div>
  );
});

export default function UnstableProps() {
  const [tick, setTick] = useState(0);
  const [theme, setTheme] = useState<'rose' | 'ocean'>('rose');
  const forceRender = () => setTick(t => t + 1);

  const wrongConfig = { color: theme === 'rose' ? '#f43f5e' : '#2563eb', size: 12 };
  const wrongAction = () => console.log('wrong action');

  const rightConfig = useMemo(() => ({ color: theme === 'rose' ? '#f43f5e' : '#2563eb', size: 12 }), [theme]);
  const rightAction = useCallback(() => console.log('right action'), []);

  const toggleTheme = () => setTheme(t => (t === 'rose' ? 'ocean' : 'rose'));

  return (
    <div className="anti-screen">
      <CodeCard
        title="Anti-Pattern: Unstable Props"
        description="Passing new object/function references on every render breaks React.memo; children re-render unnecessarily."
      >
        <div className="demo-row">
          <div className="panel">
            <div className="panel__title">Wrong (new refs each render)</div>
            <div className="controls">
              <button className="btn btn--wrong" onClick={forceRender}>Re-render parent</button>
              <button className="btn btn--wrong" onClick={toggleTheme}>Toggle theme ({theme})</button>
            </div>
            <MemoChild config={wrongConfig} onAction={wrongAction} />
            <p className="hint">Even without meaningful changes, child re-renders because prop references are new.</p>
          </div>

          <div className="panel">
            <div className="panel__title">Correct (stable refs)</div>
            <div className="controls">
              <button className="btn btn--right" onClick={forceRender}>Re-render parent</button>
              <button className="btn btn--right" onClick={toggleTheme}>Toggle theme ({theme})</button>
            </div>
            <MemoChild config={rightConfig} onAction={rightAction} />
            <p className="hint">Child does not re-render on unrelated parent re-renders; only when config actually changes.</p>
          </div>
        </div>
      </CodeCard>

      <CodeCard title="Consequences">
        <ul className="bullets">
          <li>Memoized children re-render unnecessarily</li>
          <li>Performance degradation</li>
          <li>Wasted optimization effort</li>
        </ul>
      </CodeCard>

      <CodeCard title="Better approaches">
        <ul className="bullets">
          <li>Wrap object props in useMemo tied to real dependencies.</li>
          <li>Wrap callbacks in useCallback; avoid inline lambdas if stability matters.</li>
          <li>Define truly static objects/functions outside the component.</li>
          <li>Prefer primitive props for memo boundaries when possible.</li>
        </ul>
        <pre>
          {`
            // Bad: new references each render
            <Child config={{ color: 'blue' }} onAction={() => doSomething()} />
            
            // Good: stable references
            const config = useMemo(() => ({ color: themeColor }), [themeColor]);
            const onAction = useCallback(() => doSomething(), []);
            <Child config={config} onAction={onAction} />
          `}
        </pre>
      </CodeCard>
    </div>
  );
}

