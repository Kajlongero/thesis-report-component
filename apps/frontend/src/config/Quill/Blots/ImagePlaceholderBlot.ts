import { Quill } from "react-quill-new";
import { BLOTS_LIST } from ".";

const BlockEmbed = Quill.import("blots/block/embed") as any;

export class ImagePlaceholderBlot extends BlockEmbed {
  static tagName = BLOTS_LIST.IMAGE_PLACEHOLDER.TAG_NAME;
  static blotName = BLOTS_LIST.IMAGE_PLACEHOLDER.BLOT_NAME;
  static className = BLOTS_LIST.IMAGE_PLACEHOLDER.CLASS_NAME;

  static create(value: {
    name: string;
    width: number;
    height: number;
    align: string;
  }) {
    const node = super.create() as HTMLElement;

    const {
      name = "Imagen",
      width = 300,
      height = 200,
      align = "center",
    } = value || {};

    // --- ¡AQUÍ ESTÁ LA CORRECCIÓN CLAVE! ---
    // 1. Aplicamos los estilos de tamaño DIRECTAMENTE al nodo principal del Blot.
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;

    // Aplicamos estilos base directamente para que se vea como un placeholder
    node.style.border = "2px dashed #ccc";
    node.style.backgroundColor = "#f9f9f9";
    node.style.display = "flex";
    node.style.alignItems = "center";
    node.style.justifyContent = "center";

    // 2. Guardamos cada pieza de dato en su propio atributo para más robustez.
    node.setAttribute("data-name", name);
    node.setAttribute("data-width", String(width));
    node.setAttribute("data-height", String(height));
    node.setAttribute("data-align", align);
    node.setAttribute("contenteditable", "false");

    // 3. El innerHTML ahora solo contiene los elementos visuales internos.
    node.innerHTML = `
      <div style="text-align: center; color: #666;">
        <span style="font-size: 24px;">🖼️</span>
        <div style="font-weight: 500;">{{${name}}}</div>
        <div style="font-size: 12px; color: #999; margin-top: 4px;">${width} × ${height}px</div>
      </div>
    `;

    return node;
  }

  /**
   * Le dice a Quill cómo leer los datos desde el DOM para construir el Delta.
   * Ahora reconstruye el objeto a partir de los atributos individuales.
   */
  static value(node: HTMLElement): object {
    return {
      name: node.getAttribute("data-name") || "",
      width: parseInt(node.getAttribute("data-width") || "300", 10),
      height: parseInt(node.getAttribute("data-height") || "200", 10),
      align: node.getAttribute("data-align") || "center",
    };
  }
}
