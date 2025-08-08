import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetch } from "./useFetch";
import { authReducer, authReducerInitialState } from "../reducers/AuthReducer";
import { authNotRequiredPaths, authRequiredPaths } from "../lib/protected";

import type { User } from "../types/user";
import type { ApiResponse } from "../types/api";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, dispatch] = useReducer(authReducer, authReducerInitialState);

  const { user, expiredToken } = auth;

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
    const data = await getUserData.process(undefined);
    const user = data.data as User;

    if (data.error && data.message !== "Token expired")
      dispatch({ type: "SET_USER_DATA", payload: false });

    if (!data.error) dispatch({ type: "SET_USER_DATA", payload: user });
  };

  const handleRefreshToken = async () => {
    const data = await refreshSession.process(undefined);
    const result = data as ApiResponse<null>;

    console.log(result);
    if (result.error) {
      clearUserData();

      navigate("/login");
    }

    setHasRefreshedSession(true);

    return result;
  };

  const handleValidateSession = async () => {
    const data = await validateSession.process(undefined);
    const result = data as ApiResponse<null>;

    const error = result.error;
    const tokenExpired = result.message === "Token expired";
    const statusCode = result.statusCode === 401;

    if (error && tokenExpired && statusCode) return null;

    return result;
  };

  const handleRefreshTokenAndFetchUser = async () => {
    if (auth.expiredToken) return;

    const result = await handleRefreshToken();

    if (!result.error && !auth.user) await handleGetUserData();
  };

  const handleValidateSessionAndRedirect = async (route: string) => {
    const data = await handleValidateSession();

    if (!data) return;

    if (authRequiredPaths.has(route) && data.error) {
      clearUserData();

      navigate("/login");
    }

    if (authNotRequiredPaths.has(route) && !data.error) {
      navigate("/dashboard");
    }
  };

  const setUserData = (data: User) =>
    dispatch({ type: "SET_USER_DATA", payload: data });

  const setExpiredToken = (expired: boolean) =>
    dispatch({ type: "SET_EXPIRED_TOKEN", payload: expired });

  const setHasRefreshedSession = (refreshed: boolean) =>
    dispatch({ type: "SET_REFRESHED_SESSION", payload: refreshed });

  const clearUserData = () => dispatch({ type: "CLEAR_USER_DATA" });

  useEffect(() => {
    handleGetUserData();
  }, []);

  useEffect(() => {
    handleRefreshTokenAndFetchUser();
  }, [auth.expiredToken]);

  useEffect(() => {
    handleValidateSessionAndRedirect(location.pathname);
  }, [location.pathname, auth.hasRefreshedSession]);

  const isLoading = user === null;

  return {
    user,
    isLoading,
    expiredToken,
    setUserData,
    clearUserData,
    setExpiredToken,
    setHasRefreshedSession,
  };
};
