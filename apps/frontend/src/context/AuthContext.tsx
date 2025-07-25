import { useAuth } from "../hooks/useAuth";

import { AuthContext } from ".";

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
