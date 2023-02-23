import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";

import apiServer from "./api.js"
import { listen } from "./sockets.js"
dotenv.config();

// connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conected to mongodb");
  })
  .catch((error) => {
    console.log("mongo error", error);
  });

const httpServer = http.createServer(apiServer)
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`Listening on Port http://localhost:${port}`);
});

listen(io)