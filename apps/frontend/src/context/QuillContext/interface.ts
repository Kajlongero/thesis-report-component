import type { DeltaStatic } from "react-quill-new";
import type { QuillChangeHandler } from "../../hooks/useQuill";

import type ReactQuill from "react-quill-new";

export interface QuillContextInterface {
  // useQuill values
  content: string;
  quillRef: React.RefObject<ReactQuill | null>;

  // quillContextInterface values
  // delta: DeltaStatic | null;

  // useQuill functions
  getDelta: () => DeltaStatic | null;
  setDelta: (delta: DeltaStatic) => void;
  setContent: (content: string) => void;
  handleChange: QuillChangeHandler;
  clearData: () => void;
}
