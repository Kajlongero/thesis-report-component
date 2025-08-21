import ReactQuill, { Quill } from "react-quill-new";
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
  quillRef: React.RefObject<ReactQuill | null>;
  handleChange: QuillChangeHandler;
  clearData: () => void;
}

const useQuillEditor = (
  options: UseQuillEditorOptions = {}
): UseQuillEditorReturn => {
  const { initialValue = "", onChange } = options;

  const [content, setContentState] = useState<string>(initialValue);

  const quillRef = useRef<ReactQuill>(null);

  const setDelta = useCallback((delta: DeltaStatic): void => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.setContents(delta, "silent");

      setContentState(editor.root.innerHTML.replaceAll("\\", ""));
    }
  }, []);

  const getDelta = useCallback((): DeltaStatic | null => {
    const editor = quillRef.current?.getEditor();
    return editor ? editor.getContents() : null;
  }, []);

  const setContent = useCallback((newContent: string): void => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor.root.innerHTML !== newContent) {
        editor.clipboard.dangerouslyPasteHTML(0, newContent, "silent");
        setContentState(editor.root.innerHTML);
      }
    }
  }, []);

  const handleChange = useCallback<QuillChangeHandler>(
    (content, delta, source) => {
      if (source === "user") {
        setContentState(content);

        if (onChange) onChange(content, delta);
      }
    },
    [onChange]
  );

  const clearData = useCallback(() => {
    quillRef.current?.getEditor().clipboard.dangerouslyPasteHTML(0, "api");
    setDelta(quillRef.current?.getEditor().getContents() as DeltaStatic);
    setContentState("");
  }, []);

  return {
    content,
    getDelta,
    setDelta,
    clearData,
    setContent,
    quillRef,
    handleChange,
  };
};

export default useQuillEditor;
