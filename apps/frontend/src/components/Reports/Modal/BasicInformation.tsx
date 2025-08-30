import React from "react";

import { Label } from "../../Commons/Label";
import { Input } from "../../Commons/Input";

interface BasicInformationProps {
  name: string;
  description: string;

  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const BasicInformation: React.FC<BasicInformationProps> = ({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="report-name">Report Name</Label>
        <Input
          id="report-name"
          placeholder="Enter report name..."
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="report-description">Description</Label>
        <textarea
          id="report-description"
          placeholder="Describe what this report contains..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
};
