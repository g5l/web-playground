import React from 'react';
import { useAtom } from 'jotai';
import { countAtom } from '../store/countAtom';

const CounterDisplay: React.FC = () => {
  const [count] = useAtom(countAtom);
  return <h2>Count: {count}</h2>;
};

export default CounterDisplay; 