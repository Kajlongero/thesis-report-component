import {
  Copy,
  Trash,
  Share,
  Archive,
  Download,
  MoreHorizontal,
} from "lucide-react";

import type { Reports } from "../../types/reports";
import { formatDistanceToNow } from "../../utils/time";
import { Button } from "../Commons/Button";
import { DropdownMenu, DropdownMenuItem } from "../Commons/DropdownMenu";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-success/10 text-success border border-success/20";
    case "GENERATING":
    case "PENDING":
      return "bg-warning/10 text-warning border border-warning/20";
    case "FAILED":
    case "ERROR":
    case "CANCELLED":
      return "bg-destructive/10 text-destructive border border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
};

export const ReportCard = (props: Reports) => {
  return (
    <div
      key={props.id}
      className="border border-border rounded-lg p-4 space-y-3"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate flex-1">
              {props.title}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(
                props.formatName
              )}`}
            >
              {props.formatName}
            </span>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(
                props.statusName
              )}`}
            >
              {props.statusName}
            </span>
            <DropdownMenu
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              }
            >
              <DropdownMenuItem
                onClick={() => console.log("Download", props.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Share", props.id)}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Duplicate", props.id)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Archive", props.id)}
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Delete", props.id)}
                variant="destructive"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {props.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>by {props.authorName}</span>
          <span>•</span>
          <span>
            {formatDistanceToNow(new Date(props.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
