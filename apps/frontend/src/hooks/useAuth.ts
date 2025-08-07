import { useLocation } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { useFetch } from "./useFetch";
import { authReducer, authReducerInitialState } from "../reducers/AuthReducer";

import type { User } from "../types/user";

export const useAuth = () => {
  const location = useLocation();
  const [auth, dispatch] = useReducer(authReducer, authReducerInitialState);

  const refreshSession = useFetch({
    tx: "RefreshToken",
    fnName: "fetch-refresh-token",
  });
  const validateSession = useFetch({
    tx: "ValidateSession",
    fnName: "fetch-valid-session",
  });

  const handleRefreshToken = async () => {};

  const handleValidateSession = async () => {};

  const setUserData = (data: User) =>
    dispatch({ type: "SET_USER_DATA", payload: data });

  const clearUserData = () => dispatch({ type: "CLEAR_USER_DATA" });

  useEffect(() => {
    console.log("Fetch user data");
  }, []);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return {
    user: auth.user,
    setUserData,
    clearUserData,
  };
};
