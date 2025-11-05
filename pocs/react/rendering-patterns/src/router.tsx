import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import PatternList from '@pages/PatternList';
import AntiPatternList from '@pages/AntiPatternList';
import { patterns } from '@data/patterns';
import { antiPatterns } from '@data/antiPatterns';

const lazyMap: Record<string, React.LazyExoticComponent<React.FC>> = {
  ConditionalRendering: React.lazy(() => import('@patterns/ConditionalRendering')),
  ListRendering: React.lazy(() => import('@patterns/ListRendering')),
  ProgressiveHydration: React.lazy(() => import('@patterns/ProgressiveHydration')),
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/patterns" replace /> },
      { path: 'patterns', element: <PatternList /> },
      { path: 'anti-patterns', element: <AntiPatternList /> },

      ...patterns.map(p => ({
        path: `patterns/${p.slug}`,
        element: (
          <Suspense fallback={<div style={{ padding: 16 }}>Loading pattern…</div>}>
            {React.createElement(lazyMap[p.component])}
          </Suspense>
        )
      })),

      ...antiPatterns.map(a => ({
        path: `anti-patterns/${a.slug}`,
        element: (
          <Suspense fallback={<div style={{ padding: 16 }}>Loading anti-pattern…</div>}>
            {React.createElement(lazyMap[a.component])}
          </Suspense>
        )
      }))
    ]
  }
]);
