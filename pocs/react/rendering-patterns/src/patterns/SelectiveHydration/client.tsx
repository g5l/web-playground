import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './ServerApp';

const container = document.getElementById('app-root');
if (container) {
  hydrateRoot(container, <App />);
}
