import "./App.css";
import { useEffect, useState } from "react";
import Forms from "./components/Forms";
import { Routes, Route } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import io from "socket.io-client";

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    socket.on("userIsJoined", (data)=>{
      if(data.success){
        console.log("user Join")
      }
      else console.log("user ErrorsetUser");
    })
  }, []);

  const server = "http://localhost:5000"
  const connectionOptions = {
    "force new connection": true,
    reconnectionAttemts : "Infinity",
    timeout: 10000,
    transpots: ["websocket"],
  };
  const socket = io(server, connectionOptions);


  const uuid = ()=>{
    let S4 = ()=>{
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return(
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    )
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket= {socket}/>} setUser={setUser} />
        <Route path="/:roomId" element={ <RoomPage /> }/>
      </Routes>
    </div>
  );
};

export default App;
