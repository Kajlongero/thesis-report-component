import { Home, User, Users, Layout, LogOut, FileText } from "lucide-react";

import type { LucideProps } from "lucide-react";

export type ProtectedLinks = {
  id: number | string;
  path: string;
  name: string;
  public: boolean;
  withAuthentication: boolean;
  category: "MAIN" | "MANAGEMENT" | "MY ACCOUNT" | "NONE";
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const protectedLinks: ProtectedLinks[] = [
  {
    id: "Dashboard",
    name: "Dashboard",
    path: "/dashboard",
    public: false,
    withAuthentication: true,
    icon: Home,
    category: "MAIN",
  },
  {
    id: "Reports",
    name: "Reports",
    path: "/reports",
    public: false,
    withAuthentication: true,
    icon: FileText,
    category: "MAIN",
  },
  {
    id: "Users",
    name: "Users",
    path: "/users",
    public: false,
    withAuthentication: true,
    icon: Users,
    category: "MAIN",
  },
  {
    id: "Templates",
    name: "Templates",
    path: "/templates",
    public: false,
    withAuthentication: true,
    icon: Layout,
    category: "MANAGEMENT",
  },
  {
    id: "My Account",
    name: "My Account",
    path: "/my-account",
    icon: User,
    public: false,
    category: "MY ACCOUNT",
    withAuthentication: true,
  },
  {
    id: "Logout",
    name: "Logout",
    path: "/login",
    public: false,
    withAuthentication: true,
    icon: LogOut,
    category: "MY ACCOUNT",
  },
];
