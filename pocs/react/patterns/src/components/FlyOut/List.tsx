import React, {useContext} from 'react';
import {FlyOutContext} from './FlyOut';

export const List: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const ctx = useContext(FlyOutContext);
  if (!ctx) throw new Error('List must be used within a FlyOut');
  if (!ctx.open) return null;
  return <ul>{children}</ul>;
};