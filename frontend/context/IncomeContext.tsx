"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IncomeContextType {
  shouldRefetch: boolean;
  triggerRefetch: () => void;
}

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

export const IncomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const triggerRefetch = () => {
    setShouldRefetch(prev => !prev);
  };

  return (
    <IncomeContext.Provider value={{ shouldRefetch, triggerRefetch }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (context === undefined) {
    throw new Error('useIncome must be used within an IncomeProvider');
  }
  return context;
};
