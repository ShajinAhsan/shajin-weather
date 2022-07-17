import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-12 sm:pt-20 md:pt-24 xl:pt-32 sm:pb-20 relative">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto divide-y divide-gray-700 px-4 sm:px-6 md:px-8">
        <ul className="text-sm font-medium pb-14 sm:pb-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
          <li className="space-y-5 row-span-2">
            <h2 className="text-xs font-semibold tracking-wide text-gray-200 uppercase">
              Getting started
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  className="hover:text-gray-200 transition-colors duration-200"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-200 transition-colors duration-200"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-200 transition-colors duration-200"
                  to="/explore"
                >
                  Explore
                </Link>
              </li>
            </ul>
          </li>
          <li className="space-y-5">
            <h2 className="text-xs font-semibold tracking-wide text-gray-200 uppercase">
              About me
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  className="hover:text-gray-200 transition-colors duration-200"
                  href="https://github.com/shajinahsan"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200 transition-colors duration-200"
                  href="https://facebook.com/shajinahsans"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200 transition-colors duration-200"
                  href="https://twitter.com/shajinahsan"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200 transition-colors duration-200"
                  href="https://www.instagram.com/shajinahsan"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="pt-10 sm:pt-12">
          <div className="relative group inline-block">
            <div
              className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000
          group-hover:duration-200 animate-tilt"
            ></div>
            <div className="relative bg-black rounded-lg leading-none flex items-center px-7 py-4 divide-x divide-gray-600">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-pink-600 -rotate-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-gray-100 group-hover:text-gray-100 transition duration-200 font-bold text-2xl pr-6">
                  shajinahsan
                </span>
              </span>
              <a
                href="https://github.com/shajinahsan"
                target={"_blank"}
                rel="noreferrer"
                className="pl-6 font-medium text-indigo-400 inline-flex"
              >
                Follow{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="right-4 hidden md:block text-xs tracking-tight text-gray-500 bottom-2 absolute">
        An educational purpose project by{" "}
        <a className="font-bold" href="https://github.com/shajinahsan">
          shajinahsan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
