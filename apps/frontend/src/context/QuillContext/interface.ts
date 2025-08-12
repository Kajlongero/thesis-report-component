import type { Delta } from "quill";
import type { DeltaStatic } from "react-quill-new";

import type { QueryDefinitions } from "../../types/quill";

export interface QuillContextInterface {
  delta: Delta | DeltaStatic | null;
  queries: QueryDefinitions[];

  selectedQueries: QueryDefinitions[];

  setDelta: (delta: Delta | DeltaStatic) => void;
  clearDelta: () => void;

  addQuery: (query: QueryDefinitions) => void;
  setQueries: (queries: QueryDefinitions[]) => void;
  deleteQuery: (id: number | string) => void;
}
