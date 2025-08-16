import ReactQuill from "react-quill-new";
import { useState, useCallback, useRef } from "react";

import type { DeltaStatic } from "react-quill-new";

export interface QuillChangeHandler {
  (
    content: string,
    delta: DeltaStatic,
    source: string,
    editor: ReactQuill.UnprivilegedEditor
  ): void;
}

export interface UseQuillEditorOptions {
  initialValue?: string;
  onChange?: (content: string, delta: DeltaStatic) => void;
}

export interface UseQuillEditorReturn {
  content: string;

  getDelta: () => DeltaStatic | null;
  setDelta: (delta: DeltaStatic) => void;
  setContent: (content: string) => void;

  // Referencias
  quillRef: React.RefObject<ReactQuill | null>;

  handleChange: QuillChangeHandler;
}

const useQuillEditor = (
  options: UseQuillEditorOptions = {}
): UseQuillEditorReturn => {
  const { initialValue = "", onChange } = options;

  const [content, setContentState] = useState<string>(initialValue);

  const quillRef = useRef<ReactQuill>(null);

  const setDelta = useCallback((delta: DeltaStatic): void => {
    if (quillRef.current) {
      quillRef.current.editor?.setContents(delta);
    }
  }, []);

  const getDelta = useCallback((): DeltaStatic | null => {
    const editor = quillRef.current?.getEditor();
    return editor ? editor.getContents() : null;
  }, []);

  const setContent = useCallback((newContent: string): void => {
    setContentState(newContent);
  }, []);

  const handleChange = useCallback<QuillChangeHandler>(
    (
      content: string,
      delta: DeltaStatic
      // source: string,
      // editor: ReactQuill.UnprivilegedEditor
    ) => {
      setContentState(content);

      if (onChange) {
        onChange(content, delta);
      }
    },
    [onChange]
  );

  return {
    content,

    getDelta,
    setDelta,
    setContent,

    quillRef,

    handleChange,
  };
};

export default useQuillEditor;
