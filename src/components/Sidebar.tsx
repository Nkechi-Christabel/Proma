import React from "react";
import { Link, redirect } from "react-router-dom";

import { BiArchiveOut, BiLogOut } from "react-icons/bi";
import { VscProject } from "react-icons/vsc";
import { RiProjectorLine } from "react-icons/ri";
import { logout } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

interface Props {
  checked: boolean;
}

const Sidebar: React.FC<Props> = ({ checked }) => {
  const dispatch = useDispatch<any>();

  const handleLogout = async (): Promise<void> => {
    const logoutRes = await dispatch(logout());
    if (logoutRes === 200) {
      redirect("/");
    }
  };

  return (
    <div
      className={`sidebar bg-black bg-opacity-40 md:bg-gradient-to-br from-fuchsia-500 to-fuchsia-900 hidden md:block w-full h-full fixed left-0 bottom-0 top-16 z-20 overflow-hidden ${
        checked ? "d-block" : "hide"
      }
      }`}
    >
      <div className="sidebar__nav md-bg-transparent bg-gradient-to-br from-fuchsia-500 to-fuchsia-900 h-full pt-5 ">
        <nav className="navbar text-stone-200 ">
          <ul className="px-3">
            <li className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded tracking-wide pl-1 py-3 mt-2">
              <Link to="profileproject">
                {" "}
                <RiProjectorLine className="inline-block -mt-1 mr-2 w-5 h-5" />
                My projects
              </Link>
            </li>
            <li className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded tracking-wide pl-1 py-3 mt-2">
              <Link to="/projects">
                {" "}
                <VscProject className="inline-block -mt-1 mr-2 w-5 h-4 " />
                Projects
              </Link>
            </li>

            <li className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded tracking-wide pl-1 py-3 mt-2">
              <Link to="createproject">
                <BiArchiveOut className="inline-block -mt-1 mr-2 w-5 h-6" />
                Add a project
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="grid content-end h-4/6 px-3 -mt-12 text-stone-200"
          onClick={() => handleLogout()}
        >
          <Link to="/">
            <p className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded pl-1 py-3">
              {" "}
              <BiLogOut className="inline-block mr-2 w-5 h-5 " />
              Log out
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
