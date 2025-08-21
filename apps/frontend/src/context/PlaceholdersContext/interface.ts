import type ReactQuill from "react-quill-new";
import type { RefObject } from "react";

import type { Placeholder, QueryItem } from "../../types/placeholders";

export interface PlaceholdersContextInterface {
  placeholders: Placeholder[];

  setPlaceholders: (placeholders: Placeholder[]) => void;

  addPlaceholder: (placeholder: Placeholder) => void;
  removePlaceholder: (placeholder: Placeholder) => void;
  updatePlaceholder: (placeholder: Placeholder) => void;
  clearPlaceholders: () => void;

  addQuery: (placeholder: Placeholder, query: QueryItem) => void;
  removeQuery: (placeholder: Placeholder, query: QueryItem) => void;
}
