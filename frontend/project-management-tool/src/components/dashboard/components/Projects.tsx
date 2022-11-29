import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { allProjects } from "src/redux/actions/projectActions";
import { InitialState } from "src/redux/store";
import { FcEmptyTrash } from "react-icons/fc";
import { useSelector } from "react-redux";

import Loader from "../loader/Loader";
import Pagination from "./Pagination";

const Projects: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [value, setValue] = useState("");
  const { projects, error, loading } = useSelector(
    (state: InitialState) => state.projects
  );

  //Projects to map through for te pagination
  const [currentItems, setCurrentItems] = useState<string[]>();

  //getting status that are true
  const searchFilter =
    currentItems &&
    currentItems?.filter((project: any) =>
      project.title.toLowerCase().includes(value)
    );

  //If filtered array isempty use the fetched array else use filtered array
  const filteredProjects = searchFilter?.length ? searchFilter : projects;

  useEffect(() => {
    dispatch(allProjects());
  }, [dispatch]);

  const handleTitleCase = (title: string) =>
    title[0].toUpperCase() + title?.slice(1);

  const handleProjects = filteredProjects?.map((pro: any) => {
    return (
      <Link
        to={`/dashboard/project-details/${pro._id}`}
        className="cursor-pointer"
        key={pro._id}
      >
        {/* <div> */}
        <div className="rounded overflow-hidden drop-shadow-lg shadow-md hover:shadow-gray-300 hover:shadow-xl transition-shadow h-96 ">
          <img
            className="w-full h-64 object-cover"
            src={pro.image}
            alt="project"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {handleTitleCase(pro.title)}
            </div>
            <p className="text-gray-700 text-base line-clamp-2">{pro.desc}</p>
          </div>
        </div>
        {/* </div> */}
      </Link>
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setValue((e?.target as HTMLInputElement).value);
  };

  return (
    <div className="h-full">
      {error && (
        <div className="grid justify-center items-center text-stone-700 text-lg font-semibold h-full">
          {error.message ||
            error.response ||
            error.response.data ||
            error.response.data.message}
        </div>
      )}
      {loading && (
        <div className="grid justify-center items-center h-full">
          <Loader />
        </div>
      )}
      {!error && (
        <section className="h-full grid gap-y-8 profile__project">
          <section className="pt-28 pr-6">
            <div className="flex justify-end">
              <input
                className="border-2 border-fuchsia-100 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-gray-600 shadow-md"
                type="search"
                name="search"
                placeholder="Search by title"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </section>
          <section className="projects__section pt-4">
            {!projects?.length && (
              <div className="flex flex-col justify-center items-center text-center h-96 pt-10">
                <p>
                  There are currently no projects. You can create one{" "}
                  <Link
                    to="createproject"
                    className="text-fuchsia-300 hover:text-pink-400 text-lg font-semibold"
                  >
                    here
                  </Link>{" "}
                </p>
                <FcEmptyTrash className="w-24 h-24 mt-5 opacity-20 animate-bounce" />
              </div>
            )}
            {projects?.length > 0 && (
              <div className="h-full p-5">
                <h1 className="font-bold text-xl text-stone-800 text-center tracking-wide pb-6">
                  All Projects
                </h1>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto-fit items-start gap-10">
                  {handleProjects}
                </div>
              </div>
            )}
          </section>
          <div>
            {" "}
            <Pagination project={projects} setCurrentItems={setCurrentItems} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;
