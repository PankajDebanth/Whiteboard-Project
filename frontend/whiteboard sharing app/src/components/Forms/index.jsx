// import CreateRoomForm from './CreateRoomForm';
import CreateRoomForm from "./CreateRoomFrom";
import JoinRoomForm from "./JoinRoomForm";
import './index.css';


const Forms = () => {
  return (
    <div className="forms-container">
      <div className="form-wrapper create-room">
        <CreateRoomForm />
      </div>
      <div className="form-wrapper join-room">
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default Forms;
