import React, { useState } from "react";

import { InitialState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import Sidebar from "../../Sidebar";
import CreateProject from "./CreateProject";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { login, user } = useSelector((state: InitialState) => state.userInfo);
  const userName = user?.filter(
    (person: User) => person.email === login.email
  )[0].name;

  return (
    <div className="h-full">
      <header className="p-5 bg-white shadow-pink-100 shadow-lg flex justify-between fixed top-0 right-0 left-0 z-10">
        <label
          htmlFor="hamburger"
          className="hamburger-menu md:hidden block text-3xl cursor-pointer"
        >
          <div className="space-y-2">
            <span className="block w-5 h-0.5 bg-gray-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          </div>

          <input
            type="checkbox"
            id="hamburger"
            className="checkbox__sidebar hidden"
            onChange={() => setChecked((prev) => !prev)}
          />
        </label>
        <div className="hidden md:block">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-10 inline-block" />
            <span className="inline-block align-middle font-semibold text-lg text-stone-800">
              Proma
            </span>
          </Link>
        </div>
        <span className="justify-self-end text-slate-800 text-lg font-semibold">
          Welcome, {userName}
        </span>
      </header>
      {/* <div className="md:grid grid-cols-2 justify-between"> */}
      <Sidebar checked={checked} />
      <CreateProject />
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
