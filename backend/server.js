const express = require("express");
const app = express();

const server = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log("User connected");
})


//route
app.get('/', (req, res)=>{
    res.send("This is realtime whiteboard sharing app")
})

const port = process.env.PORT || 5000
server.listen(port, ()=> console.log('Server is listening and running'))