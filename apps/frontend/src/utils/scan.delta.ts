import type { DeltaStatic } from "react-quill-new";
import type { Placeholder } from "../types/placeholders";

import { parsePlaceholders, type CustomAttrs } from "./blot.parser";
import type { RefObject } from "react";
import type ReactQuill from "react-quill-new";

export const scanDeltaForCoincidences = (alias: string, delta: DeltaStatic) => {
  const res: Placeholder[] = [];

  delta.ops.map((op) => {
    const getValue = op.insert as string;

    if (getValue?.startsWith("{") && getValue?.endsWith("}")) {
      const attrs = op.attributes as Record<string, Record<string, unknown>>;
      const keys = Object.keys(attrs);

      keys.map((elem) => {
        if (elem.endsWith("-placeholder")) {
          const result = parsePlaceholders(
            elem as CustomAttrs,
            getValue
          ) as Record<string, unknown>;

          const existsOnArray = res.filter((elem) =>
            elem.alias.startsWith(result.alias as string)
          );
          if (existsOnArray.length === 0) {
            res.push({
              id: `${result.alias}_0` as string,
              alias: result.alias as string,
              type: result.type as string,
              name: result.name as string,
              fields: result.fields as string[],
              raw: getValue as string,
              queryIds: [],
            });
          } else {
            res.push({
              id: `${result.alias}_${existsOnArray.length}` as string,
              alias: result.alias as string,
              type: result.type as string,
              name: result.name as string,
              fields: result.fields as string[],
              raw: getValue as string,
              queryIds: [],
            });
          }
        }
      });
    }
  });

  return res.filter((elem) => elem.alias.startsWith(alias));
};

export const syncPlaceholdersWithEditor = (
  placeholders: Placeholder[],
  quillRef: RefObject<ReactQuill>
) => {
  const current = quillRef.current;
  if (!current) return;

  const editor = current.getEditor();
  const delta = editor.getContents();

  const res: Placeholder[] = [];

  delta.ops.map((op) => {
    const getValue = op.insert as string;

    if (getValue?.startsWith("{") && getValue?.endsWith("}")) {
      const attrs = op.attributes as Record<string, Record<string, unknown>>;
      const keys = Object.keys(attrs);

      keys.map((elem) => {
        if (elem.endsWith("-placeholder")) {
          const result = parsePlaceholders(
            elem as CustomAttrs,
            getValue
          ) as Record<string, unknown>;

          const existsOnArray = res.filter((elem) =>
            elem.alias.startsWith(result.alias as string)
          );
          if (existsOnArray.length === 0) {
            res.push({
              id: `${result.alias}_0` as string,
              alias: result.alias as string,
              type: result.type as string,
              name: result.name as string,
              fields: result.fields as string[],
              raw: getValue as string,
              queryIds: [],
            });
          } else {
            res.push({
              id: `${result.alias}_${existsOnArray.length}` as string,
              alias: result.alias as string,
              type: result.type as string,
              name: result.name as string,
              fields: result.fields as string[],
              raw: getValue as string,
              queryIds: [],
            });
          }
        }
      });
    }
  });

  const placeholdersNotInRes = placeholders.filter(
    (placeholder) => !res.some((resItem) => resItem.id === placeholder.id)
  );

  return placeholdersNotInRes;
};
