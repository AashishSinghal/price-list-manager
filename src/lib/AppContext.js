import React, { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ name: "hi" }}>{children}</AppContext.Provider>
  );
};
