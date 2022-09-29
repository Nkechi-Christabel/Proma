import React, { useState } from "react";
// import { useFormik } from "formik";
import { Formik } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import * as yup from "yup";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import { projectUpload } from "../../../redux/actions/projectActions";
import { useDispatch } from "react-redux";

export interface FormValuesProject {
  title: string;
  image: string;
  website?: string;
  gitRepo: string;
  desc: string;
  status: {
    isInitiating?: boolean;
    isExecuting?: boolean;
    isComplete?: boolean;
    isHosted?: boolean;
  };
}

const CreateProject: React.FC<{}> = () => {
  const [status, setStatus] = useState<string>("idle");
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const dispatch = useDispatch<any>();
  const [picture, setPicture] = useState<any>("");

  const removeImage = () => setPicture("");

  const reviewSchema = yup.object({
    title: yup
      .string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Title is required"),
    image: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    website: yup.string(),
    gitRepo: yup
      .string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("A repo link is required"),
    desc: yup
      .string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("A desciption is required"),
  });

  const initialValues: FormValuesProject = {
    title: "",
    image: "",
    website: "",
    gitRepo: "",
    desc: "",
    status: {
      isInitiating: false,
      isExecuting: false,
      isComplete: false,
      isHosted: false,
    },
  };

  //This is invoked when the form is submitted
  const handleSubmit = async (values: FormValuesProject) => {
    setStatus("loading");

    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    // Get a response from the api call
    const res = await dispatch(projectUpload(formData));

    // Display a message according to the response status
    if (res.status === 201) {
      setTimeout(() => {
        setStatus("success");
        toast.success("User successfully registered!");

        setTimeout(() => {
          redirect("/dashboard/profile-project");
        }, 3000);
      }, 2000);
    } else {
      setStatus("error");
      setTimeout(() => {
        toast.error(
          res.response?.data.message ||
            "Something went wrong, please try again."
        );
      }, 2000);
    }
  };
  console.log(picture.length && URL.createObjectURL(picture.name));
  //Changes the text in the register button depending on the status
  const renderSubmitText = (): string => {
    if (status === "idle" || status === "error") {
      return "Create";
    } else if (status === "success") {
      return "Project created!";
    } else if (status === "loading") {
      return "Creating...";
    }
    return status;
  };

  return (
    <section className="md:flex justify-center items-center create__project pt-28 px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          handleSubmit(values);
        }}
      >
        {(props) => (
          <div className=" h-full">
            <form
              onSubmit={props.handleSubmit}
              encType="multipart/form-data"
              onReset={props.handleReset}
              className="bg-fuchsia-100 p-6 rounded drop-shadow-sm overflow-y-scroll"
            >
              <div>
                <div className="upload_wrapper">
                  <label title="Upload File" htmlFor="image">
                    <span className="addArtwork font-semibold">
                      Upload images of your work
                    </span>
                    <div className="flex justify-center border-slate-400 shadow-lg drop-shadow-lg cursor-pointer py-3 mb-5 mt-3">
                      {" "}
                      <BsCloudUpload className="w-2/12 h-2/6 " />
                    </div>
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setPicture(
                        e.currentTarget.files && e.currentTarget.files[0]
                      );
                      return (
                        e.currentTarget.files &&
                        props.setFieldValue("image", e.currentTarget.files[0])
                      );
                    }}
                  />
                  <div className="Upload__box">
                    <img
                      className="Upload__image"
                      src={picture.length && URL.createObjectURL(picture.name)}
                      alt="Project file upload"
                    />
                    <button
                      className="btn upload btn-sm mt-4"
                      onClick={() => removeImage()}
                    >
                      Remove
                    </button>
                  </div>
                  {props.errors.image && props.touched.image ? (
                    <div>{props.errors.image}</div>
                  ) : null}
                </div>
                <div className="inputText_wrapper md:grid grid-cols-2 gap-y-6 gap-x-8 justify-between">
                  <div>
                    <label className="font-semibold">Project name</label>
                    <input
                      type="text"
                      name="title"
                      onChange={props.handleChange}
                      value={props.values.title}
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Website link</label>
                    <input
                      type="text"
                      name="website"
                      onChange={props.handleChange}
                      value={props.values.website}
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    />
                    {props.errors.website && props.touched.website ? (
                      <div>{props.errors.website}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-semibold">Git repo</label>
                    <input
                      type="text"
                      name="gitRepo"
                      onChange={props.handleChange}
                      value={props.values.gitRepo}
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    />
                    {props.errors.gitRepo && props.touched.gitRepo ? (
                      <div>{props.errors.gitRepo}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-semibold">Desciption</label>
                    <textarea
                      name="desc"
                      // id="desc"
                      cols={30}
                      rows={10}
                      onChange={props.handleChange}
                      value={props.values.desc}
                      placeholder="Write a brief desciption"
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    ></textarea>
                    {props.errors.desc && props.touched.desc ? (
                      <div>{props.errors.desc}</div>
                    ) : null}
                  </div>
                  <div className="checkbox_wrapper">
                    <h4 className="font-semibold mb-2">
                      Choose your project stage
                    </h4>
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2">
                      <div>
                        <input
                          type="checkbox"
                          // id="isInitiating"
                          name="status.isInitiating"
                          checked={props.values.status.isInitiating}
                          onChange={props.handleChange}
                          className="md:mr-1 mb-2"
                        />
                        <label htmlFor="isnitiating" className="">
                          Initiating
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          // id="isExecuting"
                          name="status.isExecuting"
                          checked={props.values.status.isExecuting}
                          onChange={props.handleChange}
                          className="md:mr-1 md:ml-2 mb-2"
                        />
                        <label htmlFor="isExecuting" className="">
                          Executing
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          // id="isComplete"
                          name="status.isComplete"
                          checked={props.values.status.isComplete}
                          onChange={props.handleChange}
                          className="md:mr-1 md:ml-3 mb-2"
                        />
                        <label htmlFor="isComplete" className="">
                          Completed
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          // id="isHosted"
                          name="status.isHosted"
                          checked={props.values.status.isHosted}
                          onChange={props.handleChange}
                          className="md:mr-1 md:ml-3 mb-2"
                        />
                        <label htmlFor="isHosted" className="">
                          Hosted
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`py-2 px-4 my-5 text-white font-semibold bg-purple-500 hover:bg-fuchsia-700 rounded ${
                      status === "loading" && "animate-spin"
                    }`}
                  >
                    {renderSubmitText()}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </section>
  );
};

export default CreateProject;
