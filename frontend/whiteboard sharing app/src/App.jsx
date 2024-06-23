import "./App.css";
import Forms from "./components/Forms";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" component={<Forms />} />
      </Routes>
    </div>
  );
};

export default App;
