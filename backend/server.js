const express = require("express");
const app = express();

const server = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

let roomIdGlobal, imaURLGlobal;

io.on("connection", (socket) => {
    socket.on("userJoined", (data) => {
        const [name, roomName, description, roomId, userId, host, presenter] = data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        socket.emit("userIsJoined", { success: true });
        socket.broadcast.to(roomId).emit("whiteboardDataResponse", {
            imgURL: imaURLGlobal
        });
    });

    socket.on("whiteboardData", (data) => {
        imaURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse", {
            imgURL: data
        });
    });
});

//route
app.get('/', (req, res) => {
    res.send("This is a realtime whiteboard sharing app");
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('Server is listening and running', port));
