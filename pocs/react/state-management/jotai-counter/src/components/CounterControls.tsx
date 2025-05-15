import React from 'react';
import { useAtom } from 'jotai';
import { countAtom } from '../store/countAtom';

const CounterControls: React.FC = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default CounterControls; 