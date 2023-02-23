import express from "express";
import path from "path";
import cors from "cors";
import userRouter from "./routers/userRouter.js";

import {
  addUser,
  removeUserFromRoom,
  removeUser,
  getWaitingUsers,
} from "./user.js";

const api = express() 
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(cors({ origin: true }));
api.use("/api/users", userRouter);
//API GET
api.get("/api/user", (req, res) => {
  res.send(getWaitingUsers());
});

const __dirname = path.resolve();
api.use(express.static(path.join(__dirname, "/frontend/build")));
api.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

api.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

export default api;