import {patterns} from '@data/patterns';
import React from 'react';
import {Link} from 'react-router-dom';
import './PatternList.css';

export default function PatternList() {
  return (
    <div className="list-page">
      <h2>Pick a Pattern</h2>
      <ul className="list-grid">
        {patterns.map(p => (
          <li key={p.slug} className="list-item">
            <Link to={`/patterns/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
