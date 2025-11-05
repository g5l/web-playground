import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Widget } from './ServerApp';

function qs(key: string) {
  if (typeof window === 'undefined') return null;
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

function hydrateIsland(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const section = el as HTMLElement;
  if (id === 'island-fast') {
    hydrateRoot(section, <Widget title="Fast widget" color="#16a34a" />);
  } else if (id === 'island-medium') {
    hydrateRoot(section, <Widget title="Medium widget" color="#2563eb" />);
  } else if (id === 'island-slow') {
    hydrateRoot(section, <Widget title="Slow widget" color="#ea580c" />);
  }
}


function hydrateProgressively() {
  hydrateIsland('island-fast');
  setTimeout(() => hydrateIsland('island-medium'), 1000);
  setTimeout(() => hydrateIsland('island-slow'), 2200);
}

hydrateProgressively();
