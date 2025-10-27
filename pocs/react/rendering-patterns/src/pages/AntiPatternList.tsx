import React from 'react';
import { Link } from 'react-router-dom';
import { antiPatterns } from '@data/antiPatterns';
import './AntiPatternList.css';

export default function AntiPatternList() {
  return (
    <div className="list-page-anti">
      <h2>Pick an Anti-Pattern</h2>
      <ul className="list-grid-anti">
        {antiPatterns.map(p => (
          <li key={p.slug} className="list-item-anti">
            <Link to={`/anti-patterns/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
