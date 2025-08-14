class PlaceholderBlot extends Inline {
  static blotName = "placeholder";
  static tagName = "span";
  static className = "ql-placeholder-tag";

  static create(value) {
    console.log("🏷️ PlaceholderBlot.create llamado con:", value);

    const node = super.create();

    const safeValue = value || {};
    node.setAttribute("data-placeholder", JSON.stringify(safeValue));
    node.className = "ql-placeholder-tag";
    node.setAttribute("contenteditable", "false");

    const styles = [
      "background: #E3F2FD",
      "border: 1px solid #2196F3",
      "border-radius: 4px",
      "padding: 2px 6px",
      "color: #1976D2",
      "font-size: 0.875em",
      "font-family: monospace",
      "display: inline-block",
      "margin: 0 2px",
      "cursor: pointer",
      "user-select: none",
    ];

    node.style.cssText = styles.join("; ");

    const displayText =
      safeValue.alias || safeValue.name || safeValue.type || "placeholder";
    node.textContent = `{{${displayText}}}`;

    return node;
  }

  static formats(node) {
    try {
      const data = node.getAttribute("data-placeholder");
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }
}
