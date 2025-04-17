import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("authenticated") === "true";

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
