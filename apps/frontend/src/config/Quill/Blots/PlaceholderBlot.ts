import { Quill } from "react-quill-new";

import { BLOTS_LIST } from ".";

const Inline = Quill.import("blots/inline") as any;

export class PlaceholderBlot extends Inline {
  static tagName = BLOTS_LIST.CUSTOM_PLACEHOLDER.TAG_NAME;
  static blotName = BLOTS_LIST.CUSTOM_PLACEHOLDER.BLOT_NAME;
  static className = BLOTS_LIST.CUSTOM_PLACEHOLDER.CLASS_NAME;

  static create(value: {
    id: string;
    text: string;
    alias: string;
    field: string;
  }) {
    const node = super.create() as HTMLElement;

    if (typeof value === "object" && value && "alias" in value)
      node.innerText = `{type:info|||id:${value.id}|||name:${value.text}|||alias:${value.alias}|||field:${value.field}}`;

    node.setAttribute(
      BLOTS_LIST.CUSTOM_PLACEHOLDER.DATA_ATTRIBUTE,
      `id:${value.id}|||text:${value.text}|||alias:${value.alias}|||field:${value.field}`
    );

    node.setAttribute("contenteditable", "false");

    return node;
  }

  static value(node: HTMLElement) {
    const html = node.getHTML();

    const split = html.split("|||");

    let obj = {} as Record<string, string>;

    split.forEach((elem) => {
      const [key, value] = elem.split(":");

      obj[key] = value;
    });

    return JSON.stringify(obj);
  }

  static formats(node: HTMLElement) {
    const html = node.getHTML();

    const split = html.split("|||");

    let obj = {} as Record<string, string>;

    split.forEach((elem) => {
      const [key, value] = elem.split(":");

      obj[key] = value;
    });

    return JSON.stringify(obj);
  }
}
