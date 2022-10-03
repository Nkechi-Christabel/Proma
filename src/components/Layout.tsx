import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./dashboard/components/Header";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }): React.ReactElement => {
  const { pathname } = useLocation();
  const [checked, setChecked] = useState(false);
  const dashboardRoutes = ["/createproject", "profileproject"];
  const dashboardLayout = dashboardRoutes.some((route) => route === pathname);
  console.log(dashboardLayout);
  return (
    <>
      {!dashboardLayout ? (
        { children }
      ) : (
        <div>
          <Header setChecked={setChecked} />
          <Sidebar checked={checked} />
          {children}
        </div>
      )}
    </>
  );
};

export default Layout;
