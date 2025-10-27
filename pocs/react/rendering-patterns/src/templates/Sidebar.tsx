import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { patterns } from '@data/patterns';
import { antiPatterns } from '@data/antiPatterns';
import './Sidebar.css';

export default function Sidebar({ variant }: { variant: 'pattern' | 'anti' }) {
  const loc = useLocation();
  const isAnti = variant === 'anti';

  const list = isAnti ? antiPatterns : patterns;
  const base = isAnti ? '/anti-patterns' : '/patterns';

  return (
    <aside className={`sidebar ${isAnti ? 'sidebar--anti' : 'sidebar--pattern'}`}>
      <div className="sidebar__brand">
        <div className="logo" aria-hidden>⚛︎</div>
        <div className="brand-text">
          <strong>{isAnti ? 'Anti-Patterns' : 'Patterns'}</strong>
          <span className="muted">{isAnti ? 'avoid these' : 'use these'}</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavLink className="nav-top" to={isAnti ? '/patterns' : '/anti-patterns'}>
          {isAnti ? '← Patterns' : 'Anti-Patterns →'}
        </NavLink>
        <div className="nav-list">
          {list.map(item => (
            <NavLink
              key={item.slug}
              to={`${base}/${item.slug}`}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar__footer">
        <div className="path">{loc.pathname}</div>
      </div>
    </aside>
  );
}
