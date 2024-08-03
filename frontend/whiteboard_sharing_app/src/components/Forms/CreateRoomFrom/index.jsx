import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CreateRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const generateCode = () => {
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    setGeneratedCode(code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Code copied: " + generatedCode);
  };
  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Admin Name is required");
      return;
    }
    const roomData = {
      name,
      roomName,
      description,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };
    console.log("roomData", roomData);

    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    console.log("socket.emit('userJoined', roomData)", socket.emit("userJoined", roomData));
    socket.emit("userJoined", roomData);
  };

  return (
    <div>
      <h2>Create Room</h2>
      <form id="create-room-form">
        <div className="input-group">
          <label htmlFor="admin-name">Admin Name</label>
          <input type="text" id="admin-name" name="admin-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="input-group">
          <label htmlFor="room-name">Room Name</label>
          <input type="text" id="room-name" name="room-name" value={roomName} onChange={(e) => setRoomName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="room-description">Description</label>
          <textarea id="room-description" name="room-description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="generated-code">Generated Code</label>
          <input type="text" id="generated-code" name="generated-code" value={roomId} disabled />
        </div>
        <div className="button-row">
          <button type="button" className="btn btn-danger" onClick={() => setRoomId(uuid())}>
            Generate Code
          </button>
          <button type="button" className="btn btn-success" onClick={copyCode}>
            Copy Code
          </button>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleCreateRoom}>
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
