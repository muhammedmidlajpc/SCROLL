const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:5173"]
    origin: ["https://scroll542.netlify.app"]
  }
});
io.on("connection", (socket) => {
  console.log("first connection", socket.id);
  socket.on("sendMessage", (msgdata) => {
    console.log("message received", msgdata);
    io.emit("receiveMessage", msgdata);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
module.exports = { io, server, app };
