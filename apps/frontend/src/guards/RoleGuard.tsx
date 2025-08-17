import { useContext } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { AuthContext } from "../context";
import { protectedLinks } from "../lib/protected";

import type { Roles } from "../types/roles";

const ADMIN_ONLY = ["ADMIN", "OWNER"];

export const RoleGuard = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const pathname = useLocation().pathname;

  if (!user) return <Navigate to="/login" replace />;

  const role = user && (user.role as Roles);

  const route = protectedLinks.find((r) => r.path === pathname);

  if (pathname === `/templates/${id}` && ADMIN_ONLY.includes(role as Roles))
    return <Outlet />;

  const allowed = route?.roles.includes(role as Roles);

  if (allowed) return <Outlet />;

  return <Navigate to="/dashboard" replace />;
};
