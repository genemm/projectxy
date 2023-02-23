let readyPlayerCount = 0;
export const  listen = (io) => {
	let room;
	io.on("connection", (socket) => {
		console.log("New connection", socket.id);
		socket.on("ready", ({ player }) => {
			room = "room" + Math.floor(readyPlayerCount / 2);
			socket.join(room);
    		console.log(`Player ${player} ready, socket id ${socket.id} in ${room}`);

    		readyPlayerCount++;

    		if (readyPlayerCount % 2 === 0) {
				io.in(room).emit("startGame", socket.id)
			}
  		});
  		
	    socket.on("move", (data) => {
	      socket.broadcast.to(room).emit("move", data);
	    }); 

	    socket.on("act", (data) => {
	      socket.broadcast.to(room).emit("act", data);
	    });

		socket.on("attack", (r) => {
			socket.broadcast.to(room).emit("attack");
		});

	    socket.on("exitGame", (r) => {
	      socket.broadcast.to(room).emit("exitGame");
	    });
	    socket.on("gameover", (r) => {
	      socket.broadcast.to(room).emit("gameover");
	    });
	    
	    socket.on("connect_error", (err) => {
	      console.log(`connect_error due to ${err.message}`);
	    });

	    socket.on("disconnect", ({ reason }) => {
	      socket.broadcast.to(room).emit("exitGame");
	      // readyPlayerCount--;
	      console.log(`Client ${socket.id} disconnected: ${reason}`);
	      socket.leave(room);
	    });
	});
}
