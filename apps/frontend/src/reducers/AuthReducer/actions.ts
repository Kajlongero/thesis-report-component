import type { User } from "../../types/user";

export type AuthReducerActionTypes =
  | { type: "SET_USER_DATA"; payload: User | false | null }
  | { type: "SET_EXPIRED_TOKEN"; payload: boolean }
  | { type: "SET_REFRESHED_SESSION"; payload: boolean }
  | { type: "UPDATE_USER"; payload: { firstName: string; lastName: string } }
  | { type: "CLEAR_USER_DATA" };
