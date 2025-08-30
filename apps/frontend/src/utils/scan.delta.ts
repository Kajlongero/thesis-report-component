import type { DeltaStatic } from "react-quill-new";

import { BLOTS_LIST } from "../config/Quill/Blots";

export const scanDeltaForPlaceholders = (delta: DeltaStatic): number[] => {
  const res: number[] = [];

  delta.ops.map((op) => {
    const getValue = op.insert as string;
    const hasIt = getValue?.startsWith("{") && getValue?.endsWith("}");

    if (hasIt) {
      const attrs = op.attributes as Record<string, Record<string, unknown>>;
      const keys = Object.keys(attrs);

      const index = keys.findIndex(
        (elem) => elem === BLOTS_LIST.CUSTOM_PLACEHOLDER.BLOT_NAME
      );
      if (index !== -1)
        res.push(parseInt(attrs[keys[index]].id as string) as number);
    }
  });

  return res;
};
