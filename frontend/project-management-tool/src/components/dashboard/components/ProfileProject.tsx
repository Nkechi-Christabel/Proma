import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { userProject } from "src/redux/actions/projectActions";
import { InitialState } from "src/redux/store";
import { FcEmptyTrash } from "react-icons/fc";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const ProfileProject: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [value, setValue] = useState("");
  const { userProjects, error, loading } = useSelector(
    (state: InitialState) => state.projects
  );

  console.log(value);

  //getting status that are true
  const searchFilter = userProjects?.filter((project: any) =>
    project.title.toLowerCase().includes(value)
  );

  //If filtered array isempty use the fetched array else use filtered array
  const projects = searchFilter?.length ? searchFilter : userProjects;

  useEffect(() => {
    dispatch(userProject());
  }, [dispatch]);

  const handleUserProjects = projects?.map((pro: any) => {
    return (
      <Link
        to={`/dashboard/project-details/${pro._id}`}
        className="cursor-pointer h-full"
        key={pro._id}
      >
        <div className="flip-card w-full h-96 lg:h-64">
          <div className="flip-card-inner shadow-lg shadow-pink-300 ">
            <div className="flip-card-front">
              <img
                src={pro.image}
                alt="project"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flip-card-back bg-zinc-300 text-stone-700 flex flex-col justify-center h-full">
              <h1 className="font-semibold">{pro.title}</h1>
              <p className="pt-4 font-semibold text-ellipsis">
                Website: {pro.website}
              </p>
              <p className="font-semibold">GitRepo: {pro.gitRepo}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setValue((e?.target as HTMLInputElement).value);
  };

  return (
    <div>
      {error && (
        <div className="grid justify-center items-center text-stone-700 text-lg font-semibold h-screen">
          {error.message ||
            error.response ||
            error.response.data ||
            error.response.data.message}
        </div>
      )}
      {loading && (
        <div className="grid justify-center items-center h-screen">
          <Loader />
        </div>
      )}
      <section className="h-full profile__project">
        <section className="pt-28 p-3 pr-6">
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
        <section className="userProjects__section h-full pt-4">
          {!userProjects?.length && (
            <div className="flex flex-col justify-center items-center text-center h-96 pt-10">
              <p>
                You currently do not have any project. You can create one{" "}
                <Link
                  to="createproject"
                  className="text-fuchsia-300 hover:text-pink-400 text-lg font-semibold"
                >
                  here
                </Link>{" "}
                or view other
                <Link
                  to="projects"
                  className="text-fuchsia-300 hover:text-pink-400 text-lg font-semibold "
                >
                  {" "}
                  projects
                </Link>
              </p>

              <FcEmptyTrash className="w-24 h-24 mt-5 opacity-20 animate-bounce" />
            </div>
          )}
          {userProjects?.length > 0 && (
            <div className="h-full p-5">
              <h2 className="font-bold text-2xl text-center text-stone-800 tracking-wide pb-4">
                Individual projects
              </h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-10">
                {handleUserProjects}
              </div>
            </div>
          )}
        </section>
        {/* </div> */}
      </section>
    </div>
  );
};

export default ProfileProject;
