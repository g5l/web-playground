import React, {createContext, useState} from 'react';
import {FlyOutContextType, FlyOutProps} from './types';

export const FlyOutContext = createContext<FlyOutContextType | undefined>(undefined);

export const FlyOut: React.FC<FlyOutProps> & {
  Toggle: React.FC;
  List: React.FC;
  Item: React.FC;
} = ({children}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <FlyOutContext.Provider value={{open, toggle}}>
      {children}
    </FlyOutContext.Provider>
  );
};

export default FlyOut;