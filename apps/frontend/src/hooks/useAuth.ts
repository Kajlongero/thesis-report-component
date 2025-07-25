import { useCallback, useEffect, useReducer } from "react";

import { fetchData } from "../utils/fetcher";
import { authReducer, authReducerInitialState } from "../reducers/authReducer";

import type { User } from "../types/user";

import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { protectedLinks } from "../utils/protected";

export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutateAsync, isError } = useMutation({
    mutationFn: () => fetchData<User | null>("GetUserData", {}),
    mutationKey: ["get-user-data"],
  });

  const [auth, dispatch] = useReducer(authReducer, authReducerInitialState);

  const handleUserData = useCallback(async () => {
    const result = await mutateAsync();

    if (isError) {
      const getRoute = protectedLinks.find(
        (elem) => elem.path === location.pathname
      );

      if (getRoute?.withAuthentication) return navigate("/login");
    }

    dispatch({ type: "SET_USER_DATA", payload: result.data! });
  }, [isError, location.pathname, navigate, mutateAsync]);

  useEffect(() => {}, []);

  useEffect(() => {
    handleUserData();
  }, [handleUserData, location.pathname]);

  return {
    user: auth.user,
  };
};
