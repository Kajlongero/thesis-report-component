import React from "react";

import { Label } from "../../Commons/Label";
import { Input } from "../../Commons/Input";

import type { QueryGroup } from "../../../types/reportGeneration";

interface TemplateParametersProps {
  values: Record<string, string>;
  queryGroups: QueryGroup[];
  onChange: (fieldId: string, value: string) => void;
}

export const TemplateParameters: React.FC<TemplateParametersProps> = ({
  values,
  queryGroups,
  onChange,
}) => {
  if (queryGroups.length === 0) return null;

  return (
    <div>
      <Label>Template Parameters</Label>
      <div className="space-y-4 mt-2">
        {queryGroups.map((queryGroup) => (
          <div key={queryGroup.fieldKey}>
            <Label htmlFor={queryGroup.fieldKey}>
              {queryGroup.label}
              <span className="text-xs text-muted-foreground ml-2">
                ({queryGroup.query.fieldType})
              </span>
            </Label>
            <Input
              id={queryGroup.fieldKey}
              type={queryGroup.inputType}
              placeholder={queryGroup.placeholder}
              value={values[queryGroup.fieldKey] || ""}
              onChange={(e) => onChange(queryGroup.fieldKey, e.target.value)}
              className="mt-1"
            />
            {queryGroup.placeholderFields.length > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                This query will populate:{" "}
                {queryGroup.placeholderFields.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
