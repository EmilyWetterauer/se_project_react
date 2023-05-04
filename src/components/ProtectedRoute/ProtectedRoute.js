import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

// import Profile from "../Profile/Profile";

function ProtectedRoute({ children, isLoggedIn, path, ...props }) {
  const history = useHistory();
  if (!isLoggedIn) {
    history.push("/Main");
  }
  return (
    <Route path={path}>{isLoggedIn ? children : <Redirect to="/Main" />}</Route>
  );
}

export default ProtectedRoute;
