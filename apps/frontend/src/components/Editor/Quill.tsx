import React, { useMemo, type RefObject } from "react";
import ReactQuill, { type DeltaStatic } from "react-quill-new";

import useModal from "../../hooks/useModal";
import { useInserts } from "../../hooks/useInserts";

import QueryEditorModal from "../Modals/SqlQueriesAssignModal";
import { ImageEditModal } from "../Modals/ImagePlaceholderModal";
import { InfoPlaceholderModal } from "../Modals/InsertBasicPlaceholderModal";
import { TablePlaceholderModal } from "../Modals/TablePlaceholderModa";

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
  const { handleInsertBasicPlaceholder, handleInsertTable } = useInserts();

  const {
    isOpen: isPreviewModalOpen,
    openModal: openPreviewModal,
    closeModal: closePreviewModal,
  } = useModal(false);

  const {
    isOpen: isImagePlaceholderModalOpen,
    openModal: openImagePlaceholderModal,
    closeModal: closeImagePlaceholderModal,
  } = useModal(false);

  const {
    isOpen: isBasicPlaceholderOpen,
    openModal: setIsBasicPlaceholderOpen,
    closeModal: closeBasicPlaceholderModal,
  } = useModal(false);

  const {
    isOpen: isTableModalOpen,
    openModal: setIsTableModalOpen,
    closeModal: closeTableModal,
  } = useModal(false);

  const {
    isOpen: isSqlModalOpen,
    openModal: setIsSqlModalOpen,
    closeModal: closeSqlModal,
  } = useModal(false);

  const {
    value = "",
    theme = "snow",
    delta,
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
        "image-placeholder": () => {
          openImagePlaceholderModal();
          console.log(
            "Is Image Placeholder Modal Open",
            isImagePlaceholderModalOpen
          );
        },
        "table-placeholder": () => {
          setIsTableModalOpen();
          console.log("Is Table Placeholder Modal Open", isTableModalOpen);
        },
        "sql-modal": () => {
          setIsSqlModalOpen();
          console.log("Is SQL Modal Open", isSqlModalOpen);
        },
      }),
    [isBasicPlaceholderOpen, isImagePlaceholderModalOpen, isSqlModalOpen]
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
      <InfoPlaceholderModal
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
      <ImageEditModal
        open={isImagePlaceholderModalOpen}
        onOpenChange={
          isImagePlaceholderModalOpen
            ? closeImagePlaceholderModal
            : openImagePlaceholderModal
        }
        isNewImage={true}
        currentWidth={300}
        currentHeight={200}
        quillRef={forwardedRef as RefObject<ReactQuill>}
      />
      <TablePlaceholderModal
        open={isTableModalOpen}
        onOpenChange={closeTableModal}
        onApply={(alias: string) => {
          handleInsertTable(forwardedRef as RefObject<ReactQuill>, { alias });
          closeTableModal();
        }}
      />
      <QueryEditorModal
        open={isSqlModalOpen}
        quillRef={forwardedRef as RefObject<ReactQuill>}
        onOpenChange={closeSqlModal}
      />
    </div>
  );
};
