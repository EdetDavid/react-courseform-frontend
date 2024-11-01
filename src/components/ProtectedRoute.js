import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = ({ role }) => {
  const currentUser = authService.getCurrentUser();
  const location = useLocation();

  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verify if the currentUser object and role are present
  if (!currentUser.user || (role !== "student" && role !== "hod")) {
    return <Navigate to="/" replace />;
  }

  // Role-based redirection logic
  const isHod = currentUser.user.is_hod;

  if (role === "student" && isHod) {
    return <Navigate to="/" replace />;
  }

  if (role === "hod" && !isHod) {
    return <Navigate to="/" replace />;
  }

  // If the user has the correct role, render the children components
  return <Outlet context={currentUser}/>;
};

export default ProtectedRoute;
