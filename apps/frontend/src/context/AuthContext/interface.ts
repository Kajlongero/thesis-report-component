import type { User } from "../../types/user";

export interface AuthContextInterface {
  user: User | null;
  expiredToken: boolean;

  setUserData: (data: User) => void;
  clearUserData: () => void;

  setExpiredToken: (expired: boolean) => void;
}
