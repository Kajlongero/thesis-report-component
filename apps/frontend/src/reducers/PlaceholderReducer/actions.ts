import type { Placeholder } from "../../types/placeholders";

export type PlaceholderReducerActionTypes =
  | { type: "SET_PLACEHOLDERS"; payload: Placeholder[] }
  | { type: "ADD_PLACEHOLDER"; payload: Placeholder }
  | { type: "UPDATE_PLACEHOLDER"; payload: Placeholder }
  | { type: "REMOVE_PLACEHOLDER"; payload: { id: string } }
  | { type: "CLEAR_PLACEHOLDERS" };
