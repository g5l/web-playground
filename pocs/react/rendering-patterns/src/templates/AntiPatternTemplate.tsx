import React from 'react';
import './AntiPatternTemplate.css';
import Sidebar from './Sidebar';

type Props = { children: React.ReactNode };

export default function AntiPatternTemplate({ children }: Props) {
  return (
    <div className="layout layout--anti">
      <Sidebar variant="anti" />
      <main className="content">
        <header className="content__header">
          <h1>React Rendering Anti-Patterns</h1>
          <a className="swap-link" href="/patterns">← Back to Patterns</a>
        </header>
        <div className="content__body">{children}</div>
      </main>
    </div>
  );
}
