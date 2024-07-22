import CreateRoomForm from "./CreateRoomFrom";
import JoinRoomForm from "./JoinRoomForm";
import './index.css';

const Forms = ({uuid, socket, setUser}) => {
  return (
    <div className="forms-container">
      <div className="form-wrapper create-room">
        <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser}/>
      </div>
      <div className="form-wrapper join-room">
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default Forms;
