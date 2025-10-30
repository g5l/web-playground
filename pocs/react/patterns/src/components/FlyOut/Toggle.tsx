import React, { useContext } from 'react';
import { FlyOutContext } from './FlyOut';

type ToggleProps = { children: React.ReactNode };

export function Toggle({ children }: ToggleProps) {
  const ctx = useContext(FlyOutContext);
  if (!ctx) throw new Error('Toggle must be used within a FlyOut');
  return <button onClick={ctx.toggle}>{children}</button>;
}
