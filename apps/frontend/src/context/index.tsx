import { createContext } from "react";

import type { AuthContextInterface } from "../interfaces/AuthContext";
import type { ThemeContextInterface } from "../interfaces/ThemeContext";
import type { SidebarContextInterface } from "../interfaces/SidebarContext";

export const ThemeProviderContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface
);

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const SidebarContext = createContext<SidebarContextInterface>(
  {} as SidebarContextInterface
);
