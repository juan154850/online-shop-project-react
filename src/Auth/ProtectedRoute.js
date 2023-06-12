import React from "react";
import { useAuth } from ".";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return props.children;
};
export { ProtectedRoute };
