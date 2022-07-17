import { XIcon } from "@heroicons/react/solid";
import React, { Fragment, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { useRootContext } from "../../../hooks/useRootContext";
import { Divider } from "../../global/Divider";

const Register = () => {
  const { email } = useRootContext().user;
  let userName = useRef("");
  let userEmail = useRef("");
  let userEmailConfirm = useRef("");
  let userPass = useRef("");
  const { SignInWithGoogle, CreateUserWithEmailAndPassword, error, setError } =
    useRootContext();
  if (email) {
    return <Redirect to="/" />;
  }
  const handleRegister = (e) => {
    userEmail = userEmail?.current.value;
    userEmailConfirm = userEmailConfirm?.current.value;
    userPass = userPass?.current.value;
    userName = userName?.current.value;
    if (userEmail !== userEmailConfirm) {
      setError({
        code: "user/email-does-not-match",
        message: "Email does not match",
      });
      //   return;
    } else {
      CreateUserWithEmailAndPassword(userEmail, userPass, userName);
      setError({});
    }
    e.preventDefault();
  };
  return (
    <Fragment>
      <div className="bg-black text-white text-center py-6">
        <Link to="/home" className="text-4xl font-bold">
          shajin<span className="text-indigo-500">.</span>
        </Link>
      </div>
      {error?.code && (
        <div className="fixed top-5 left-2 lg:left-auto lg:top-auto lg:right-5 bg-red-400 my-4 py-2 px-4 rounded z-20">
          <XIcon
            onClick={() => setError({})}
            className="cursor-pointer w-5 absolute -top-2.5 -right-2.5 bg- rounded-full bg-red-600 text-white box-border p-0.5"
          ></XIcon>
          <code className="text-sm">
            Error:{" "}
            {error?.code
              ?.split("/")[1]
              ?.split("-")
              ?.join(" ")
              ?.replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase())}
          </code>
        </div>
      )}

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-black font-bold">
              To continue, Sign up to shajin.
            </h2>
          </div>
          <div className="text-center">
            <button
              onClick={SignInWithGoogle}
              className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black duration-150 hover:bg-gray-800"
            >
              <p className="navbar__before">Continue with Google</p>
            </button>
          </div>
          <Divider className="divider__content text-sm">OR</Divider>
          <h2 className="text-center font-semibold">
            Sign up with your email address
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative pb-4">
                <label
                  htmlFor="email"
                  className="leading-7 font-normal text-sm text-gray-600"
                >
                  What's your email?
                </label>
                <input
                  required
                  ref={userEmail}
                  placeholder="Enter your email."
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative pb-4">
                <label className="leading-7 font-normal text-sm text-gray-600">
                  Confirm your email
                </label>
                <input
                  required
                  ref={userEmailConfirm}
                  placeholder="Enter your email again."
                  type="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative pb-4">
                <label
                  htmlFor="password"
                  className="leading-7 font-normal text-sm text-gray-600"
                >
                  Create a password
                </label>
                <input
                  ref={userPass}
                  required
                  type="password"
                  placeholder="Create a password."
                  id="password"
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative pb-4">
                <label
                  htmlFor="username"
                  className="leading-7 font-normal text-sm text-gray-600"
                >
                  What should we call you?
                </label>
                <input
                  required
                  ref={userName}
                  placeholder="Enter a profile name."
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black duration-150 hover:bg-gray-800"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="border-b border-gray-400"></div>
          <div className="text-center">
            <h1 className="text-black">Have an account?</h1>
            <Link
              to="/login"
              className="mt-5 py-2 block rounded-lg font-normal border-2 border-black text-sm hover:text-white hover:bg-black duration-150"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
