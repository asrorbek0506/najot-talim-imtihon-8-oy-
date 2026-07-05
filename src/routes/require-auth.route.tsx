import { Navigate, Outlet } from "react-router-dom";
import verifyToken, { getUserRole } from "../utils/verify.token";
import type { UserRole } from "../types/auth.type";

interface RequireAuthProps {
  allowedRoles?: UserRole[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const isAuthenticated = verifyToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = getUserRole();
    if (!role || !allowedRoles.includes(role)) {
      const fallback =
        role === "admin" || role === "super_admin" ? "/admin" : "/dashboard";
      return <Navigate to={fallback} replace />;
    }
  }

  return <Outlet />;
};

export default RequireAuth;
