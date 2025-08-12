import {
  Copy,
  Trash,
  Share,
  Archive,
  Download,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "../Commons/Button";
import { DropdownMenu, DropdownMenuItem } from "../Commons/DropdownMenu";
import { Card, CardContent, CardHeader, CardTitle } from "../Commons/Card";

import { formatDistanceToNow } from "../../utils/time";

const recentReports = [
  {
    id: 1,
    title: "Financial Report Q4 2024",
    category: "financial",
    format: "PDF",
    status: "completed",
    generatedBy: "Sarah Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    description: "Quarterly revenue analysis and department budget breakdown",
  },
  {
    id: 2,
    title: "User Activity Analytics",
    category: "analytics",
    format: "XLSX",
    status: "generating",
    generatedBy: "Michael Chen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    description: "Monthly user engagement metrics and behavior patterns",
  },
  {
    id: 3,
    title: "Customer Database Export",
    category: "users",
    format: "CSV",
    status: "completed",
    generatedBy: "Emma Wilson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    description: "Complete customer information with contact details",
  },
  {
    id: 4,
    title: "Sales Performance Report",
    category: "financial",
    format: "HTML",
    status: "completed",
    generatedBy: "David Brown",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    description: "Monthly sales targets vs actual performance analysis",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success/10 text-success border border-success/20";
    case "generating":
      return "bg-warning/10 text-warning border border-warning/20";
    case "failed":
      return "bg-destructive/10 text-destructive border border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
};

const getFormatColor = (format: string) => {
  switch (format) {
    case "PDF":
      return "bg-destructive/10 text-destructive border border-destructive/20";
    case "XLSX":
      return "bg-success/10 text-success border border-success/20";
    case "CSV":
      return "bg-primary/10 text-primary border border-primary/20";
    case "HTML":
      return "bg-warning/10 text-warning border border-warning/20";
    case "DOCX":
      return "bg-accent/10 text-accent-foreground border border-accent/20";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
};

export const RecentReports = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Reports</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate flex-1">
                      {report.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(
                        report.format
                      )}`}
                    >
                      {report.format}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                    <DropdownMenu
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                    >
                      <DropdownMenuItem
                        onClick={() => console.log("Download", report.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Share", report.id)}
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Duplicate", report.id)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Archive", report.id)}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Delete", report.id)}
                        variant="destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>by {report.generatedBy}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(report.createdAt, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
