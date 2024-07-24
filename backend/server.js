const express = require("express");
const app = express();

const server = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

io.on("connection",(socket)=>{
    socket.on("userJoined", (data)=>{
        const [name, roomName, description, roomId, userId, host, presenter] = data;
        socket.join(roomId);
        socket.emit("userIsJoined", {success: true}); 
    })
})


//route
app.get('/', (req, res)=>{
    res.send("This is realtime whiteboard sharing app")
})

const port = process.env.PORT || 5000
server.listen(port, ()=> console.log('Server is listening and running'))