class ImagePlaceholderBlot extends BlockEmbed {
  static blotName = "imagePlaceholder";
  static tagName = "div";
  static className = "ql-image-placeholder";

  static create(value) {
    console.log("🏗️ ImagePlaceholderBlot.create llamado con:", value);

    // Validación y sanitización exhaustiva
    if (!value || typeof value !== "object") {
      console.error("❌ Valor inválido para ImagePlaceholderBlot:", value);
      throw new Error(
        `Invalid value for ImagePlaceholderBlot: ${JSON.stringify(value)}`
      );
    }

    const safeValue = {
      name:
        String(value.name || "Image").replace(/[^a-zA-Z0-9_-]/g, "") || "Image",
      width: Math.max(50, Math.min(parseInt(value.width) || 300, 1200)),
      height: Math.max(50, Math.min(parseInt(value.height) || 200, 800)),
    };

    console.log("✅ Valor sanitizado:", safeValue);

    try {
      const node = super.create();

      // Configurar atributos básicos
      node.className = "ql-image-placeholder";
      node.setAttribute("contenteditable", "false");
      node.setAttribute("data-name", safeValue.name);
      node.setAttribute("data-width", String(safeValue.width));
      node.setAttribute("data-height", String(safeValue.height));

      // Prevenir edición accidental
      node.setAttribute("data-blot-name", "imagePlaceholder");
      node.setAttribute("spellcheck", "false");

      // Estilos inline para máxima compatibilidad
      const styles = [
        "border: 2px dashed #D1D5DB",
        "border-radius: 8px",
        "padding: 16px",
        "margin: 8px 0",
        "background: #F9FAFB",
        "display: flex",
        "align-items: center",
        "justify-content: center",
        `width: ${safeValue.width}px`,
        `min-height: ${safeValue.height}px`,
        "cursor: pointer",
        "user-select: none",
        "box-sizing: border-box",
        "position: relative",
        "transition: all 0.2s ease",
      ];

      node.style.cssText = styles.join("; ");

      // Crear contenido interno de manera segura
      const contentHtml = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; color: #6B7280; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; pointer-events: none;">
          <div style="font-size: 32px; line-height: 1;">🖼️</div>
          <div style="font-size: 16px; font-weight: 500; color: #374151; word-break: break-all; max-width: ${Math.max(
            200,
            safeValue.width - 40
          )}px;">{{${safeValue.name}}}</div>
          <div style="font-size: 12px; color: #9CA3AF; font-weight: 400;">${
            safeValue.width
          } × ${safeValue.height}px</div>
        </div>
      `;

      node.innerHTML = contentHtml;

      // Event listeners para interactividad
      node.addEventListener("mouseenter", function () {
        this.style.borderColor = "#3B82F6";
        this.style.backgroundColor = "#EFF6FF";
      });

      node.addEventListener("mouseleave", function () {
        this.style.borderColor = "#D1D5DB";
        this.style.backgroundColor = "#F9FAFB";
      });

      console.log("✅ Nodo ImagePlaceholder creado exitosamente");
      return node;
    } catch (error) {
      console.error("❌ Error en ImagePlaceholderBlot.create:", error);
      throw new Error(
        `Failed to create ImagePlaceholderBlot: ${error.message}`
      );
    }
  }

  static value(node) {
    if (!node || !node.getAttribute) {
      console.warn("⚠️ Nodo inválido en ImagePlaceholderBlot.value:", node);
      return { name: "Error", width: 300, height: 200 };
    }

    const value = {
      name: node.getAttribute("data-name") || "Image",
      width: parseInt(node.getAttribute("data-width") || "300", 10),
      height: parseInt(node.getAttribute("data-height") || "200", 10),
    };

    console.log("📊 Valor extraído de ImagePlaceholder:", value);
    return value;
  }

  static formats(node) {
    return this.value(node);
  }

  static match(node) {
    return node.getAttribute("data-blot-name") === "imagePlaceholder";
  }
}
