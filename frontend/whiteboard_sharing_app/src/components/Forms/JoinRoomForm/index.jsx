import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({uuid, socket, setUser}) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRoomJoin = (e)=>{
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    }
    setUser(roomData);
    navigate(`/${roomId}`)
    socket.emit("userJoined", roomData);
  };

  return (
    <div >
      <h2>Join Room</h2>
      <form id="join-room-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="room-code">Room Code</label>
          <input type="text" id="room-code" name="room-code" value={roomId} onChange={(e)=> setRoomId(e.target.value)} required />
        </div>
        <button type="submit" onClick={handleRoomJoin} className="btn btn-primary">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinRoomForm;
