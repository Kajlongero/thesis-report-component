import { Quill } from "react-quill-new";

import { BLOTS_LIST } from ".";
import type { Placeholder } from "../../../types/placeholders";

const Inline = Quill.import("blots/inline") as any;

export class PlaceholderBlot extends Inline {
  static tagName = BLOTS_LIST.CUSTOM_PLACEHOLDER.TAG_NAME;
  static blotName = BLOTS_LIST.CUSTOM_PLACEHOLDER.BLOT_NAME;
  static className = BLOTS_LIST.CUSTOM_PLACEHOLDER.CLASS_NAME;

  static create(value: Placeholder) {
    const node = super.create() as HTMLElement;

    if (typeof value === "object" && value && "name" in value) {
      node.innerText = `{${value.name}}`;
    }
    node.setAttribute("id", value.id.toString());
    node.setAttribute;

    node.setAttribute("contenteditable", "false");

    return node;
  }

  static value(node: HTMLElement) {
    return {
      id: node.getAttribute("id"),
    };
  }

  static formats(node: HTMLElement) {
    return {
      id: node.getAttribute("id"),
    };
  }
}
