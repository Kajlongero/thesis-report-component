import { Quill } from "react-quill-new";
import { BLOTS_LIST } from ".";

const Inline = Quill.import("blots/inline") as any;

export class TablePlaceholderBlot extends Inline {
  static tagName = BLOTS_LIST.TABLE_PLACEHOLDER.TAG_NAME;
  static blotName = BLOTS_LIST.TABLE_PLACEHOLDER.BLOT_NAME;
  static className = BLOTS_LIST.TABLE_PLACEHOLDER.CLASS_NAME;

  static create(value: { alias: string }) {
    const node = super.create();

    if (typeof value === "object" && value && "alias" in value)
      node.innerText = `{${value.alias}}`;

    node.setAttribute(
      BLOTS_LIST.TABLE_PLACEHOLDER.DATA_ATTRIBUTE,
      JSON.stringify(value || {})
    );

    node.setAttribute("contenteditable", "false");
    return node;
  }

  static value(node: HTMLElement) {
    try {
      return node.getAttribute(BLOTS_LIST.TABLE_PLACEHOLDER.DATA_ATTRIBUTE);
    } catch {
      return "";
    }
  }

  static formats(node: HTMLElement) {
    return node.getHTML();
  }
}
