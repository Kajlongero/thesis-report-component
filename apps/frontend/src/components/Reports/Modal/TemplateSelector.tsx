import React from "react";

import { Label } from "../../Commons/Label";
import { SelectWithInfiniteScroll } from "../../Commons/SelectFetcher";

import type { Templates } from "../../../types/templates";
import type { SelectOption } from "../../Commons/SelectFetcher";

interface TemplateSelectorProps {
  value: number | null;
  hasMore: boolean;
  templates: SelectOption[];
  isLoading: boolean;
  isFetchingMore: boolean;
  selectedTemplate?: Templates;

  onChange: (value: number | null) => void;
  onLoadMore: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  value,
  hasMore,
  isLoading,
  templates,
  isFetchingMore,
  selectedTemplate,
  onChange,
  onLoadMore,
}) => {
  return (
    <div>
      <Label htmlFor="template-select">Report Template</Label>
      <SelectWithInfiniteScroll
        value={value?.toString() || ""}
        hasMore={hasMore}
        options={templates}
        onChange={(stringValue) =>
          onChange(stringValue ? parseInt(stringValue) : null)
        }
        isLoading={isLoading}
        className="mt-1"
        onLoadMore={onLoadMore}
        placeholder="Select a template..."
        isFetchingMore={isFetchingMore}
        searchPlaceholder="Search templates..."
      />
      {selectedTemplate && (
        <p className="text-sm text-muted-foreground mt-2">
          {selectedTemplate.description || "No description available"}
        </p>
      )}
    </div>
  );
};
