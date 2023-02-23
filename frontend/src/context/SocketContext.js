import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from "socket.io-client"

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  const connectToSocket = () => {
    const socket = io('http://localhost:5000')

    setSocket(socket)
  }
  
  return (
    <SocketContext.Provider value={{connectToSocket, socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext)
