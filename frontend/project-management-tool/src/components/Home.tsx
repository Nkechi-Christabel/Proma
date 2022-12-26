import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Logo from "../assets/logo.png";
import Illustration from "../assets/illustration.png";
const Home: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className="px-4 h-full">
      <header>
        <div className="flex justify-between container mx-auto max-w-6xl pt-9  relative">
          <div className="xl:-ml-12">
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
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="mr-10 pt-2 pb-0 md:py-0  tracking-wide hover:text-fuchsia-700">
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <nav
          className={`navbar__smallScreen bg-gradient-to-r from-red-50 via-red-100 to-fuchsia-200 text-gray-600 absolute z-10 left-0 top-0 hidden transition-shadow w-full h-3/6 ${
            checked ? "d-block" : "hide"
          }`}
        >
          <ul
            className={`mx-5 md:hidden pt-8 flex-col justify-center items-center w-full h-full text-xl font- font-bold text-gray-600 ${
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
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto max-w-7xl px-3 h-full">
        <section className="md:flex justify-between items-center hero__section mt-20 md:mt-40 h-96">
          <div className="self-center md:max-w-2xl text-center md:text-start pb-4 md:pb-0 md:pr-4">
            <h1 className="font-bold lg:text-6xl text-5xl mb-3 leading-tight text-gray-700">
              Create a new space for your projects
            </h1>
            <p className="text-md md:text-xl text-gray-500 ">
              Now you can store, share your projects and access them anytime,
              anywhere and on the go.
            </p>
            <Link to="/signup">
              <button className="btn my-7 px-6 py-3 text-xl text-white bg-rose-500 hover:bg-fuchsia-700 rounded">
                Create Space
              </button>
            </Link>
          </div>
          <Tilt>
            <div className="md:ml-12 md:block flex justify-center pb-8">
              <img
                src={Illustration}
                alt="3D illustration"
                className="illustration rounded-full border-2 border-red-200  w-full h-auto"
              />
            </div>
          </Tilt>
        </section>
      </main>
    </div>
  );
};

export default Home;
