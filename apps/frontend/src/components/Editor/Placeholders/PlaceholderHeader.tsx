import React from "react";

interface PlaceholderHeaderProps {
  alias: string;
}

export const PlaceholderHeader: React.FC<PlaceholderHeaderProps> = ({
  alias,
}) => {
  return (
    <div className="border-b border-border pb-2 mb-2">
      <h3 className="text-lg font-medium text-foreground">Alias: {alias}</h3>
    </div>
  );
};
