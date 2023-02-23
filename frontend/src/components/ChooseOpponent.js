import React, { useContext, useEffect, useState } from "react";
import styles from "./ChooseOpponent.module.css";

import { HomeContext } from "../context/HomeContext";
import { UserContext } from "../context/UserContext";

export default function ChooseOpponent() {
  const setComponent = useContext(HomeContext)[1];
  const { room, player } = useContext(UserContext);
  const [opponents, setOpponents] = useState([]);

  const setRoom = room[1];
  const setPlayer = player[1];

  useEffect(() => {
    const fetchOpponents = setInterval(() => {
      fetch("/api/user")
        .then((response) => response.json())
        .then((data) => {
          setOpponents(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          clearInterval(fetchOpponents);
        });
    }, 1000);

    return function () {
      clearInterval(fetchOpponents);
    };
  }, []);

  const handleClick = (room) => {
    setRoom(room);
    setPlayer("O");
    setComponent("ChooseUsername");
  };

  return (
    <div className={styles.container}>
      <h2>Choose Opponent</h2>
      <div className={styles.opponents_container}>
        <button
          className={styles.button}
          onClick={() => setComponent("ChooseUsername")}
        >
          <i className="fa fa-plus" aria-hidden="true"></i> New Opponent
        </button>
        <ul className={styles.opponents}>
          {opponents.map(({ username, room }, index) => (
            <li
              key={index}
              className={styles.opponent}
              onClick={() => handleClick(room)}
            >
              {username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
