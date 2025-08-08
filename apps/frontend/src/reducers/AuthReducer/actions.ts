import type { User } from "../../types/user";

export type AuthReducerActionTypes =
  | { type: "SET_USER_DATA"; payload: User | null | false }
  | { type: "SET_EXPIRED_TOKEN"; payload: boolean }
  | { type: "SET_REFRESHED_SESSION"; payload: boolean }
  | { type: "CLEAR_USER_DATA" };
