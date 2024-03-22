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
//   const [chatData, setChatData] = useState([
//     ['<|system|>', t("ContextProvider_ChatData_System")],
//     ['<|user|>', 'Hello, how are you?'],
//     ['<|assistant|>', 'I am doing well, thank you for asking. How can I assist you today?'],
//     ['<|user|>', 'I need help with a programming question.'],
//     ['<|assistant|>', 'Sure, I would be happy to help you with your programming question. Please provide more details about the problem you are facing.'],
// ])

const [chatData, setChatData] = useState([
  {
    agent:'<|system|>',
    content:t("ContextProvider_ChatData_System"),
  },
  {
    agent:'<|user|>',
    content:'Hello, how are you?',
  },
  {
    agent:'<|assistant|>',
    content:'I am doing well, thank you for asking. How can I assist you today?',
    attachments:[{book:"历代志上",chapter:3,content:"test1"},{book:"传道书",chapter:1,content:"test2"}]
  }
])


  return (
    <StateContext.Provider value={{ bibleIndex, setBibleIndex, chatData, setChatData }}>
      {children}
    </StateContext.Provider>
  );
};