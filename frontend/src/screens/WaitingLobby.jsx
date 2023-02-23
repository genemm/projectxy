import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import styles from "./HomeScreen.module.css";
import { useSocketContext } from "../context/SocketContext" 
import { useUserContext } from '../context/UserContext';
import buttonStyles from "../components/ChooseUsername.module.css";

const WaitingLobby = () => {
	const [cancel, setCancel] = useState(false)
	const [startGame, setStartGame] = useState(false)
	const { connectToSocket, socket } = useSocketContext()
	const { player } = useUserContext()

	const handleStartGame = useCallback(() => {
		console.log("Starting game...")
		setStartGame(true)
	}, []);

	useEffect(() => {
		connectToSocket()
	}, [])

	useEffect(() => {
		if (socket) {
			socket.emit("ready", {player});
			socket.on("startGame", handleStartGame)

			return () => {
				socket.off("startGame", handleStartGame)
			}
		}
	}, [socket, player, handleStartGame])

	const handleCancel = () => {
		socket.disconnect()
		setCancel(true)
	}

	if (cancel) {
		return <Navigate to="/" replace={true} />
	}

	if(startGame) {
		return <Navigate to="/play" replace={true} />
	}

	return (
		<div className={styles.container}>
			<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
				<h3>Waiting for opponent, the game will begin shortly...</h3>
      			<button className={buttonStyles.button} onClick={handleCancel}>
	          		<i className='fa fa-check-circle-o' aria-hidden='true'></i> Cancel
	        	</button>
			</div>
    	</div>
		);
}

export default WaitingLobby;