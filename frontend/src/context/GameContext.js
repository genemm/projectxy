import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(false);
  const [winner, setWinner] = useState('');
  const [multiplayer, setMultiplayer] = useState(false);
  const [nextPlayer, setNextPlayer] = useState('X');

  return (
    <GameContext.Provider
      value={{
        squares: [squares, setSquares],
        isX: [isX, setIsX],
        winner: [winner, setWinner],
        multiplayer: [multiplayer, setMultiplayer],
        nextPlayer: [nextPlayer, setNextPlayer],
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
