import './index.css'; // Ensure this path is correct according to your project structure

const RoomPage = () => {
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
          <div className="tool" title="Pencil">✏️</div>
          <div className="tool" title="Shapes">⬛</div>
          <div className="tool" title="Text">🔤</div>
          <div className="tool" title="Eraser">🧽</div>
          <div className="tool" title="Select">🔲</div>
          <div className="tool" title="Sticky Notes">📝</div>
          <div className="tool" title="Upload">📁</div>
          <div className="tool" title="Undo">↺</div>
          <div className="tool" title="Redo">↻</div>
          {/* <div className="tool" title="Zoom In">🔍</div>
          <div className="tool" title="Zoom Out">🔎</div> */}
        </aside>
        <div className="canvas">
          <div className="canvas-placeholder">Your collaborative canvas will appear here</div>
        </div>
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
      {/* <footer>
        <div className="page-nav">Page 1 of 1</div>
        <div className="zoom-level">Zoom: 100%</div>
        <button className="save-button">Save</button>
        <button className="export-button">Export</button>
      </footer> */}
    </div>
  );
};

export default RoomPage;
