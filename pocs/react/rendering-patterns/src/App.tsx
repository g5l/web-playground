import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PatternTemplate from '@templates/PatternTemplate';
import AntiPatternTemplate from '@templates/AntiPatternTemplate';

export default function App() {
  const loc = useLocation();
  const isAnti = loc.pathname.startsWith('/anti-patterns');

  return isAnti ? (
    <AntiPatternTemplate>
      <Outlet />
    </AntiPatternTemplate>
  ) : (
    <PatternTemplate>
      <Outlet />
    </PatternTemplate>
  );
}
