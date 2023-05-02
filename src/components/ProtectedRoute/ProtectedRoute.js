import React from "react";
import { Route, Redirect } from "react-router-dom";

// import Profile from "../Profile/Profile";

function ProtectedRoute({ children, isLoggedIn, path, ...props }) {
  return (
    <Route path={path}>{isLoggedIn ? children : <Redirect to="/Main" />}</Route>
  );
}

export default ProtectedRoute;
