import React from "react";
import Loader from "../loader/Loader";

function ProtectedRoute({ component: Component, ...props }) {
  return props.loggedIn ? <Component {...props} /> : <Loader />;
}

export default ProtectedRoute;
