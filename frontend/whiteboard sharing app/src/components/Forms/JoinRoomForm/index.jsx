import "./index.css";

const JoinRoomForm = () => {
  return (
    <div className="form-wrapper join-room">
      <h2>Join Room</h2>
      <form id="join-room-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="input-group">
          <label htmlFor="room-code">Room Code</label>
          <input type="text" id="room-code" name="room-code" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinRoomForm;
