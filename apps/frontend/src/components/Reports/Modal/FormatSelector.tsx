import React from "react";

import { FileText } from "lucide-react";

import { Label } from "../../Commons/Label";

import type { FormatOption } from "../../../types/reportGeneration";

interface FormatSelectorProps {
  value: string;
  formats: FormatOption[];
  onChange: (value: string) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  value,
  formats,
  onChange,
}) => {
  const isSelected = (format: string) =>
    value === format
      ? "border-primary bg-primary/10 text-primary"
      : "border-border hover:bg-accent";

  return (
    <div>
      <Label>Export Format</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {formats.map(({ value, description }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`p-3 rounded-lg border text-left transition-colors ${isSelected(
              value
            )}`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{value}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
