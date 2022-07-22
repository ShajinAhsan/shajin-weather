import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/global/PrivateRoute";
import Dashboard from "../components/pages/Dashboard/Dashboard";
// import Dashboard from "../components/pages/Dashboard/Dashboard";
import Error from "../components/pages/Error/Error";
// import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Login/Login";
import Profile from "../components/pages/Profile/Profile";
import Recovery from "../components/pages/Recovery/Recovery";
import Register from "../components/pages/Register/Register";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const DefaultRoutes = () => {
  return (
    <Fragment>
      {" "}
      {/* Fragment is a component that allows us to render multiple components without a wrapper */}
      <Navbar /> {/* This is the navbar component */}
      <Switch>
        {" "}
        {/* Switch is a component that allows us to render multiple components without a wrapper */}
        <Route
          exact
          path={["/", "/home", "/dashboard"]}
          component={Dashboard}
        ></Route>{" "}
        {/* This is the home component */}
        {/* <PrivateRoute path="/purchase/:id"> </PrivateRoute> */}
        <PrivateRoute path="/profile/me">
          {" "}
          {/* This is the profile component */}
          <Profile></Profile>
        </PrivateRoute>
        <Route component={Error} path="*"></Route>{" "}
        {/* This is the error component */}
      </Switch>
      <Footer /> {/* This is the footer component */}
    </Fragment>
  );
};
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {" "}
        {/* Switch is a component that allows us to render multiple components without a wrapper */}
        <Route path="/login/recovery" component={Recovery}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route component={DefaultRoutes} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
