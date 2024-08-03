import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Forms from "./components/Forms";
import RoomPage from "./pages/RoomPage";
import io from "socket.io-client";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("userIsJoined", (data) => {
      if (data.success) {
        setUsers(data.users);
      } else {
        console.log("User error");
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("userIsJoined");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("allUsers");
    };
  }, []);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users} />} />
      </Routes>
    </div>
  );
};

export default App;
