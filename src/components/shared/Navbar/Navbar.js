/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useRootContext } from "../../../hooks/useRootContext";
import { Modal } from "../../global/Modal";
import classes from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useHistory();
  const handleProfileClick = () => {
    console.log("Profile clicked");
  };
  const { photoURL, displayName, email, uid } = useRootContext().user;
  const { units } = useRootContext().userPref;
  const { SignOut, AddDoc, GetDoc } = useRootContext();
  const user = {
    name: displayName,
    email: email,
    imageUrl: photoURL,
  };
  const handleSingOut = () => {
    setIsOpen(true);
  };
  const handleUnitChange = (e) => {
    const unit = e.target.innerText.toLowerCase();
    AddDoc(email, displayName, uid, unit);
  };
  const modalFunc = () => {
    SignOut();
  };
  const navigation = [
    // { name: "Home", to: "/home" },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Explore", to: "/explore" },
  ];
  const navigation_bak = [{ name: "Explore", to: "/explore" }];
  const userNavigation = [
    {
      name: "Your Profile",
      onClick: () => {
        navigate.push("/profile/me");
      },
    },
    {
      name: "Sign out",
      onClick: () => {
        handleSingOut();
      },
    },
  ];
  const Units = [
    {
      name: "Standard",
      // icon: IconOne,
      isSelected: function () {
        return this.name.toLowerCase() === units;
      },
    },
    {
      name: "Metric",
      // icon: IconTwo,
      isSelected: function () {
        return this.name.toLowerCase() === units;
      },
    },
    {
      name: "Imperial",
      // icon: IconThree,
      isSelected: function () {
        return this.name.toLowerCase() === units;
      },
    },
  ];
  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="Yes, sign out!"
        description="You will be signed out from shajin."
        title="Are you sure?"
        isDanger={true}
        modalFunc={modalFunc}
      ></Modal>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-black">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link
                        to="/"
                        className="font-bold text-white text-lg select-none"
                      >
                        shajin.
                      </Link>
                    </div>
                    <div className="hidden lg:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {email
                          ? navigation.map((item) => (
                              <NavLink
                                exact
                                key={item.name}
                                to={item.to}
                                className={classes.usualStyle}
                                activeClassName={classes.activeStyle}
                              >
                                {item.name}
                              </NavLink>
                            ))
                          : navigation_bak.map((item) => (
                              <NavLink
                                exact
                                key={item.name}
                                to={item.to}
                                className={classes.usualStyle}
                                activeClassName={classes.activeStyle}
                              >
                                {item.name}
                              </NavLink>
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    {email ? (
                      <div className="ml-4 flex items-center space-x-10">
                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                          <div>
                            <div className="flex gap-x-3 justify-center items-center ">
                              <Menu.Button
                                onClick={handleProfileClick}
                                className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm outline-none ring-2 ring-offset-2 ring-offset-gray-800 ring-white"
                              >
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-7 w-7 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                              <p className="text-gray-200 text-sm font-medium">
                                {user?.name?.split(" ")[0]}
                              </p>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <Menu.Item>
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-800 hover:bg-gray-300 w-full text-left"
                                    onClick={userNavigation[0].onClick}
                                  >
                                    {userNavigation[0].name}
                                  </button>
                                </Menu.Item>
                                <Menu.Item className="block text-sm text-gray-700 hover:text-gray-800 hover:bg-gray-300 w-full text-left">
                                  <Popover className="relative">
                                    {({ open }) => (
                                      <>
                                        <Popover.Button
                                          className={`
                ${
                  open ? "" : "text-opacity-90"
                } group w-full inline-flex items-center px-4 py-2`}
                                        >
                                          <span>Units</span>
                                          <ChevronDownIcon
                                            className={`${
                                              open ? "" : "text-opacity-70"
                                            }
                  h-4 w-4 ml-1`}
                                            aria-hidden="true"
                                          />
                                        </Popover.Button>
                                        <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-200"
                                          enterFrom="opacity-0 translate-y-1"
                                          enterTo="opacity-100 translate-y-0"
                                          leave="transition ease-in duration-150"
                                          leaveFrom="opacity-100 translate-y-0"
                                          leaveTo="opacity-0 translate-y-1"
                                        >
                                          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-96 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1 xl:grid-cols-2">
                                                {Units.map((item) => (
                                                  <button
                                                    onClick={
                                                      !item.isSelected()
                                                        ? handleUnitChange
                                                        : null
                                                    }
                                                    key={item.name}
                                                    className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200
                                                    ${
                                                      item.isSelected()
                                                        ? "bg-gray-200"
                                                        : null
                                                    }
                                                    `}
                                                  >
                                                    <div
                                                      className={`flex h-4 w-4 shrink-0 items-center justify-center sm:h-5 sm:w-5`}
                                                    >
                                                      {item.isSelected() ? (
                                                        <CheckCircleIcon></CheckCircleIcon>
                                                      ) : null}
                                                    </div>
                                                    <div className="ml-4">
                                                      <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                      </p>
                                                    </div>
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                          </Popover.Panel>
                                        </Transition>
                                      </>
                                    )}
                                  </Popover>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </div>
                        </Menu>
                        <button
                          onClick={userNavigation[1].onClick}
                          className="text-gray-200 font-medium text-xs py-2 px-4 border border-white rounded hover:border-gray-400 duration-200"
                        >
                          {userNavigation[1].name}
                        </button>
                      </div>
                    ) : (
                      <div className="space-x-8">
                        <button
                          onClick={() => navigate.push("/login")}
                          className="text-white tracking-tight text-sm font-semibold hover:text-green-400"
                        >
                          Log in
                        </button>
                        <button
                          onClick={() => navigate.push("/register")}
                          className="text-white tracking-tight text-sm font-semibold hover:text-green-400"
                        >
                          Sign up
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="lg:hidden -mr-2 flex items-center space-x-6">
                    {email ? (
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={`
                ${
                  open ? "" : "text-opacity-90"
                } group w-full inline-flex items-center text-gray-200 font-medium text-xs py-2 px-4 border border-white rounded hover:border-gray-400 duration-200`}
                            >
                              <span>Units</span>
                              <ChevronDownIcon
                                className={`${open ? "" : "text-opacity-70"}
                  h-4 w-4 ml-1`}
                                aria-hidden="true"
                              />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-64 sm:w-72 -translate-x-1/2 transform px-4 sm:px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1 xl:grid-cols-2">
                                    {Units.map((item) => (
                                      <button
                                        onClick={
                                          !item.isSelected()
                                            ? handleUnitChange
                                            : null
                                        }
                                        key={item.name}
                                        className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200
                                                    ${
                                                      item.isSelected()
                                                        ? "bg-gray-200"
                                                        : null
                                                    }
                                                    `}
                                      >
                                        <div
                                          className={`flex h-4 w-4 shrink-0 items-center justify-center sm:h-5 sm:w-5`}
                                        >
                                          {item.isSelected() ? (
                                            <CheckCircleIcon></CheckCircleIcon>
                                          ) : null}
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-medium text-gray-900">
                                            {item.name}
                                          </p>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ) : null}

                    <div className="inline-flex">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {email
                    ? navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          exact
                          className={classes.m_usualStyle}
                          activeClassName={classes.m_activeStyle}
                        >
                          {item.name}
                        </NavLink>
                      ))
                    : navigation_bak.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          exact
                          className={classes.m_usualStyle}
                          activeClassName={classes.m_activeStyle}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  {email && (
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            user.imageUrl ||
                            "https://i.ibb.co/pnT0NpF/default-avatar.jpg"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-3 px-2 space-y-1">
                    {email ? (
                      userNavigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={item.onClick}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          {item.name}
                        </button>
                      ))
                    ) : (
                      <div className="-mt-2 mb-2">
                        <button
                          onClick={() => navigate.push("/login")}
                          className="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold tracking-tight text-white hover:text-green-400"
                        >
                          Log in
                        </button>
                        <button
                          onClick={() => navigate.push("/register")}
                          className="block w-full text-left px-3 py-2 rounded-md text-sm font-semibold tracking-tight text-white hover:text-green-400"
                        >
                          Sign up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </Fragment>
  );
}
