import { XIcon } from "@heroicons/react/solid";
import React, { Fragment, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRootContext } from "../../../hooks/useRootContext";
import { Divider } from "../../global/Divider";

const Login = () => {
  const { email } = useRootContext().user;
  const navigate = useHistory();
  const location = useLocation();
  let userEmail = useRef("");
  let userPass = useRef("");
  const redirect_url = location.state?.from;
  const { SignInWithGoogle, SignInWithEmailAndPassword, error, setError } =
    useRootContext();

  const handleGoogleSignIn = () => {
    SignInWithGoogle();
    navigate.push(redirect_url);
  };
  const handleLoginWithEmailAndPassword = (e) => {
    userEmail = userEmail.current?.value;
    userPass = userPass.current?.value;
    SignInWithEmailAndPassword(userEmail, userPass);
    navigate.push(redirect_url);
    e.preventDefault();
  };
  if (email) {
    navigate.push("/dashboard");
  }
  return (
    <Fragment>
      <div className="bg-black text-white text-center py-6">
        <Link to="/home" className="text-4xl font-bold">
          shajin<span className="text-indigo-500">.</span>
        </Link>
      </div>
      {error?.code && (
        <div className="fixed top-5 left-2 lg:left-auto lg:top-auto lg:right-5 bg-red-400 my-4 py-2 px-4 rounded">
          <XIcon
            onClick={() => setError("")}
            className="cursor-pointer w-5 absolute -top-2.5 -right-2.5 bg- rounded-full bg-red-600 text-white box-border p-0.5"
          ></XIcon>
          <code className="text-sm">
            Error:{" "}
            {error?.code
              ?.split("/")[1]
              .split("-")
              .join(" ")
              .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase())}
          </code>
        </div>
      )}

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-black font-bold">
              To continue, log in to shajin.
            </h2>
          </div>
          <div className="text-center">
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black duration-150 hover:bg-gray-800"
            >
              <p className="navbar__before">Continue with Google</p>
            </button>
          </div>
          <Divider className="divider__content text-sm">OR</Divider>
          <h2 className="text-center font-semibold">
            Sign in with your email address
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleLoginWithEmailAndPassword}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 font-normal text-sm text-gray-600"
                >
                  Email address or username
                </label>
                <input
                  required
                  ref={userEmail}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 font-normal text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  ref={userPass}
                  required
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/login/recovery"
                  className="font-medium text-gray-600 hover:text-gray-800"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black duration-150 hover:bg-gray-800"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="border-b border-gray-400"></div>
          <div className="text-center">
            <h1 className="text-black">Don't have an account?</h1>
            <Link
              to="/register"
              className="mt-5 py-2 block rounded-lg font-normal border-2 border-black text-sm hover:text-white hover:bg-black duration-150"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
