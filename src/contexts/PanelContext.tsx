import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PanelContextType {
  isPanelOpen: boolean;
  setPanelOpen: (isOpen: boolean) => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  return (
    <PanelContext.Provider value={{ isPanelOpen, setPanelOpen }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanelContext = (): PanelContextType => {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanelContext must be used within a PanelProvider');
  }
  return context;
};
