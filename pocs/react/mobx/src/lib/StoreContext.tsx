import React, { createContext, useContext } from 'react';
import { RootStore, type Stores } from '@stores/RootStore';

const store = new RootStore();
const StoreContext = createContext<Stores>(store);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export const useStores = () => useContext(StoreContext);

