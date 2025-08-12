import React from "react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../Commons/Card";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change?: string;
  loading?: boolean;
  variant?: "default" | "gradient";
  changeType?: "positive" | "negative" | "neutral";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
  loading = false,
}) => {
  const cardClassName =
    variant === "gradient"
      ? "bg-gradient-primary text-white border-transparent"
      : "";

  const titleClassName =
    variant === "gradient" ? "text-white/90" : "text-muted-foreground";

  const iconClassName =
    variant === "gradient" ? "text-white/80" : "text-muted-foreground";

  const valueClassName =
    variant === "gradient" ? "text-white" : "text-foreground";

  const getChangeClassName = () => {
    if (variant === "gradient") return "text-white/70";

    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cardClassName}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${titleClassName}`}>
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${iconClassName}`} />
      </CardHeader>
      <CardContent>
        {!loading ? (
          <>
            <div className={`text-2xl font-bold ${valueClassName}`}>
              {value}
            </div>
            {change && (
              <p className={`text-xs mt-1 ${getChangeClassName()}`}>{change}</p>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center items-center min-h-8 pb-4 pt-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
