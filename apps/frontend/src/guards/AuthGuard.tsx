import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context";

import { Loader } from "../components/Loaders/ScreenLoader";

export const AuthGuard = ({ isPrivate }: { isPrivate: boolean }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (user === null && isLoading) return <Loader show={true} />;

  if (isPrivate && !user) return <Navigate to="/login" replace />;

  if (!isPrivate && user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};
