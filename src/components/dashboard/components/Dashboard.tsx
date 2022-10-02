import React, { useState } from "react";

import Sidebar from "../../Sidebar";
import Header from "./Header";
// import CreateProject from "./CreateProject";
import ProfileProject from "./ProfileProject";

const Dashboard: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  // console.log(window.location.pathname);
  return (
    <div className="h-screen bg-white">
      <Header setChecked={setChecked} />
      <Sidebar checked={checked} />
      {/* <CreateProject /> */}
      <ProfileProject />
    </div>
  );
};

export default Dashboard;
