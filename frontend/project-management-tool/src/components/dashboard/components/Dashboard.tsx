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
    <div className="h-full bg-white dashboard">
      <Header setChecked={setChecked} />
      <Sidebar checked={checked} setChecked={setChecked} />
      <Outlet />
    </div>
  );
};

export default Dashboard;
