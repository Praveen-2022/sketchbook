const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000"}));
const httpServer = createServer(app);
const URL = 'http://localhost:3000';
const io = new Server(httpServer, { cors: URL });
io.on("connection", (socket) => {
  console.log("server connected");
});

httpServer.listen(5000);