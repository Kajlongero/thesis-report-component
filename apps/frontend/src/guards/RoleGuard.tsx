import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../context";
import { protectedLinks } from "../lib/protected";

import type { Roles } from "../types/roles";

export const RoleGuard = () => {
  const { user } = useContext(AuthContext);

  const pathname = useLocation().pathname;

  if (!user) return <Navigate to="/login" replace />;

  const role = user && (user.role as Roles);

  const route = protectedLinks.find((r) => r.path === pathname);

  const allowed = route?.roles.includes(role as Roles);

  if (allowed) return <Outlet />;

  return <Navigate to="/dashboard" replace />;
};
