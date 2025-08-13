import { useLocation } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { useFetch } from "./useFetch";
import { authReducer, authReducerInitialState } from "../reducers/AuthReducer";

import type { User } from "../types/user";
import type { ApiResponse } from "../types/api";

export const useAuth = () => {
  const location = useLocation();

  const [auth, dispatch] = useReducer(authReducer, authReducerInitialState);

  const { user, expiredToken, hasRefreshedSession } = auth;

  const getUserData = useFetch({
    tx: "GetUserData",
    fnName: "fetch-user-data",
  });
  const refreshSession = useFetch({
    tx: "RefreshToken",
    fnName: "fetch-refresh-token",
  });
  const validateSession = useFetch({
    tx: "ValidateSession",
    fnName: "fetch-valid-session",
  });

  const handleGetUserData = async () => {
    if (auth.user === false && !auth.expiredToken) return null;

    const data = await getUserData.process(undefined);

    if (data.message === "Token expired")
      dispatch({ type: "SET_EXPIRED_TOKEN", payload: true });

    const user = data.data as User;

    if (data.error && data.message !== "Token expired")
      dispatch({ type: "SET_USER_DATA", payload: false });

    if (!data.error) dispatch({ type: "SET_USER_DATA", payload: user });
  };

  const handleRefreshToken = async () => {
    if (!auth.expiredToken && auth.user === null) return null;

    const data = await refreshSession.process(undefined);
    const result = data as ApiResponse<null>;

    if (result.error) return setUserData(false);

    setHasRefreshedSession(true);
  };

  const handleValidateSession = async () => {
    const data = await validateSession.process(undefined);
    const result = data as ApiResponse<null>;

    if (result.error && result.message !== "Token expired") setUserData(false);

    if (result.error && result.message === "Token expired") setUserData(null);
  };

  const setUserData = (data: User | false | null) =>
    dispatch({ type: "SET_USER_DATA", payload: data });

  const setExpiredToken = (expired: boolean) =>
    dispatch({ type: "SET_EXPIRED_TOKEN", payload: expired });

  const setHasRefreshedSession = (refreshed: boolean) =>
    dispatch({ type: "SET_REFRESHED_SESSION", payload: refreshed });

  const handleUpdateUser = (firstName: string, lastName: string) =>
    dispatch({ type: "UPDATE_USER", payload: { firstName, lastName } });

  const clearUserData = () => dispatch({ type: "CLEAR_USER_DATA" });

  useEffect(() => {
    handleGetUserData();
  }, [auth.hasRefreshedSession]);

  useEffect(() => {
    handleRefreshToken();
  }, [auth.expiredToken]);

  useEffect(() => {
    handleValidateSession();
  }, [location.pathname, auth.hasRefreshedSession]);

  const isLoading = user === null;

  return {
    user,
    isLoading,
    expiredToken,
    hasRefreshedSession,
    setUserData,
    clearUserData,
    setExpiredToken,
    handleUpdateUser,
    setHasRefreshedSession,
  };
};
