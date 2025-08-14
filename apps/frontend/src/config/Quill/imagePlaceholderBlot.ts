import Quill from "quill";

const Embed = Quill.import("blots/embed") as any;

export class ImagePlaceholderBlot extends Embed {
  static blotName = "imagePlaceholder";
  static tagName = "img";

  static create(value: { name: string; width: number; height: number }) {
    const node = super.create() as HTMLElement;

    const svgContent = `
      <svg width="${value.width}" height="${value.height}" viewBox="0 0 ${value.width} ${value.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="${value.width}" height="${value.height}" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2" stroke-dasharray="8 8"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#6B7280" font-family="sans-serif" font-size="16">{{${value.name}}}</text>
      </svg>`;

    const src = `data:image/svg+xml;base64,${btoa(svgContent)}`;

    node.setAttribute("src", src);
    node.setAttribute("alt", `{{${value.name}}}`);
    node.setAttribute("width", String(value.width));
    node.setAttribute("height", String(value.height));

    node.setAttribute("data-placeholder-name", value.name);

    return node;
  }

  static value(domNode: HTMLElement): object {
    return {
      name: domNode.getAttribute("data-placeholder-name") || "",
      width: parseInt(domNode.getAttribute("width") || "0", 10),
      height: parseInt(domNode.getAttribute("height") || "0", 10),
    };
  }
}
