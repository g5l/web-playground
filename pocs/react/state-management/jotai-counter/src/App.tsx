import React from 'react';
import CounterDisplay from './components/CounterDisplay';
import CounterControls from './components/CounterControls';

function App() {
  return (
    <div>
      <h1>Jotai Example</h1>
      <CounterDisplay />
      <CounterControls />
    </div>
  );
}

export default App; 