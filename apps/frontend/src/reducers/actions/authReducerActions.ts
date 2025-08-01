import type { User } from "../../types/user";

export type AuthReducerActionTypes =
  | { type: "SET_USER_DATA"; payload: User }
  | { type: "CLEAR_USER_DATA" };
