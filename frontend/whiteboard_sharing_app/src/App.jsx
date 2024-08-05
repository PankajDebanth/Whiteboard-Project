import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Forms from "./components/Forms";
import RoomPage from "./pages/RoomPage";
import io from "socket.io-client";
import { Toaster, toast } from "react-hot-toast";

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
  const [notifiedUsers, setNotifiedUsers] = useState(new Set());

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
        const newUser = data.users[data.users.length - 1];

        if (!notifiedUsers.has(newUser.userId)) {
          const userType = newUser.presenter ? "Presenter" : "User";
          toast.success(`${newUser.name} (${userType}) has joined the room`, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setNotifiedUsers((prev) => new Set(prev).add(newUser.userId));
        }
      } else {
        console.log("User error");
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    socket.on("userLeft", (userName) => {
      toast.success(`${userName} has left the room`);
    });

    return () => {
      socket.off("userIsJoined");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("allUsers");
      socket.off("userLeft");
    };
  }, [notifiedUsers]);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users} />} />
      </Routes>
    </div>
  );
};

export default App;
