import { MoreHorizontal, Eye, Edit, Power, Users, Trash2 } from "lucide-react";

import { Badge } from "../Commons/Badge";
import { Button } from "../Commons/Button";
import { DropdownMenu, DropdownMenuItem } from "../Commons/DropdownMenu";

import type { Templates } from "../../types/templates";
import { formatDistanceToNow } from "../../utils/time";

export const TemplateCard = (props: Templates) => {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div className="space-y-1">
        <h3 className="font-medium text-foreground">{props.name}</h3>
        <p className="text-sm text-muted-foreground">{props.description}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {props.templateType}
          </Badge>
          <Badge
            variant="outline"
            className="bg-accent/10 text-accent-foreground"
          >
            {props.isPublic ? "Public" : "Private"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            by {props.createdByName} •{" "}
            {formatDistanceToNow(new Date(props.createdAt))}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className={
            props.isActive
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }
        >
          {props.isActive ? "Active" : "Inactive"}
        </Badge>
        <DropdownMenu
          trigger={
            <Button variant="ghost" size="icon" aria-label="Template actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        >
          <DropdownMenuItem>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center">
              <Power className="h-4 w-4 mr-2" />
              Toggle Active
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Assign Users
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <div className="flex items-center">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Template
            </div>
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </div>
  );
};
