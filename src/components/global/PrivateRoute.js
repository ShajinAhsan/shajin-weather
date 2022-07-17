import React from "react";
import { Redirect, Route } from "react-router";
import { useRootContext } from "../../hooks/useRootContext";
import { Bounce } from "./Bounce";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useRootContext();
  if (isLoading) {
    return <Bounce className={"text-center min-h-screen"}></Bounce>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
