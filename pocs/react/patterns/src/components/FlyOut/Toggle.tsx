import React, { useContext } from 'react';
import { FlyOutContext } from './FlyOut';

type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Toggle({ children }: ToggleProps) {
  const ctx = useContext(FlyOutContext);
  if (!ctx) throw new Error('Toggle must be used within a FlyOut');
  const { open, toggle } = ctx;
  return (
    <button
      type="button"
      className="flyout-toggle"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={toggle}
    >
      {children}
    </button>
  );
}
