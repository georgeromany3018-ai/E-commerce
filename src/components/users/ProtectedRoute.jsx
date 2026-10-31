import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { loggedIn, isAuthChecked } = useSelector((store) => store.auth);

  if (!isAuthChecked) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
