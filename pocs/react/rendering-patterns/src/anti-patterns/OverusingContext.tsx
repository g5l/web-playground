import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import CodeCard from '@components/CodeCard';
import './OverusingContext.css';

function useRenderCount(label?: string) {
  const ref = useRef(0);
  ref.current++;
  return ref.current;
}

function RenderBadge({ label }: { label: string }) {
  const renders = useRenderCount(label);
  return <span className="render-badge">Renders: {renders}</span>;
}

type AppCtx = { theme: 'rose' | 'ocean'; count: number; inc: () => void; toggleTheme: () => void };
const AppContext = createContext<AppCtx | null>(null);

function useAppCtx() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppCtx must be used within AppContext.Provider');
  return ctx;
}

function WrongThemeBox() {
  const { theme } = useAppCtx();
  return (
    <div className={`box theme-${theme}`}>
      <div className="box__hdr">
        <strong>Theme consumer</strong>
        <RenderBadge label="wrong-theme" />
      </div>
      <p>Unrelated to count, but still re-renders with every count change.</p>
    </div>
  );
}

function WrongCounterBox() {
  const { count, inc } = useAppCtx();
  return (
    <div className="box">
      <div className="box__hdr">
        <strong>Counter consumer</strong>
        <RenderBadge label="wrong-counter" />
      </div>
      <button className="btn" onClick={inc}>Increment ({count})</button>
    </div>
  );
}

function WrongPanel() {
  const [theme, setTheme] = useState<'rose' | 'ocean'>('rose');
  const [count, setCount] = useState(0);
  const inc = () => setCount(c => c + 1);
  const toggleTheme = () => setTheme(t => (t === 'rose' ? 'ocean' : 'rose'));

  const value: AppCtx = { theme, count, inc, toggleTheme };

  return (
    <div className="panel">
      <div className="panel__title">Wrong: Single global context</div>
      <div className="controls">
        <button className="btn btn--wrong" onClick={inc}>Increment</button>
        <button className="btn btn--wrong" onClick={toggleTheme}>Toggle theme</button>
      </div>
      <AppContext.Provider value={value}>
        <div className="cols">
          <WrongCounterBox />
          <WrongThemeBox />
        </div>
      </AppContext.Provider>
      <p className="hint">Count updates cause <em>both</em> boxes to re-render because the provider value changes.</p>
    </div>
  );
}

const ThemeContext = createContext<{ theme: 'rose' | 'ocean'; toggleTheme: () => void } | null>(null);
const CountContext = createContext<{ count: number; inc: () => void } | null>(null);

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeContext.Provider');
  return ctx;
}

function useCount() {
  const ctx = useContext(CountContext);
  if (!ctx) throw new Error('useCount must be used within CountContext.Provider');
  return ctx;
}

function RightThemeBox() {
  const { theme } = useTheme();
  return (
    <div className={`box theme-${theme}`}>
      <div className="box__hdr">
        <strong>Theme consumer</strong>
        <RenderBadge label="right-theme" />
      </div>
      <p>Does not re-render when only count changes.</p>
    </div>
  );
}

function RightCounterBox() {
  const { count, inc } = useCount();
  return (
    <div className="box">
      <div className="box__hdr">
        <strong>Counter consumer</strong>
        <RenderBadge label="right-counter" />
      </div>
      <button className="btn" onClick={inc}>Increment ({count})</button>
    </div>
  );
}

function RightPanel() {
  const [theme, setTheme] = useState<'rose' | 'ocean'>('rose');
  const [count, setCount] = useState(0);

  const inc = useCallback(() => setCount(c => c + 1), []);
  const toggleTheme = useCallback(() => setTheme(t => (t === 'rose' ? 'ocean' : 'rose')), []);

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const countValue = useMemo(() => ({ count, inc }), [count, inc]);

  return (
    <div className="panel">
      <div className="panel__title">Correct: Split contexts</div>
      <div className="controls">
        <button className="btn btn--right" onClick={inc}>Increment</button>
        <button className="btn btn--right" onClick={toggleTheme}>Toggle theme</button>
      </div>
      <ThemeContext.Provider value={themeValue}>
        <CountContext.Provider value={countValue}>
          <div className="cols">
            <RightCounterBox />
            <RightThemeBox />
          </div>
        </CountContext.Provider>
      </ThemeContext.Provider>
      <p className="hint">Count updates re-render only the counter box; theme box stays stable.</p>
    </div>
  );
}

export default function OverusingContext() {
  return (
    <div className="anti-screen">
      <CodeCard
        title="Anti-Pattern: Overusing Context"
        description="Putting frequently changing, unrelated data into a single context forces broad re-renders. Split contexts or colocate state to limit updates."
      >
        <div className="demo-row">
          <WrongPanel />
          <RightPanel />
        </div>
      </CodeCard>

      <CodeCard title="Why it's a problem">
        <ul className="bullets">
          <li><strong>Global invalidations</strong>: Any change to the provider value re-renders all consumers.</li>
          <li><strong>Hidden coupling</strong>: Unrelated components quietly depend on the same context object.</li>
          <li><strong>Performance cliffs</strong>: Large trees re-render on every keystroke or tick.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Better approaches">
        <ul className="bullets">
          <li>Split contexts by concern (theme vs. counter).</li>
          <li>Memoize provider values; avoid recreating objects/functions needlessly.</li>
          <li>Co-locate rapidly changing state closer to where it's used.</li>
          <li>For large shared state, prefer selector-based stores or <code>useSyncExternalStore</code>.</li>
        </ul>
      </CodeCard>
    </div>
  );
}
