import type { DeltaStatic } from "react-quill-new";
import type { Placeholder } from "../../types/placeholders";

export interface PlaceholdersContextInterface {
  placeholders: Placeholder[];

  addPlaceholder: (placeholder: Placeholder, delta: DeltaStatic) => void;
  setPlaceholders: (placeholders: Placeholder[], delta: DeltaStatic) => void;
  removePlaceholder: (placeholder: Placeholder) => void;
  updatePlaceholder: (placeholder: Placeholder) => void;
  clearPlaceholders: () => void;
}
