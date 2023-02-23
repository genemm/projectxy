import React, { useState, createContext } from 'react';

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={[messages, setMessages]}>
      {children}
    </MessagesContext.Provider>
  );
};
