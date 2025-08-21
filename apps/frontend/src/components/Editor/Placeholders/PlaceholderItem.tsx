import React from "react";
import { Trash2, Play } from "lucide-react";

import { Button } from "../../Commons/Button";

import type { QueryItem } from "../../../types/placeholders";

interface PlaceholderItemProps {
  queryItem: QueryItem;
  onTest: (query: QueryItem) => void;
  onRemove: (queryId: number) => void;
}

export const PlaceholderItem: React.FC<PlaceholderItemProps> = ({
  queryItem,
  onTest,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate" title={queryItem.query}>
          {queryItem.query}
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onTest(queryItem)}
        className="flex-shrink-0"
        title="Probar query"
      >
        <Play className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(queryItem.id)}
        className="text-destructive hover:text-destructive flex-shrink-0"
        title="Borrar query"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
