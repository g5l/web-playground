import React, { useState } from 'react';
import BasicGrid from './examples/BasicGrid.jsx';
import ResponsiveGrid from './examples/ResponsiveGrid.jsx';

export default function App() {
  const [view, setView] = useState('basic');

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">react-grid-layout — Examples</h1>
      </header>

      <div className="tabs">
        <button
          className={"tab" + (view === 'basic' ? ' active' : '')}
          onClick={() => setView('basic')}
        >
          Basic
        </button>
        <button
          className={"tab" + (view === 'responsive' ? ' active' : '')}
          onClick={() => setView('responsive')}
        >
          Responsive
        </button>
      </div>

      {view === 'basic' ? <BasicGrid /> : <ResponsiveGrid />}
    </div>
  );
}

