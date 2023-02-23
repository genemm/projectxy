import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const [player, setPlayer] = useState("");

  return (
    <UserContext.Provider
      value={{
        player,
        setPlayer
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext)
