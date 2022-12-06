import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Tilt from "react-parallax-tilt";
import Logo from "../assets/logo.png";
import { login } from "../redux/actions/userActions";

export interface FormValuesLogin {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("idle");

  // form validation
  const reviewSchema = yup.object({
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
  const initialValues: FormValuesLogin = {
    email: "",
    password: "",
  };
  //This is invoked when the form is submitted
  const handleSubmit = async (values: FormValuesLogin) => {
    setStatus("loading");

    //Get a response from the api call
    const res = await dispatch(login(values));

    //Display a message according to the response status
    if (res.data?.token) {
      setTimeout(() => {
        setStatus("success");
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }, 2000);
    } else {
      setStatus("error");
      setTimeout(() => {
        toast.error(
          res.response?.data?.message ||
            res.response?.data?.msg ||
            res.message ||
            "Something went wrong, please try again."
        );
      }, 2000);
    }
  };

  // useEffect(() => {
  //   dispatch(getUser());
  // }, [dispatch]);

  //Changes the text in the register button depending on the status
  const renderSubmitText = (): string => {
    if (status === "idle" || status === "error") {
      return "Log in";
    } else if (status === "success") {
      return "Logged in!";
    } else if (status === "loading") {
      return "Log in...";
    }
    return status;
  };

  return (
    <div className="h-screen p-3">
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
          <div className="px-12 mt-20">
            <h2 className="font-semibold text-2xl text-gray-700">
              Login to Your Account
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={reviewSchema}
              onSubmit={(values, actions) => {
                // actions.resetForm();
                handleSubmit(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="Email"
                      className=" border-b border-zinc-400 outline-none w-full py-3 px-2 mb-2 mt-5"
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
                      className="border-b border-zinc-400 outline-none w-full py-3 px-2 my-2"
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
                    className={`text-center bg-fuchsia-900 text-white w-full rounded mt-10 mb-8 py-3 px-7  ${
                      status === "loading" && "bg-opacity-70"
                    }`}
                  >
                    {renderSubmitText()}
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-gray-600">
              Don't have an account?
              <Link to="/signup">
                <span className="inline-block ml-2 text-red-400 border-b border-red-400 hover:text-fuchsia-700 hover:border-fuchsia-700">
                  Signup for free
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

export default Login;
