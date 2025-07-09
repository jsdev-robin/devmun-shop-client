'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextType {
  commandSearchOpen: boolean;
  setCommandSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [commandSearchOpen, setCommandSearchOpen] = useState(false);

  return (
    <AppContext.Provider value={{ commandSearchOpen, setCommandSearchOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
