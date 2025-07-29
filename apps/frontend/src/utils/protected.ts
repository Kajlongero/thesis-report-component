import {
  Key,
  Home,
  User,
  Users,
  Layout,
  LogOut,
  FileText,
  BarChart3,
  // Shield,
  // Settings,
  // HelpCircle,
} from "lucide-react";

import type { LucideProps } from "lucide-react";

export type ProtectedLinks = {
  id: number | string;
  path: string;
  name: string;
  public: boolean;
  withAuthentication: boolean;
  category: "MAIN" | "MANAGEMENT" | "HELP" | "NONE";
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const protectedLinks: ProtectedLinks[] = [
  {
    id: "login",
    path: "/login",
    name: "Login",
    public: true,
    withAuthentication: false,
    category: "NONE",
  },
  {
    id: "register",
    path: "/register",
    name: "Register",
    public: true,
    withAuthentication: false,
    category: "NONE",
  },
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
    id: "Analytics",
    name: "Analytics",
    path: "/analytics",
    public: false,
    withAuthentication: true,
    icon: BarChart3,
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
    id: "API Keys",
    name: "API Keys",
    path: "/api-keys",
    public: false,
    withAuthentication: true,
    icon: Key,
    category: "MANAGEMENT",
  },
  // {
  //   id: "Configurations",
  //   name: "Configurations",
  //   path: "/configurations",
  //   public: false,
  //   withAuthentication: true,
  //   icon: Settings,
  //   category: "MANAGEMENT",
  // },
  // {
  //   id: "Security",
  //   name: "Security",
  //   path: "/security",
  //   public: false,
  //   withAuthentication: true,
  //   icon: Shield,
  //   category: "MANAGEMENT",
  // },
  // {
  //   id: "Help Center",
  //   name: "Help Center",
  //   path: "/help",
  //   public: false,
  //   withAuthentication: true,
  //   icon: HelpCircle,
  //   category: "HELP",
  // },
  {
    id: "My Account",
    name: "My Account",
    path: "/my-account",
    icon: User,
    public: false,
    category: "HELP",
    withAuthentication: true,
  },
  {
    id: "Logout",
    name: "Logout",
    path: "/login",
    public: false,
    withAuthentication: true,
    icon: LogOut,
    category: "HELP",
  },
];
