import type { User } from "../../types/user";

export interface AuthContextInterface {
  user: User | null;

  setUserData: (data: User) => void;
  clearUserData: () => void;
}
