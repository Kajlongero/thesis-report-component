import type { Placeholder, QueryItem } from "../../types/placeholders";

export type PlaceholderReducerActionTypes =
  | { type: "ADD_PLACEHOLDER"; payload: Placeholder }
  | { type: "UPDATE_PLACEHOLDER"; payload: Placeholder }
  | { type: "REMOVE_PLACEHOLDER"; payload: Placeholder }
  | { type: "SET_PLACEHOLDERS"; payload: Placeholder[] }
  | { type: "CLEAR_PLACEHOLDERS" }
  | { type: "ADD_QUERY"; payload: { id: Placeholder; query: QueryItem } }
  | { type: "REMOVE_QUERY"; payload: { id: Placeholder; query: QueryItem } }
  | { type: "UPDATE_QUERY"; payload: { id: Placeholder; queries: QueryItem[] } }
  | { type: "SYNC_RESULTS"; payload: { scannedPlaceholders: any[] } };
