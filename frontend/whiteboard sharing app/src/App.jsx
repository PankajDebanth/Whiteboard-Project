import "./App.css";
import Forms from "./components/Forms";
import { Routes, Route } from "react-router-dom";
import RoomPage from "./pages/RoomPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/:roomId" element={ <RoomPage /> }/>
      </Routes>
    </div>
  );
};

export default App;
