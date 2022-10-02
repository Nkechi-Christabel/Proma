import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import CreateProject from "./components/dashboard/components/CreateProject";
import Dashboard from "./components/dashboard/components/Dashboard";
import ProfileProject from "./components/dashboard/components/ProfileProject";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./index.css";
import { InitialState } from "./redux/store";
import { getUser } from "./redux/actions/userActions";

const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { login } = useSelector((state: InitialState) => state.userInfo);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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
            <Route path="ProfileProject" element={<ProfileProject />} />
          </Route>
          {/* <Route path="/CreateProject" element={<CreateProject />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
