import React from 'react';

export const Item: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return <li>{children}</li>;
};