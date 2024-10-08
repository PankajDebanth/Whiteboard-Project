import { useRef, useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import { ChromePicker } from "react-color";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./index.css";
import Whiteboard from "../../components/Whiteboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Chat from "../../components/Chat/Chat";

const RoomPage = ({ user, socket, users }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const { roomId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

  const handleShapesClick = (event) => {
    if (user?.presenter) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorClick = (event) => {
    if (user?.presenter) {
      setColorAnchorEl(event.currentTarget);
    }
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleToolSelect = (selectedTool) => {
    if (user?.presenter) {
      setTool(selectedTool);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const colorOpen = Boolean(colorAnchorEl);
  const id = open ? "shapes-popover" : undefined;
  const colorId = colorOpen ? "color-popover" : undefined;

  const handleClearCanvas = () => {
    if (user?.presenter) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setElements([]);
    }
  };

  const handleUndo = () => {
    if (user?.presenter && elements.length > 0) {
      setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]]);
      setElements((prevElements) => prevElements.slice(0, prevElements.length - 1));
    }
  };

  const handleRedo = () => {
    if (user?.presenter && history.length > 0) {
      const lastHistoryItem = history[history.length - 1];
      setElements((prevElements) => [...prevElements, lastHistoryItem]);
      setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
    }
  };

  const copyRoomId = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => {
        toast.success("Room ID copied to clipboard!",);
      })
      .catch((error) => {
        toast.error("Failed to copy Room ID: " + error.message,);
      });
  };

  return (
    <div>
      <header>
        <div className="logo">SyncSketch - A whiteboard</div>
        <div className="room-info">
          Room: {roomId} &nbsp;
          <i className="fa-solid fa-copy copy-icon" style={{ cursor: "pointer" }} onClick={copyRoomId}></i> {/* Font Awesome Copy Icon */}
        </div>
        <div className="user-profile">
          <div className="user-name">{user?.name}</div>
          <div className="settings-icon">⚙️</div>
        </div>
      </header>
      <div className="main-content">
        <aside className="toolbox">
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Color" onClick={handleColorClick}>
            🎨
          </div>
          <Popover
            id={colorId}
            open={colorOpen}
            anchorEl={colorAnchorEl}
            onClose={handleColorClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <ChromePicker color={color} onChangeComplete={handleColorChange} />
          </Popover>
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Pencil" onClick={() => setTool("pencil")}>
            ✏️
          </div>
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Shapes" onClick={handleShapesClick}>
            ⬛
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Box className="shapes-popover">
              <Button className="shape-option" title="Line" startIcon={<span>➖</span>} onClick={() => handleToolSelect("line")}>
                Line
              </Button>
              <Button className="shape-option" title="Rectangle" startIcon={<span>▭</span>} onClick={() => handleToolSelect("rect")}>
                Rectangle
              </Button>
              <Button className="shape-option" title="Circle" startIcon={<span>⬤</span>} onClick={() => handleToolSelect("circle")}>
                Circle
              </Button>
            </Box>
          </Popover>
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Text">
            🔤
          </div>
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Clear Canvas" onClick={handleClearCanvas}>
            🧽
          </div>
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Select">
            🔲
          </div>
          <div className={`tool ${!user?.presenter ? "disabled" : ""}`} title="Upload">
            📁
          </div>
          <div className={`tool ${!user?.presenter || elements.length === 0 ? "disabled" : ""}`} title="Undo" onClick={handleUndo}>
            ↺
          </div>
          <div className={`tool ${!user?.presenter || history.length < 1 ? "disabled" : ""}`} title="Redo" onClick={handleRedo}>
            ↻
          </div>
        </aside>
        <Whiteboard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool} color={color} user={user} socket={socket} />
        <aside className="collaborators">
          {users.map((collaborator, index) => (
            <div key={index} className="collaborator">
              👤 {collaborator.name} {user && user.userId === collaborator.userId && "(You)"}
            </div>
          ))}
          <Chat socket={socket}/>
          <div className="video-call">📹 Video Call</div>
        </aside>
      </div>
    </div>
  );
};

export default RoomPage;
