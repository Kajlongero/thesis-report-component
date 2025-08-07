import type { Delta } from "quill";
import type { DeltaStatic } from "react-quill-new";

import type { QueryDefinitions } from "../../types/quill";

export type QuillReducerActionTypes =
  | { type: "SET_DELTA"; payload: Delta | DeltaStatic }
  | { type: "CLEAR_DELTA" }
  | { type: "SET_QUERIES"; payload: QueryDefinitions[] }
  | { type: "ADD_QUERY"; payload: QueryDefinitions }
  | { type: "DELETE_QUERY"; payload: number | string };
