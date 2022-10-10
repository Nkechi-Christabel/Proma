import React, { useState } from "react";
// import { useFormik } from "formik";
import { Formik } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { projectUpload } from "../../../redux/actions/projectActions";
import { useDispatch } from "react-redux";
import { serialize } from "object-to-formdata";
import * as yup from "yup";
import toast from "react-hot-toast";

export interface FormValuesProject {
  title: string;
  image: string;
  website: string;
  gitRepo: string;
  desc: string;
  status: {
    isInitiating: boolean;
    isExecuting: boolean;
    isComplete: boolean;
    isHosted: boolean;
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
  const navigate = useNavigate();
  const [picture, setPicture] = useState<any>("");

  const removeImage = () => setPicture("");

  const reviewSchema = yup.object({
    title: yup
      .string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("A project name is required"),
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
      .max(80, "Too Long!")
      .required("A repo link is required"),
    desc: yup
      .string()
      .min(2, "Too Short!")
      .max(200, "Too Long!")
      .required("A desciption is required"),
    status: yup
      .object({
        isInitiating: yup
          .boolean()
          .oneOf([true], "One of these, Initiating should be checked"),
        isExecuting: yup.boolean(),
        isComplete: yup.boolean(),
        isHosted: yup.boolean(),
      })
      .test(
        "OK",
        "Atleast one of these must be selected",
        (val) =>
          (val.isInitiating ||
            val.isExecuting ||
            val.isComplete ||
            val.isHosted) as boolean
      ),
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

    const formData = serialize(values);

    // Get a response from the api call
    const res = await dispatch(projectUpload(formData));

    // Display a message according to the response status
    if (res.status === 201) {
      setTimeout(() => {
        setStatus("success");
        toast.success("Project successfully created!");

        setTimeout(() => {
          navigate("/dashboard/profile-project");
        }, 2000);
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
    setPicture("");
  };

  //Changes the text in the register button depending on the status
  const renderSubmitText = (): string => {
    if (status === "idle" || status === "error") {
      return "Create";
    } else if (status === "success") {
      return "Project created!";
    } else if (status === "loading") {
      return "Creating...";
    }
    setStatus("idle");

    return status;
  };

  return (
    <section className="create__project px-4 pt-28 h-full">
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          handleSubmit(values);
        }}
      >
        {(props) => (
          <div className="h-full md:flex justify-center items-center pt-2">
            <form
              onSubmit={props.handleSubmit}
              encType="multipart/form-data"
              // onReset={props.handleReset}
              className="bg-fuchsia-100 p-6 rounded drop-shadow-sm overflow-y-scroll"
            >
              <div>
                <div className="upload_wrapper">
                  <span className="addArtwork font-semibold">
                    Upload images of your work
                  </span>
                  <label title="Upload File" htmlFor="fileUpload">
                    <div className="flex justify-center border-slate-400 shadow-lg drop-shadow-lg cursor-pointer py-3 mb-5 mt-3">
                      {" "}
                      <BsCloudUpload className="w-2/12 h-2/6 " />
                    </div>
                  </label>
                  <input
                    className="hidden"
                    id="fileUpload"
                    name="image"
                    type="file"
                    accept="image/*"
                    onBlur={props.handleBlur}
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
                  {picture !== "" && (
                    <div className="flex flex-col phone:w-44 mb-4 drop-shadow">
                      <img
                        className="w-full h-44 object-cover"
                        src={URL.createObjectURL(picture)}
                        alt="Project file upload"
                      />
                      <button
                        className="mt-4 py-2 px-6  w-full text-white font-semibold bg-purple-600 hover:bg-fuchsia-700 rounded"
                        onClick={() => removeImage()}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {props.errors.image && props.touched.image ? (
                    <div className="text-red-400 text-sm px-2">
                      {props.errors.image}
                    </div>
                  ) : null}
                </div>
                <div className="inputText_wrapper md:grid grid-cols-2 gap-y-6 gap-x-8 justify-between">
                  <div>
                    <label className="font-semibold">Project name</label>
                    <input
                      type="text"
                      name="title"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.title}
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    />
                    {props.errors.title && props.touched.title ? (
                      <div className="text-red-400 text-sm px-2">
                        {props.errors.title}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-semibold">Website link</label>
                    <input
                      type="text"
                      name="website"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.website}
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    />
                    {props.errors.website && props.touched.website ? (
                      <div className="text-red-400 text-sm px-2">
                        {props.errors.website}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-semibold">Git repo</label>
                    <input
                      type="text"
                      name="gitRepo"
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.gitRepo}
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    />
                    {props.errors.gitRepo && props.touched.gitRepo ? (
                      <div className="text-red-400 text-sm px-2">
                        {props.errors.gitRepo}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-semibold">Desciption</label>
                    <textarea
                      name="desc"
                      // id="desc"
                      cols={30}
                      rows={10}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                      value={props.values.desc}
                      placeholder="Write a brief desciption"
                      className="w-full py-2 px-2 mt-1 mb-3 outline-none shadow-sm rounded"
                    ></textarea>
                    {props.errors.desc && props.touched.desc ? (
                      <div className="text-red-400 text-sm px-2">
                        {props.errors.desc}
                      </div>
                    ) : null}
                  </div>
                  <div className="checkbox_wrapper">
                    <h4 className="font-semibold mb-2">
                      Choose your project stage
                    </h4>
                    {props.errors.status?.isInitiating &&
                    props.touched.status?.isInitiating ? (
                      <div className="text-red-400 text-sm px-2">
                        {props.errors.status.isInitiating}
                      </div>
                    ) : null}
                    <div className="grid xl:grid-cols-4 sm:grid-cols-2">
                      <div className="md:pr-3 mb-2">
                        <input
                          type="checkbox"
                          name="status.isInitiating"
                          checked={props.values.status.isInitiating}
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                          className="mr-1"
                        />
                        <label htmlFor="isInitiating" className="">
                          Initiating
                        </label>
                      </div>
                      <div className="md:pr-2 mb-2">
                        {" "}
                        {props.errors.status?.isExecuting &&
                        props.touched.status?.isExecuting ? (
                          <div className="text-red-400 text-sm px-2">
                            {props.errors.status.isExecuting}
                          </div>
                        ) : null}
                        <input
                          type="checkbox"
                          name="status.isExecuting"
                          checked={props.values.status.isExecuting}
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                          className="mr-1"
                        />
                        <label htmlFor="isExecuting" className="">
                          Executing
                        </label>
                      </div>
                      <div className="md:pr-3 mb-2">
                        {props.errors.status?.isComplete &&
                        props.touched.status?.isComplete ? (
                          <div className="text-red-400 text-sm px-2">
                            {props.errors.status.isComplete}
                          </div>
                        ) : null}
                        <input
                          type="checkbox"
                          // id="isComplete"
                          name="status.isComplete"
                          checked={props.values.status.isComplete}
                          onChange={props.handleChange}
                          className="mr-1"
                        />
                        <label htmlFor="isComplete" className="">
                          Completed
                        </label>
                      </div>
                      <div>
                        {props.errors.status?.isHosted &&
                        props.touched.status?.isHosted ? (
                          <div className="text-red-400 text-sm px-2">
                            {props.errors.status.isHosted}
                          </div>
                        ) : null}
                        <input
                          type="checkbox"
                          // id="isHosted"
                          name="status.isHosted"
                          checked={props.values.status.isHosted}
                          onChange={props.handleChange}
                          className="mb-2 mr-1"
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
                    className="py-2 px-6 my-5 text-white font-semibold bg-purple-500 hover:bg-fuchsia-700 rounded"
                  >
                    {status === "loading" && (
                      <span className="animate-spin rounded-full inline-block border-2 border-zinc-300 w-5 mr-2"></span>
                    )}
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
