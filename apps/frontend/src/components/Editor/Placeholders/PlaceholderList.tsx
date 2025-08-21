import React from "react";

import { PlaceholderItem } from "./PlaceholderItem";
import type { QueryItem } from "../../../types/placeholders";

interface PlaceholderListProps {
  queryIds: QueryItem[];
  onTestQuery: (query: QueryItem) => void;
  onRemoveQuery: (queryIndex: number) => void;
}

export const PlaceholderList: React.FC<PlaceholderListProps> = ({
  queryIds,
  onTestQuery,
  onRemoveQuery,
}) => {
  return (
    <div className="space-y-2">
      {queryIds.map((queryItem, queryIndex) => (
        <PlaceholderItem
          key={queryIndex}
          queryItem={queryItem}
          onTest={onTestQuery}
          onRemove={onRemoveQuery}
        />
      ))}
    </div>
  );
};
