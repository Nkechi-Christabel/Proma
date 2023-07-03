import React from "react";
import { Link } from "react-router-dom";
import { BiArchiveOut, BiLogOut } from "react-icons/bi";
import { VscProject } from "react-icons/vsc";
import { RiProjectorLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Logo from "../../../assets/logo.png";
import { logout } from "../../../redux/actions/userActions";

interface Props {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ checked, setChecked }) => {
  const dispatch = useDispatch<any>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section
      className={`sidebar bg-black bg-opacity-40 md:bg-gradient-to-br from-fuchsia-500 to-fuchsia-900 hidden md:block w-full h-full fixed left-0 bottom-0 top-16 mt-1 z-20 ${
        checked ? "d-block" : "hide"
      }
      }`}
      onClick={() => setChecked((prev) => !prev)}
    >
      <div className="sidebar__nav md-bg-transparent bg-gradient-to-br from-fuchsia-500 to-fuchsia-900 h-full pt-6 ">
        <div className="md:hidden block mb-5">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-12 inline-block" />
            <span className="inline-block align-middle font-bold text-stone-700 text-xl mt-1">
              Proma
            </span>
          </Link>
        </div>
        <nav className="navbar text-stone-200 ">
          <ul className="px-3">
            <li className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded tracking-wide pl-1 py-3 mt-2">
              <Link to="/dashboard">
                {" "}
                <RiProjectorLine className="inline-block -mt-1 mr-2 w-5 h-5" />
                My projects
              </Link>
            </li>
            <li className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded tracking-wide pl-1 py-3 mt-2">
              <Link to="/dashboard/projects">
                {" "}
                <VscProject className="inline-block -mt-1 mr-2 w-5 h-4 " />
                Projects
              </Link>
            </li>

            <li className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded tracking-wide pl-1 py-3 mt-2">
              <Link to="/dashboard/create-project">
                <BiArchiveOut className="inline-block -mt-1 mr-2 w-5 h-6" />
                Add a project
              </Link>
            </li>
          </ul>
        </nav>
        <div className="grid content-end h-4/6 px-3 -mt-12 text-stone-200">
          <Link to="/">
            <p
              className="font-semibold hover:bg-fuchsia-200 hover:bg-opacity-30 hover:text-stone-100 rounded pl-1 py-3"
              onClick={() => handleLogout()}
            >
              {" "}
              <BiLogOut className="inline-block mr-2 w-5 h-5 " />
              Log out
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
