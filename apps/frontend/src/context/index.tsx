import { createContext } from "react";

import type { AuthContextInterface } from "../interfaces/AuthContext";
import type { ThemeContextInterface } from "../interfaces/ThemeContext";

export const ThemeProviderContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface
);

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);
