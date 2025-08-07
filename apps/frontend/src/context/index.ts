import { createContext } from "react";

import type { AuthContextInterface } from "./AuthContext/interface";
import type { QuillContextInterface } from "./QuillContext/interface";
import type { SidebarContextInterface } from "./SidebarContext/interface";

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const SidebarContext = createContext<SidebarContextInterface>(
  {} as SidebarContextInterface
);

export const QuillContext = createContext<QuillContextInterface>(
  {} as QuillContextInterface
);
