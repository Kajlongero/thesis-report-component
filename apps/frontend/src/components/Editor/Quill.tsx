import React, { useMemo, type RefObject } from "react";
import ReactQuill from "react-quill-new";

import useModal from "../../hooks/useModal";
import { useInserts } from "../../hooks/useInserts";

import { InsertBasicPlaceholdersModal } from "../Modals/InsertBasicPlaceholderModal";

import { createCustomHandlers } from "../../config/Quill/handlers";
import { createModulesWithHandlers, formats } from "../../config/Quill";

import { type QuillChangeHandler } from "../../hooks/useQuill";
import { type InsertBasicPlaceholderOpts } from "../../hooks/useInserts";

import "../../quill.css";
import "react-quill-new/dist/quill.snow.css";
export interface QuillEditorProps {
  value?: string;

  placeholder?: string;
  readOnly?: boolean;
  theme?: "snow" | "bubble";

  height?: string;
  className?: string;

  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: QuillChangeHandler;
  onSelectionChange?: (
    range: unknown,
    source: string,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;

  forwardedRef?: React.RefObject<ReactQuill>;
}

export const QuillEditor = (props: QuillEditorProps) => {
  const { handleInsertBasicPlaceholder } = useInserts();

  const {
    isOpen: isBasicPlaceholderOpen,
    openModal: setIsBasicPlaceholderOpen,
    closeModal: closeBasicPlaceholderModal,
  } = useModal(false);

  const {
    value = "",
    theme = "snow",
    height = "300px",
    className = "",
    placeholder = "Escribe aquí...",
    forwardedRef,
    readOnly = false,
    onBlur,
    onFocus,
    onChange,
    onSelectionChange,
  } = props;

  const editorStyle: React.CSSProperties = {
    height,
    marginBottom: "50px",
  };

  const containerClasses = `
    quill-editor-container
    ${className}
  `.trim();

  const handleChangeWrapper = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    if (source === "user" && onChange) {
      onChange(content, delta, source, editor);
    }
  };

  const customHandlers = useMemo(
    () =>
      createCustomHandlers({
        "custom-placeholder": () => {
          setIsBasicPlaceholderOpen();
          console.log(
            "Is Basic Placeholder Modal Open",
            isBasicPlaceholderOpen
          );
        },
      }),
    [isBasicPlaceholderOpen]
  );

  const modules = useMemo(
    () => createModulesWithHandlers(customHandlers),
    [customHandlers]
  );

  return (
    <div className={containerClasses}>
      <ReactQuill
        ref={forwardedRef}
        theme={theme}
        value={value}
        onChange={handleChangeWrapper}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeSelection={onSelectionChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules}
        formats={formats}
        style={editorStyle}
      />
      <InsertBasicPlaceholdersModal
        open={isBasicPlaceholderOpen}
        onOpenChange={closeBasicPlaceholderModal}
        onInsert={(data: InsertBasicPlaceholderOpts) => {
          handleInsertBasicPlaceholder(
            forwardedRef as RefObject<ReactQuill>,
            data
          );
          closeBasicPlaceholderModal();
        }}
      />
    </div>
  );
};
