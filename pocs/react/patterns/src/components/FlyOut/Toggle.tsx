import React, { useContext } from 'react';
import { FlyOutContext } from './FlyOut';

export const Toggle: React.FC = ({ children }) => {
  const ctx = useContext(FlyOutContext);
  if (!ctx) throw new Error('Toggle must be used within a FlyOut');
  return <button onClick={ctx.toggle}>{children}</button>;
};