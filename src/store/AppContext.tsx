import React, { createContext, useContext, useMemo, useState } from 'react';

type AppState = {
  isDarkMode: boolean;
};

type AppContextValue = AppState & {
  setIsDarkMode: (value: boolean) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const value = useMemo(() => ({ isDarkMode, setIsDarkMode }), [isDarkMode]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
