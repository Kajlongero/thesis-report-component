import Quill from "quill";

const Inline = Quill.import("blots/inline") as any;

class PlaceholderBlot extends Inline {
  static blotName = "placeholder";
  static tagName = "span";

  static create(value: object) {
    const node = super.create();

    node.setAttribute("data-placeholder", JSON.stringify(value));
    node.classList.add("ql-placeholder-tag");

    return node;
  }

  static formats(domNode: HTMLElement): object {
    try {
      return JSON.parse(domNode.getAttribute("data-placeholder") || "{}");
    } catch (e) {
      console.error("Error al parsear datos del placeholder:", e);
      return {};
    }
  }
}

export default PlaceholderBlot;
