import React, {useContext} from 'react';
import {FlyOutContext} from './FlyOut';

type ListProps = React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode;
};

export function List({ children }: ListProps) {
  const ctx = useContext(FlyOutContext);
  if (!ctx) throw new Error('List must be used within a FlyOut');
  if (!ctx.open) return null;
  return (
    <ul role="menu" className="flyout-menu">
      {children}
    </ul>
  );
}
