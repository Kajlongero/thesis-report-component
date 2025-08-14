import type { QuillModules } from "../../types/quill";

export const headerWordConfig = [
  {
    header: [1, 2, 3, 4, 5, 6, false],
  },
];

export const fontWordConfig = [{ font: [] }];

export const wordSizeConfig = [{ size: ["small", false, "large", "huge"] }];

export const wordTypeConfig = ["bold", "italic", "underline", "strike"];

export const wordColorConfig = [{ color: [] }, { background: [] }];

export const scriptWordConfig = [{ script: "sub" }, { script: "super" }];

export const listWordConfig = [
  { list: "ordered" },
  { list: "bullet" },
  { list: "check" },
];

export const indentWordConfig = [{ indent: "-1" }, { indent: "+1" }];

export const directionWordConfig = [{ direction: "rtl" }];

export const alignWordConfig = [{ align: [] }];

export const mediaConfig = [
  "link",
  "image",
  "image-placeholder",
  "video",
  "formula",
];

export const codeConfig = ["code-block"];

export const clearConfig = ["clean"];

export const customTagsConfig = ["custom-tags"];

export const defaultToolbarConfig = [
  headerWordConfig,
  fontWordConfig,
  wordSizeConfig,
  wordTypeConfig,
  wordColorConfig,
  scriptWordConfig,
  listWordConfig,
  indentWordConfig,
  directionWordConfig,
  alignWordConfig,
  mediaConfig,
  codeConfig,
  clearConfig,
  customTagsConfig,
];

export const createModulesWithHandlers = (
  handlers: Record<string, () => void>
): QuillModules => {
  return {
    toolbar: {
      container: defaultToolbarConfig,
      handlers: handlers,
    },
    clipboard: {
      matchVisual: false,
    },
  };
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
  "script",
  "formula",
  "code-block",
];
