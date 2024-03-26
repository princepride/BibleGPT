import React, { createContext, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const ContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const [highlightedText, setHighlightedText] = useState(null);
  const [bibleIndex, setBibleIndex] = useState({
    book:"创世记",
    chapter:0,
  });

const [chatData, setChatData] = useState([
  {
    agent:'system',
    content:t("ContextProvider_ChatData_System"),
  },
  {
    agent:'agent',
    content:'xxxxxxxxxx',
    attachments:[
      {
        book:"耶利米书",
        chapter:1,
        content:"5耶和华这样说：“你们",
      }
    ]
  }
])


  return (
    <StateContext.Provider value={{ bibleIndex, setBibleIndex, 
    chatData, setChatData,
    highlightedText, setHighlightedText }}>
      {children}
    </StateContext.Provider>
  );
};