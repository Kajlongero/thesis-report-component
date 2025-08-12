import type { User } from "../../types/user";

export interface AuthContextInterface {
  user: User | null | false;
  isLoading: boolean;
  expiredToken: boolean;
  hasRefreshedSession: boolean;

  setUserData: (data: User) => void;
  clearUserData: () => void;

  setExpiredToken: (expired: boolean) => void;
}
