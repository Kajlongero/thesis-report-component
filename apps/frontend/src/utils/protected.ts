type ProtectedLinks = {
  id: number | string;
  path: string;
  name: string;
  public: boolean;
  withAuthentication: boolean;
};

export const protectedLinks: ProtectedLinks[] = [
  {
    id: "login",
    path: "/login",
    name: "Login",
    public: true,
    withAuthentication: false,
  },
  {
    id: "register",
    path: "/register",
    name: "Register",
    public: true,
    withAuthentication: false,
  },
];
