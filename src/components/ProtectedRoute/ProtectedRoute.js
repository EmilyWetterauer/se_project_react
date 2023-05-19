import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, path, ...props }) {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/Main");
    }
  }, [isLoggedIn, history]);

  return (
    <Route path={path}>{isLoggedIn ? children : <Redirect to="/Main" />}</Route>
  );
}

export default ProtectedRoute;
