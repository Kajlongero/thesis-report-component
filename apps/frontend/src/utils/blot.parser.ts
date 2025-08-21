export type CustomAttrs =
  | "custom-placeholder"
  | "image-placeholder"
  | "table-placeholder";

export const parsePlaceholders = (customAttr: CustomAttrs, insert: string) => {
  switch (customAttr) {
    case "custom-placeholder": {
      const elem = insert.replace("{", "").replace("}", "");
      const split = elem.split("|||");

      let obj = {} as Record<string, unknown>;

      split.forEach((elem) => {
        const [key, value] = elem.split(":");
        obj[key] = value;
      });

      return {
        ...obj,
        type: "info",
        field: [obj.field],
      };
    }
    // case "image-placeholder": {
    // }
    // case "table-placeholder": {
    // }
  }
};
