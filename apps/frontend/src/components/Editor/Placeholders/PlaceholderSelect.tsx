import React from "react";

import { Button } from "../../Commons/Button";
import { Select } from "../../Commons/Select";
import type { QueryItem } from "../../../types/placeholders";

interface SelectOption {
  label: string;
  value: string;
  description?: string;
}

interface PlaceholderSelectProps {
  queryId: number;
  options: QueryItem[];

  onAdd: () => void;
  onSelectionChange: (value: number) => void;
}

export const PlaceholderSelect: React.FC<PlaceholderSelectProps> = ({
  queryId,
  options,
  onAdd,
  onSelectionChange,
}) => {
  const parsedTo: SelectOption[] = options.map(({ id, query }) => ({
    value: id.toString(),
    label: query,
  }));

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Select
          value={queryId.toString()}
          options={parsedTo}
          onChange={(value) => onSelectionChange(Number(value))}
          placeholder="Seleccionar Query ID..."
        />
      </div>
      <Button variant="outline" onClick={onAdd} disabled={!queryId}>
        Añadir
      </Button>
    </div>
  );
};
