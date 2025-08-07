import { useEffect, useReducer } from "react";

import { authReducer, authReducerInitialState } from "../reducers/AuthReducer";

import type { User } from "../types/user";

export const useAuth = () => {
  const [auth, dispatch] = useReducer(authReducer, authReducerInitialState);

  const setUserData = (data: User) =>
    dispatch({ type: "SET_USER_DATA", payload: data });

  const clearUserData = () => dispatch({ type: "CLEAR_USER_DATA" });

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return {
    user: auth.user,
    setUserData,
    clearUserData,
  };
};
