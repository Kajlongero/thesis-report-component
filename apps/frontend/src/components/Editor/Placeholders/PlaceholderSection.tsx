import React from "react";

import { PlaceholderList } from "./PlaceholderList";
import { PlaceholderHeader } from "./PlaceholderHeader";
import { PlaceholderSelect } from "./PlaceholderSelect";
import type { Placeholder, QueryItem } from "../../../types/placeholders";

interface PlaceholderSectionProps {
  queryId: number;
  queryIds: QueryItem[];
  aliasGroup: Placeholder;

  onAddQuery: () => void;
  onTestQuery: (query: QueryItem) => void;
  onRemoveQuery: (queryId: number) => void;
  onSelectionChange: (value: number) => void;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({
  queryId,
  queryIds,
  aliasGroup,
  onAddQuery,
  onTestQuery,
  onRemoveQuery,
  onSelectionChange,
}) => {
  return (
    <div className="space-y-4 px-4 py-2">
      <PlaceholderHeader alias={aliasGroup.alias} />

      <PlaceholderSelect
        onAdd={onAddQuery}
        queryId={queryId}
        options={queryIds}
        onSelectionChange={onSelectionChange}
      />

      <PlaceholderList
        queryIds={aliasGroup.queryIds}
        onTestQuery={onTestQuery}
        onRemoveQuery={onRemoveQuery}
      />
    </div>
  );
};
