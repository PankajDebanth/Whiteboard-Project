import { useRef, useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import { ChromePicker } from "react-color";
import "./index.css";
import Whiteboard from "../../components/Whiteboard";

const RoomPage = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

  const handleShapesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleToolSelect = (selectedTool) => {
    setTool(selectedTool);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const colorOpen = Boolean(colorAnchorEl);
  const id = open ? "shapes-popover" : undefined;
  const colorId = colorOpen ? "color-popover" : undefined;

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "White";
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setElements([]);
  };

  const handleUndo = ()=>{
    setHistory((prevHistory) =>[
      ...prevHistory,
      elements[elements.length - 1],
      setElements((prevElements)=>
        prevElements.slice(0, prevElements.length - 1)
      )
    ])
  };

  const handleRedo = () => {
    if (history.length > 0) {
      const lastHistoryItem = history[history.length - 1];
      setElements((prevElements) => [...prevElements, lastHistoryItem]);
      setHistory((prevHistory) =>
        prevHistory.slice(0, prevHistory.length - 1)
      );
    }
  };
  

  return (
    <div>
      <header>
        <div className="logo">SyncSketch - A whiteboard</div>
        <div className="room-info">Room: 12345</div>
        <div className="user-profile">
          <div className="user-name">John Doe</div>
          <div className="settings-icon">⚙️</div>
        </div>
      </header>
      <div className="main-content">
        <aside className="toolbox">
          <div className="tool" title="Color" onClick={handleColorClick}>
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
          <div
            className="tool"
            title="Pencil"
            onClick={() => setTool("pencil")}
          >
            ✏️
          </div>
          <div className="tool" title="Shapes" onClick={handleShapesClick}>
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
              <Button
                className="shape-option"
                title="Line"
                startIcon={<span>➖</span>}
                onClick={() => handleToolSelect("line")}
              >
                Line
              </Button>
              <Button
                className="shape-option"
                title="Rectangle"
                startIcon={<span>▭</span>}
                onClick={() => handleToolSelect("rect")}
              >
                Rectangle
              </Button>
              <Button
                className="shape-option"
                title="Circle"
                startIcon={<span>⬤</span>}
                onClick={() => handleToolSelect("circle")}
              >
                Circle
              </Button>
            </Box>
          </Popover>
          <div className="tool" title="Text">
            🔤
          </div>
          <div
            className="tool"
            title="Clear Canvas"
            onClick={handleClearCanvas}
          >
            🧽
          </div>
          <div className="tool" title="Select">
            🔲
          </div>
          <div className="tool" title="Upload">
            📁
          </div>
          <div
            className={`tool ${elements.length === 0 ? "disabled" : ""}`}
            title="Undo"
            onClick={() => 
              handleUndo()
            }
          >
            ↺
          </div>
          <div
            className={`tool ${history.length < 1 ? "disabled" : ""}`}
            title="Redo"
            onClick={() => 
              handleRedo()
            }
          >
            ↻
          </div>
        </aside>
        <Whiteboard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
        />
        <aside className="collaborators">
          <div className="collaborator">👤 User1</div>
          <div className="collaborator">👤 User2</div>
          <div className="chat">
            <div className="chat-header">Chat</div>
            <div className="chat-messages"></div>
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
            />
          </div>
          <div className="video-call">📹 Video Call</div>
        </aside>
      </div>
    </div>
  );
};

export default RoomPage;
