import { AuthContext } from "..";

import { useAuth } from "../../hooks/useAuth";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    user,
    isLoading,
    expiredToken,
    setUserData,
    clearUserData,
    setExpiredToken,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        expiredToken,
        setUserData,
        clearUserData,
        setExpiredToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
