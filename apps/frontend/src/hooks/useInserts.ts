import { Quill } from "react-quill-new";

import { useContext, type RefObject } from "react";
import type ReactQuill from "react-quill-new";

import { BLOTS_LIST } from "../config/Quill/Blots";
import { PlaceholdersContext } from "../context";
import { scanDeltaForCoincidences } from "../utils/scan.delta";
import type { Placeholder } from "../types/placeholders";

export type InsertBasicPlaceholderOpts = {
  text: string;
  alias: string;
  field: string;
};

export type InsertTableOpts = {
  alias: string;
};

export const useInserts = () => {
  const { placeholders, addPlaceholder } = useContext(PlaceholdersContext);

  const handleInsertBasicPlaceholder = (
    quillRef: RefObject<ReactQuill>,
    data: Placeholder
  ) => {
    if (!quillRef.current || !quillRef.current.editor) return;

    const editor = quillRef.current.getEditor();
    const selection = editor.getSelection(true);

    if (!selection) return;

    const index = selection.index;

    try {
      editor.insertEmbed(
        index,
        BLOTS_LIST.CUSTOM_PLACEHOLDER.BLOT_NAME,
        data,
        Quill.sources.USER
      );

      editor.setSelection(index + 3, Quill.sources.SILENT);

      console.log(editor.getContents(), placeholders);
    } catch (error) {
      console.error("Error inserting placeholder:", error);
    }
  };

  const handleInsertTable = (
    quillRef: RefObject<ReactQuill>,
    data: InsertTableOpts
  ) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection(true);

    let insertIndex = range.index;

    if (range.index > 0) {
      const [_, offset] = editor.getLine(range.index);
      if (offset > 0) {
        editor.insertText(range.index, "\n", Quill.sources.USER);
        insertIndex++;
      }
    }

    editor.insertEmbed(
      insertIndex,
      BLOTS_LIST.TABLE_PLACEHOLDER.BLOT_NAME,
      data,
      Quill.sources.USER
    );

    editor.setSelection(insertIndex + 1, Quill.sources.SILENT);
  };

  return {
    handleInsertBasicPlaceholder,
    handleInsertTable,
  };
};
