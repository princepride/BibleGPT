import React, { createContext, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const ContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const [bibleIndex, setBibleIndex] = useState({
    book:"创世记",
    chapter:0,
  });

const [chatData, setChatData] = useState([
  {
    agent:'<|system|>',
    content:t("ContextProvider_ChatData_System"),
  }
])


  return (
    <StateContext.Provider value={{ bibleIndex, setBibleIndex, chatData, setChatData }}>
      {children}
    </StateContext.Provider>
  );
};