import React from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./index.css";
import { InitialState } from "./redux/store";
import { useSelector } from "react-redux";
// import { getUser } from "./redux/actions/userActions";

import CreateProject from "./components/dashboard/components/CreateProject";
import Dashboard from "./components/dashboard/components/Dashboard";
import ProfileProject from "./components/dashboard/components/ProfileProject";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProjectDetails from "./components/dashboard/components/ProjectDetails";
import UpdateProject from "./components/dashboard/components/UpdateProject";
import Projects from "./components/dashboard/components/Projects";

const App: React.FC = () => {
  // const dispatch = useDispatch<any>();
  const { loggedIn } = useSelector((state: InitialState) => state.userInfo);

  return (
    <div className="App bg-gradient-to-r from-red-50 via-red-100 to-fuchsia-200 h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              loggedIn?.token ? <Dashboard /> : <Navigate replace to="/login" />
            }
          >
            <Route path="create-project" element={<CreateProject />} />
            <Route index element={<ProfileProject />} />
            <Route path="projects" element={<Projects />} />
            <Route path="project-details/:id" element={<ProjectDetails />} />
            <Route path="update-project/:id" element={<UpdateProject />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
