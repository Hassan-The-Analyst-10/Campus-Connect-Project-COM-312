import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Wrong role → go to login
  if (role && user.role !== role) {
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
