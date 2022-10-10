import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
// import { useDispatch } from "react-redux";

// import { getUser } from "../../../redux/actions/userActions";
// import CreateProject from "./CreateProject";
// import ProfileProject from "./ProfileProject";

const Dashboard: React.FC = () => {
  // const dispatch = useDispatch<any>();
  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen h-max bg-white">
      <Header setChecked={setChecked} />
      <Sidebar checked={checked} />
      <Outlet />
    </div>
  );
};

export default Dashboard;
