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
    hasRefreshedSession,
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
        hasRefreshedSession,
        setUserData,
        clearUserData,
        setExpiredToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
