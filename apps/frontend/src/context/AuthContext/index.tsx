import { useReducer } from "react";

import { AuthContext } from "..";

import {
  authReducer,
  authReducerInitialState,
} from "../../reducers/AuthReducer";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth] = useReducer(authReducer, authReducerInitialState);

  const { user } = auth;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
