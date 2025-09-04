import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/fade-in', label: 'Fade In (basic)' },
  { to: '/expand-collapse', label: 'Expand / Collapse' },
  { to: '/list-transition', label: 'useTransition (list)' },
  { to: '/third-party', label: 'Animate 3rd-party' },
  { to: '/trail-stagger', label: 'useTrail (stagger)' },
  { to: '/springs-cards', label: 'useSprings (cards)' },
  { to: '/async-sequence', label: 'Async sequence' },
  { to: '/async-loop', label: 'Async loop' },
  { to: '/svg-path', label: 'SVG path drawing' },
  { to: '/interpolate-color', label: 'Interpolate color' }
];

export default function Nav() {
  return (
    <aside className="nav">
      <h1>react-spring examples</h1>
      <ul>
        {links.map(l => (
          <li key={l.to}>
            <NavLink to={l.to} className={({isActive}) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
