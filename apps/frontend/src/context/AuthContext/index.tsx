import { AuthContext } from "..";

import { useAuth } from "../../hooks/useAuth";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, setUserData, clearUserData } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
