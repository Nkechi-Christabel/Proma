import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InitialState } from "src/redux/store";
import Loader from "../loader/Loader";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

import { deleteProject, singleProject } from "src/redux/actions/projectActions";
import toast, { Toaster } from "react-hot-toast";
import ProgressBar from "./ProgressBar";

const ProjectDetails = () => {
  const [cancel, setCancel] = useState(false);
  const [del, setDel] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { aProject, loading, error } = useSelector(
    (state: InitialState) => state.projects
  );
  const { loggedIn } = useSelector((state: InitialState) => state.userInfo);

  useEffect(() => {
    dispatch(singleProject(id));
  }, [dispatch, id]);

  //Cleaning up and changing the date format
  const newDate = new Date(
    aProject?.createdAt?.split("T")[0].split("-").join(",")
  ).toLocaleString("en-us", { month: "long", day: "numeric", year: "numeric" });

  const confirmUser = loggedIn?.user.id === aProject?.user?._id;

  const handleDeleteYes = async () => {
    setCancel(true);
    setDeleteLoading(true);
    const res = await dispatch(deleteProject(id));

    //Display a message according to the response status
    if (res?.status === 200) {
      setTimeout(() => {
        setDeleteLoading(false);
        toast.success("Project deleted!");
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      }, 2000);
    } else {
      setTimeout(() => {
        toast.error(
          error?.message ||
            error?.response ||
            error?.response.data ||
            error?.response.data.message ||
            "Something went wrong, please try again."
        );
      }, 2000);
    }
  };

  const handleDeleteIcon = () => {
    setDel(true);
    setCancel(false);
  };

  const handleCancel = () => {
    setCancel(true);
    setDel(false);
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
      {!error && (
        <section className="project__details h-full md:px-10 px-6 pt-28 pb-5 text-gray-800">
          <Toaster position="top-right" />

          <section className="userInfo__section sm:grid grid-cols-2 justify-between pb-4">
            <div className="self-center hidden sm:block">
              <ProgressBar />
            </div>
            <div className="font-semibold text-lg grid justify-end">
              <p className="pb-3">{aProject?.user?.name}</p>
              <p className="pb-3">{aProject?.user?.email}</p>
              <p className="pb-3">Created: {newDate}</p>
            </div>
            <div className="block sm:hidden w-7/12 pt-6">
              <ProgressBar />
            </div>
          </section>

          <section className="ml-20">
            <div
              className={`deleteText__section fixed top-20 md:left-60 left-8 right-12 translate-y-8 translate-x-2 z-10 p-9 flex justify-center py-3 bg-pink-100 transition-transform ${
                cancel && "hidden"
              } ${del ? "block" : "hidden"}`}
            >
              <div className="lg:flex justify-between">
                <p className="font-semibold text-base pt-2">
                  Are you sure you want to delete this project?
                </p>
                <div>
                  <div className="flex justify-between lg:ml-5 mt-3 lg:mt-0">
                    <button
                      className="font-semibold py-2 px-6 mr-4 text-white rounded bg-blue-300"
                      onClick={() => handleCancel()}
                    >
                      No
                    </button>
                    <button
                      className="font-semibold py-2 px-6 text-white rounded bg-red-500"
                      onClick={() => handleDeleteYes()}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="projectDetails__content h-full pt-0">
            <h3 className="text-center uppercase font-bold text-2xl py-2">
              {aProject?.title}
            </h3>
            <div className="project__display lg:grid grid-cols-2 gap-8 justify-center items-center drop-shadow-xl shadow-lg shadow-pink-100 py-10 lg:py-16 px-5 w-full overflow-y-scroll">
              <div>
                <img
                  src={aProject?.image}
                  alt="project representation"
                  className="w-full h-auto"
                />
              </div>
              <div className="pt-9">
                <p className="py-2">
                  <span className="font-semibold text-lg">Description: </span>
                  {aProject?.desc}
                </p>
                <p className="py-2">
                  <span className="font-semibold text-lg">Website: </span>
                  <a
                    href={aProject?.website}
                    className="text-violet-500 hover:text-pink-400"
                  >
                    {aProject?.website}
                  </a>
                </p>
                <p className="py-2">
                  <span className="font-semibold text-lg">Git Repo: </span>
                  <a
                    href={aProject?.gitRepo}
                    className="text-violet-500 hover:text-pink-400"
                  >
                    {aProject?.gitRepo}
                  </a>
                </p>
                <div className="delete__edit flex justify-end lg:justify-center mt-9 lg:mt-24">
                  <Link
                    to={`/dashboard/update-project/${id}`}
                    className={`${
                      confirmUser
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }`}
                  >
                    <AiFillEdit className="mr-6 h-6 w-6 cursor-pointer hover:text-fuchsia-700" />
                  </Link>
                  <AiTwotoneDelete
                    className={`cursor-pointer h-6 w-6  hover:text-fuchsia-700 ${
                      confirmUser
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }`}
                    onClick={() => handleDeleteIcon()}
                  />
                  {deleteLoading && (
                    <span className="animate-spin rounded-full inline-block border-2 border-violet-700  w-5 ml-4"></span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
