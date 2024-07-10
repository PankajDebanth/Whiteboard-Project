import { useRef, useState } from 'react';
import { Button, Popover, Box } from '@mui/material';
import { ChromePicker } from 'react-color';
import './index.css'; // Ensure this path is correct according to your project structure
import Whiteboard from '../../components/Whiteboard';

const RoomPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [tool, setTool] = useState('');
  const [color, setColor] = useState('black');

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [elements, setElements] = useState([]);


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
    // handleColorClose();
  };

  const open = Boolean(anchorEl);
  const colorOpen = Boolean(colorAnchorEl);
  const id = open ? 'shapes-popover' : undefined;
  const colorId = colorOpen ? 'color-popover' : undefined;

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
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <ChromePicker color={color} onChangeComplete={handleColorChange} />
          </Popover>
          <div className="tool" title="Pencil" value="pencil" onClick={() => setTool('pencil')}>✏️</div>
          <div className="tool" title="Shapes" onClick={handleShapesClick}>⬛</div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Box className="shapes-popover">
              <Button className="shape-option" title="Line" startIcon={<span>➖</span>} onClick={() => setTool('line')}>
                Line
              </Button>
              <Button className="shape-option" title="Rectangle" startIcon={<span>▭</span>} onClick={() => setTool('rectangle')}>
                Rectangle
              </Button>
              <Button className="shape-option" title="Circle" startIcon={<span>⬤</span>} onClick={() => setTool('circle')}>
                Circle
              </Button>
            </Box>
          </Popover>
          <div className="tool" title="Text">🔤</div>
          <div className="tool" title="Clear Canvas">🧽</div>
          <div className="tool" title="Select">🔲</div>
          {/* <div className="tool" title="Sticky Notes">📝</div> */}
          <div className="tool" title="Upload">📁</div>
          <div className="tool" title="Undo">↺</div>
          <div className="tool" title="Redo">↻</div>
        </aside>
        <Whiteboard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements}/>
        <aside className="collaborators">
          <div className="collaborator">👤 User1</div>
          <div className="collaborator">👤 User2</div>
          <div className="chat">
            <div className="chat-header">Chat</div>
            <div className="chat-messages"></div>
            <input type="text" className="chat-input" placeholder="Type a message..." />
          </div>
          <div className="video-call">📹 Video Call</div>
        </aside>
      </div>
    </div>
  );
};

export default RoomPage;
