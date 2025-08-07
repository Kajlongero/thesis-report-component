import { useReducer } from "react";

import { AuthContext } from "..";

import {
  authReducer,
  authReducerInitialState,
} from "../../reducers/AuthReducer";
import type { User } from "../../types/user";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, dispatch] = useReducer(authReducer, authReducerInitialState);

  const { user } = auth;

  const setUserData = (data: User) =>
    dispatch({ type: "SET_USER_DATA", payload: data });

  const clearUserData = () => dispatch({ type: "CLEAR_USER_DATA" });

  return (
    <AuthContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
