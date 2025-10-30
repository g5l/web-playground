import React from 'react';

type ItemProps = { children: React.ReactNode };

export function Item({ children }: ItemProps) {
  return <li>{children}</li>;
}
