// server.js
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUsersInRoom } = require("./utiles/users");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let roomIdGlobal, imaURLGlobal;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("userJoined", (data) => {
    console.log("data", data);
    const { name, roomName, description, roomId, userId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);

    const users = addUser(data);
    socket.emit("userIsJoined", { success: true, users });
    io.in(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteboardDataResponse", { imgURL: imaURLGlobal });
  });

  socket.on("whiteboardData", (data) => {
    imaURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", { imgURL: data });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    const user = removeUser(socket.id);
    if (user) {
      const users = getUsersInRoom(user.roomId);
      io.in(user.roomId).emit("allUsers", users);
      io.in(user.roomId).emit("userLeft", user.name);
    }
  });
});

// route
app.get("/", (req, res) => {
  res.send("This is a realtime whiteboard sharing app");
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("Server is listening and running on port", port));
