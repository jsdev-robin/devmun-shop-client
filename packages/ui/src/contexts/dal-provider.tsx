import React, { createContext, useContext, ReactNode } from "react";

type AuthContextType = {
  role: {
    userRole: unknown;
  };
};

const DalContext = createContext<AuthContextType | undefined>(undefined);

type DalProviderProps = {
  children: ReactNode;
  role: {
    userRole: unknown;
  };
};

export const DalProvider = ({ children, role }: DalProviderProps) => {
  return <DalContext.Provider value={{ role }}>{children}</DalContext.Provider>;
};

export const useDal = (): AuthContextType => {
  const context = useContext(DalContext);
  if (!context) {
    throw new Error("useDal must be used within an DalProvider");
  }
  return context;
};
