import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../custom/Card";

const data = [
  { name: "Jan", reports: 65, resolved: 58 },
  { name: "Feb", reports: 78, resolved: 70 },
  { name: "Mar", reports: 90, resolved: 85 },
  { name: "Apr", reports: 81, resolved: 78 },
  { name: "May", reports: 95, resolved: 88 },
  { name: "Jun", reports: 110, resolved: 102 },
  { name: "Jul", reports: 125, resolved: 115 },
];

export const ReportsChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Reports Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly reports and resolution trends
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                name="Total Reports"
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="hsl(var(--success))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--success))", r: 4 }}
                name="Resolved Reports"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
