import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import CreateProject from "./components/dashboard/components/CreateProject";
import Dashboard from "./components/dashboard/components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./index.css";
import { InitialState } from "./redux/store";

const App: React.FC = () => {
  const { login } = useSelector((state: InitialState) => state.userInfo);
  return (
    <div className="App h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Dashboard"
            element={
              login?.email ? <Dashboard /> : <Navigate replace to="/login" />
            }
          >
            <Route path="CreateProject" element={<CreateProject />} />
          </Route>
          {/* <Route path="/CreateProject" element={<CreateProject />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
