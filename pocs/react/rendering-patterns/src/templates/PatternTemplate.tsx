import React from 'react';
import './PatternTemplate.css';
import Sidebar from './Sidebar';

type Props = { children: React.ReactNode };

export default function PatternTemplate({ children }: Props) {
  return (
    <div className="layout layout--pattern">
      <Sidebar variant="pattern" />
      <main className="content">
        <header className="content__header">
          <h1>React Rendering Patterns</h1>
          <a className="swap-link" href="/anti-patterns">See Anti-Patterns →</a>
        </header>
        <div className="content__body">{children}</div>
      </main>
    </div>
  );
}
