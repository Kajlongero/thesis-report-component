import { createContext } from "react";

import type { AuthContextInterface } from "../interfaces/AuthContext";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
