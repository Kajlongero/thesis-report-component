import type { User } from "../../types/user";

export interface AuthContextInterface {
  user: User | null | false;
  isLoading: boolean;
  expiredToken: boolean;
  hasRefreshedSession: boolean;

  setUserData: (data: User | false | null) => void;
  clearUserData: () => void;

  handleUpdateUser: (firstName: string, lastName: string) => void;

  setExpiredToken: (expired: boolean) => void;
}
