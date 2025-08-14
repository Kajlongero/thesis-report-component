import { useContext, useEffect } from "react";

import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context";

export const LogoutPage = () => {
  const { setUserData } = useContext(AuthContext);

  const { process } = useFetch({ tx: "Logout", fnName: "user-logout" });

  const handleLogout = async () => {
    const hasLogout = await process(undefined);

    if (hasLogout.message) setUserData(false);
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="w-full flex justify-center items-center min-h-full">
      <div className="w-full flex flex-col justify-center items-center min-h-56 gap-y-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
        <p>Cerrando sesión...</p>
      </div>
    </div>
  );
};
