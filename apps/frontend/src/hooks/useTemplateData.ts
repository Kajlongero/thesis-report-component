import { useMemo } from "react";

import { type Templates } from "../types/templates";
import { type QueryGroup } from "../types/reportGeneration";
import { type SelectOption } from "../components/Commons/SelectFetcher";

export const useTemplateData = (
  templates: Templates[],
  selectedTemplateId: number | null
) => {
  const templateOptions: SelectOption[] = useMemo(
    () =>
      templates.map((template) => ({
        id: template.id,
        value: template.id.toString(),
        label: template.name,
        description: template.description,
      })),
    [templates]
  );

  const selectedTemplate = useMemo(
    () =>
      selectedTemplateId
        ? templates.find((t) => t.id === selectedTemplateId)
        : undefined,
    [templates, selectedTemplateId]
  );

  const queryGroups: QueryGroup[] = useMemo(() => {
    if (!selectedTemplate?.placeholders?.length) return [];

    const queryMap = new Map<number, QueryGroup>();

    selectedTemplate.placeholders.forEach((placeholder) => {
      const queryId = placeholder.query.id;

      if (!queryMap.has(queryId)) {
        queryMap.set(queryId, {
          queryId,
          label: placeholder.name,
          query: placeholder.query,
          fieldKey: `query_${queryId}`,
          inputType: placeholder.query.fieldType.toLowerCase(),
          placeholder:
            placeholder.query.fieldPlaceholder ||
            `Enter ${placeholder.query.field}...`,
          placeholderFields: [placeholder.field],
        });
      } else {
        const group = queryMap.get(queryId)!;

        group.label += `, ${placeholder.name}`;
        group.placeholderFields.push(placeholder.field);
      }
    });

    return Array.from(queryMap.values());
  }, [selectedTemplate]);

  return {
    templateOptions,
    selectedTemplate,
    queryGroups,
  };
};
