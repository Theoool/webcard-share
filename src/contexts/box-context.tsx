'use client'
import { createContext, useContext, useState } from 'react';

interface BoxContextType {
  Delete: boolean;
  setdelete: (term: boolean) => void;
}

const BoxContext = createContext<BoxContextType | undefined>(undefined);

export function BoxProvider({ children }: { children: React.ReactNode }) {
  const [Delete, setdelete] = useState(false);

  return (
    <BoxContext.Provider value={{ Delete, setdelete }}>
      {children}
    </BoxContext.Provider>
  );
}

export function useBox() {
  const context = useContext(BoxContext);
  if (context === undefined) {
    throw new Error('useBox must be used within a BoxProvider');
  }
  return context;
}
