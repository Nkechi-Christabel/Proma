import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Tilt from "react-parallax-tilt";
import Logo from "../assets/logo.png";
// import { InitialState } from "../redux/store";
// import { Dispatch } from "redux";

import { signup } from "../redux/actions/userActions";

export interface FormValuesSignup {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC<{}> = () => {
  const dispatch = useDispatch<any>();

  const [status, setStatus] = useState<string>("idle");
  // const error = useSelector((state: InitialState) => state.userInfo.error);

  // form validation
  const reviewSchema = yup.object({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 characters or longer"),
  });

  //Initial value before form is submitted
  const initialValues: FormValuesSignup = {
    name: "",
    email: "",
    password: "",
  };
  //This is invoked when the form is submitted
  const handleSubmit = async (values: FormValuesSignup) => {
    setStatus("loading");

    //Payload Schema
    // const userDetails = {
    //   name,
    //   email,
    //   password,
    // };

    //Get a response from the api call
    const res = await dispatch(signup(values));

    //Display a message according to the response status
    if (res?.status === 201) {
      setTimeout(() => {
        setStatus("success");
        toast.success("User successfully registered!");

        setTimeout(() => {
          redirect("/dashboard");
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

  // useEffect(() => {
  //   dispatch(clearError());
  // }, [dispatch]);

  //Changes the text in the register button depending on the status
  const renderSubmitText = (): string => {
    if (status === "idle" || status === "error") {
      return "Create account";
    } else if (status === "success") {
      return "Account created!";
    } else if (status === "loading") {
      return "Creating...";
    }
    return status;
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full shadow-violet-200 drop-shadow-md mx-3">
        <section className="form__section bg-white py-3 md:rounded-l-md max-w-lg w-full">
          <div>
            <Link to="/">
              <img src={Logo} alt="logo" className="w-10 inline-block" />
              <span className="inline-block align-middle font-semibold text-stone-700 mt-1">
                Proma
              </span>
            </Link>
          </div>

          <Toaster position="top-right" />
          <div className="px-12 mt-16">
            <h2 className="font-semibold text-2xl text-gray-700">
              Create an account
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                actions.resetForm();
                handleSubmit(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      type="name"
                      name="name"
                      autoComplete="off"
                      placeholder="Name"
                      className="border-b border-gray-200 outline-none w-full py-3 px-2 mb-2 mt-5"
                    />

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-400 text-sm px-2"
                    />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="Email"
                      className=" border-b border-gray-200 outline-none w-full py-3 px-2 my-2"
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 text-sm px-2"
                    />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      autoComplete="off"
                      placeholder="Password"
                      className="border-b border-gray-200 outline-none w-full py-3 px-2 my-2"
                    />

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 text-sm px-2"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`text-center bg-fuchsia-900 text-white w-full rounded mt-7 mb-8 py-3 px-7  ${
                      status === "loading" && "bg-opacity-70"
                    }`}
                  >
                    {renderSubmitText()}
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-gray-600">
              Already have an account?
              <Link to="/login">
                <span className="inline-block ml-2 text-red-400 border-b border-red-400 hover:text-fuchsia-700 hover:border-fuchsia-700">
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </section>
        <section className="img__section hidden md:block max-w-lg w-full">
          <div className="bg-fuchsia-100 rounded-r-md px-4 w-full">
            <Tilt>
              <div></div>
            </Tilt>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
