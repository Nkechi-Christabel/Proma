import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Logo from "../assets/logo.png";
import Illustration from "../assets/illustration.png";
import { InitialState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/userActions";

const Home: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [checked, setChecked] = useState<boolean>(false);
  const { login } = useSelector((state: InitialState) => state.userInfo);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <header>
        <div className="flex justify-between container mx-auto max-w-7xl pt-9 px-2 relative">
          <div>
            <Link to="/">
              <img src={Logo} alt="logo" className="w-12 inline-block" />
              <span className="inline-block align-middle font-bold text-stone-700 text-xl mt-1">
                Proma
              </span>
            </Link>
          </div>
          <div>
            <label
              htmlFor="hamburger"
              className="hamburger-menu md:hidden block text-3xl cursor-pointer relative z-20"
              onClick={() => setChecked((prev) => !prev)}
            >
              <div className="space-y-2">
                <span className="block w-5 h-0.5 bg-gray-600 animate-pulse"></span>
                <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
                <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
              </div>
            </label>
            <input type="checkbox" id="hamburger" className="checkbox hidden" />
            <nav className="navbar__bigScreen hidden md:block text-gray-600 ">
              <ul className="md:flex hidden mt-5 md:mt-0 font-semibold ">
                <li className="mr-10 py-2 md:py-0 tracking-wide hover:text-fuchsia-700">
                  <Link to="/">Home</Link>
                </li>
                <li className="mr-10 py-2 md:py-0  tracking-wide hover:text-fuchsia-700">
                  <Link to={login.email ? "/dashboard" : "/login"}>
                    Dashboard
                  </Link>
                </li>
                <li className="mr-10 pt-2 pb-0 md:py-0  tracking-wide hover:text-fuchsia-700">
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <nav
          className={`navbar__smallScreen bg-gradient-to-r from-red-50 via-red-100 to-fuchsia-200 text-gray-600 absolute z-10 left-0 top-0 transition-all duration-150 ease-in w-full h-3/6 ${
            checked ? "d-block" : "hide"
          }`}
        >
          <ul
            className={`mx-5 md:hidden pt-8 flex-col justify-center items-center w-full text-xl font- font-bold text-gray-600 ${
              checked ? "d-flex" : "hide"
            }`}
          >
            <li className="mr-10 py-4 md:py-0 tracking-wide hover:tracking-wider hover:text-fuchsia-700">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-10 py-4 md:py-0  tracking-wide hover:tracking-wider hover:text-fuchsia-700">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="mr-10 pt-2 pb-0 md:py-0 tracking-wide hover:tracking-wider hover:text-fuchsia-700">
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto max-w-7xl px-3">
        <section className="md:flex justify-between  hero__section mt-20">
          <div className="self-center md:max-w-2xl text-center md:text-start pb-4 md:pb-0 ">
            <h1 className="font-bold lg:text-6xl text-5xl mb-3 leading-tight text-gray-700">
              Create a new space for your project
            </h1>
            <p className="text-md md:text-xl text-gray-500 ">
              Now you have all your projects in a place, to be accessed anytime
              and anywhere.
            </p>
            <Link to="/signup">
              <button className="btn my-7 px-6 py-3 text-xl text-white bg-rose-500 hover:bg-fuchsia-700 rounded">
                Create Space
              </button>
            </Link>
          </div>
          <Tilt>
            <div className="md:ml-8 md:block flex justify-center">
              <img
                src={Illustration}
                alt="3D illustration"
                className="illustration rounded-full border-2 border-red-200 max-w-xl w-full"
              />
            </div>
          </Tilt>
        </section>
      </main>
    </div>
  );
};

export default Home;
