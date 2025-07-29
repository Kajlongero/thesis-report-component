import { type LucideIcon } from "lucide-react";

import { cn } from "../../../utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  variant?: "default" | "gradient";
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
}: StatsCardProps) => {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-lg",
        variant === "gradient" &&
          "bg-gradient-primary text-white border-transparent"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={cn(
            "text-sm font-medium",
            variant === "gradient" ? "text-white/90" : "text-muted-foreground"
          )}
        >
          {title}
        </CardTitle>
        <Icon
          className={cn(
            "h-4 w-4",
            variant === "gradient" ? "text-white/80" : "text-muted-foreground"
          )}
        />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold",
            variant === "gradient" ? "text-white" : "text-foreground"
          )}
        >
          {value}
        </div>
        {change && (
          <p
            className={cn(
              "text-xs mt-1",
              variant === "gradient"
                ? "text-white/70"
                : {
                    "text-success": changeType === "positive",
                    "text-destructive": changeType === "negative",
                    "text-muted-foreground": changeType === "neutral",
                  }
            )}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
