import React from "react";
import ReactQuill from "react-quill-new";

// import { type DeltaStatic } from "react-quill-new";

import { type QuillModules } from "../../types/quill";
import { type QuillChangeHandler } from "../../hooks/useQuill";

import "react-quill-new/dist/quill.snow.css";

export interface QuillEditorProps {
  value?: string;
  onChange?: QuillChangeHandler;

  placeholder?: string;
  readOnly?: boolean;
  theme?: "snow" | "bubble";
  modules?: QuillModules;
  formats?: string[];

  height?: string;
  className?: string;

  onFocus?: () => void;
  onBlur?: () => void;
  onSelectionChange?: (
    range: unknown,
    source: string,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;

  forwardedRef?: React.RefObject<ReactQuill>;
}

export const QuillEditor = (props: QuillEditorProps) => {
  const {
    value = "",
    onChange,
    placeholder = "Escribe aquí...",
    readOnly = false,
    theme = "snow",
    modules,
    formats,
    height = "300px",
    className = "",
    onFocus,
    onBlur,
    onSelectionChange,
    forwardedRef,
  } = props;

  const editorStyle: React.CSSProperties = {
    height,
    marginBottom: "50px",
  };

  const containerClasses = `
    quill-editor-container
    ${className}
  `.trim();

  return (
    <div className={containerClasses}>
      <ReactQuill
        ref={forwardedRef}
        theme={theme}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeSelection={onSelectionChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules}
        formats={formats}
        style={editorStyle}
      />
    </div>
  );
};
