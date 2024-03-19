import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const ContextProvider = ({ children }) => {
  const [bibleIndex, setBibleIndex] = useState({
    book:"创世记",
    chapter:0,
  });

  return (
    <StateContext.Provider value={{ bibleIndex, setBibleIndex }}>
      {children}
    </StateContext.Provider>
  );
};