


import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Check for token
  const token = localStorage.getItem("token");

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // Ensure both user and token exist
  if (user && token) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
