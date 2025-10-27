import React from 'react';
import './CodeCard.css';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function CodeCard({ title, description, children }: Props) {
  return (
    <section className="code-card">
      <header className="code-card__header">
        <h2>{title}</h2>
        {description && <p className="code-card__desc">{description}</p>}
      </header>
      <div className="code-card__body">{children}</div>
    </section>
  );
}
