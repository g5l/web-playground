import React, {createContext, useState} from 'react';
import {FlyOutContextType, FlyOutProps} from './types';

export const FlyOutContext = createContext<FlyOutContextType | undefined>(undefined);

export function FlyOut({ children }: FlyOutProps) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <FlyOutContext.Provider value={{open, toggle}}>
      <div className="flyout-root">{children}</div>
    </FlyOutContext.Provider>
  );
}

export default FlyOut;
