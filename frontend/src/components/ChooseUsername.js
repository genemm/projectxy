import React, { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import randomstring from 'randomstring';

import styles from './ChooseUsername.module.css';

import { useUserContext } from '../context/UserContext';
import { useSocketContext } from "../context/SocketContext"
 
export default function ChooseUsername() {
  const { player, setPlayer } = useUserContext();
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setPlayer(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!player) {
      setError('Username is required');
    } else if (player.length < 3) {
      setError('Username is too short');
    } else if (player.length > 10) {
      setError('Username is too long');
    } else if (/\W/.test(player)) {
      setError('Username contains invalid characters');
    } else {
      // socket.connect()
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/lobby" replace={true} />;
  }

  return (
    <div className={styles.container}>
      <h2>Choose Username</h2>
      <p>Enter a username to use in the game</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <input
            type='text'
            value={player}
            onChange={handleChange}
            placeholder='Username'
            style={{ border: error ? '2px solid #f44' : 'none' }}
          />
          <small>{error}</small>
        </div>
        <button className={styles.button} type='submit'>
          <i className='fa fa-check-circle-o' aria-hidden='true'></i> Done
        </button>
      </form>
    </div>
  );
}
