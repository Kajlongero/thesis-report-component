import { Home, User, Layout, LogOut, FileText } from "lucide-react";

import type { LucideProps } from "lucide-react";
import type { Roles } from "../types/roles";

export type ProtectedLinks = {
  id: number | string;
  path: string;
  name: string;
  roles: Roles[];
  public: boolean;
  category: "MAIN" | "MANAGEMENT" | "MY ACCOUNT" | "NONE";
  withAuthentication: boolean;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const authRequiredPaths = new Set([
  "/dashboard",
  "/reports",
  "/templates",
  "/templates/create",
  "/templates/update",
  "/my-account",
  "/logout",
]);

export const authNotRequiredPaths = new Set(["/login", "/register"]);

export const protectedLinks: ProtectedLinks[] = [
  {
    id: "Dashboard",
    name: "Dashboard",
    path: "/dashboard",
    public: false,
    roles: ["USER", "ADMIN", "OWNER"],
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
    roles: ["USER", "ADMIN", "OWNER"],
    icon: FileText,
    category: "MAIN",
  },
  {
    id: "Templates",
    name: "Templates",
    path: "/templates",
    public: false,
    withAuthentication: true,
    roles: ["ADMIN", "OWNER"],
    icon: Layout,
    category: "MANAGEMENT",
  },
  {
    id: "My Account",
    name: "My Account",
    path: "/my-account",
    roles: ["ADMIN", "OWNER", "USER"],
    icon: User,
    public: false,
    category: "MY ACCOUNT",
    withAuthentication: true,
  },
  {
    id: "Logout",
    name: "Logout",
    path: "/login",
    roles: ["ADMIN", "OWNER", "USER"],
    public: false,
    withAuthentication: true,
    icon: LogOut,
    category: "MY ACCOUNT",
  },
];
