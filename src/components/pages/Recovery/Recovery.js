import { XIcon } from "@heroicons/react/solid";
import React, { Fragment, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRootContext } from "../../../hooks/useRootContext";

const Recovery = () => {
  let userEmail = useRef("");
  const navigate = useHistory();
  const { SendPasswordRecoveryEmail, success, setSuccess } = useRootContext();
  const handlePasswordRecovery = (e) => {
    userEmail = userEmail.current.value;
    e.preventDefault();
    SendPasswordRecoveryEmail(userEmail);
    navigate.push("/login");
  };
  return (
    <Fragment>
      <div className="bg-black text-white text-center py-6">
        <Link to="/home" className="text-4xl font-bold">
          shajin<span className="text-indigo-500">.</span>
        </Link>
      </div>
      {success && (
        <div className="fixed top-5 left-2 lg:top-auto lg:left-5 bg-green-400 my-4 py-2 px-4 rounded z-20">
          <XIcon
            onClick={() => setSuccess("")}
            className="cursor-pointer w-5 absolute -top-2.5 -right-2.5 bg- rounded-full bg-red-600 text-white box-border p-0.5"
          ></XIcon>
          <code className="text-sm">Success: {success}</code>
        </div>
      )}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form className="mt-8 space-y-6" onSubmit={handlePasswordRecovery}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 font-normal text-sm text-gray-600"
              >
                What's your email?
              </label>
              <input
                required
                ref={userEmail}
                placeholder="Enter a email."
                disabled={!!success}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={!!success}
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black duration-150 hover:bg-gray-800"
              >
                Send password recovery email
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Recovery;
