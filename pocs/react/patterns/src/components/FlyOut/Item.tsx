import React from 'react';

type ItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
};

export function Item({ children }: ItemProps) {
  return (
    <li role="menuitem" className='flyout-item'>
      {children}
    </li>
  );
}
