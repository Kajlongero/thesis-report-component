import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Eye, Edit, Power, Users, Trash2 } from "lucide-react";

import { Badge } from "../Commons/Badge";
import { Button } from "../Commons/Button";
import { DropdownMenu, DropdownMenuItem } from "../Commons/DropdownMenu";

import type { Templates } from "../../types/templates";
import { formatDistanceToNow } from "../../utils/time";
import { useFetch } from "../../hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";

export const TemplateCard = (props: Templates) => {
  const client = useQueryClient();
  const navigate = useNavigate();

  const {
    data: updateTemplateData,
    isPending: isPendingUpdateTemplate,
    process: updateTemplateProcess,
  } = useFetch({
    tx: "UpdateTemplate",
    fnName: "update-template-active",
  });

  const {
    data: deleteTemplateData,
    isPending: isPendingDeleteTemplate,
    process: deleteTemplateProcess,
  } = useFetch({
    tx: "DeleteTemplate",
    fnName: "delete-template",
  });

  const handleNavigate = () => navigate(`/templates/${props.id}`);

  const handleToggleActive = async () => {
    if (isPendingUpdateTemplate) return;

    const updatePayload = {
      id: props.id,
      isActive: !props.isActive,
    };

    await toast.promise(updateTemplateProcess(updatePayload), {
      error: "Error deleting template",
      pending: "Deleting...",
      success: "Template deleted successfully",
    });

    if (updateTemplateData && !updateTemplateData.error) {
      const updatedTemplate = updateTemplateData.data as Templates;

      client.setQueryData(["get-all-templates-page"], (oldData: any) => {
        const pages = oldData.pages[0];
        const data = pages.data as Templates[];

        const obj = {
          ...oldData,
          pages: [
            {
              ...pages,
              data: data.map((t: Templates) =>
                t.id === updatedTemplate.id ? updatedTemplate : t
              ),
            },
          ],
        };

        return obj;
      });
    }
  };

  const handleDeleteTemplate = async () => {
    if (isPendingDeleteTemplate) return;

    const updatePayload = {
      id: props.id,
    };

    await toast.promise(deleteTemplateProcess(updatePayload), {
      error: "Error updating the template active status",
      pending: "Updating template...",
      success: "Template updated successfully",
    });

    if (deleteTemplateData && !deleteTemplateData.error) {
      const updatedTemplate = deleteTemplateData.data as Templates;

      client.setQueryData(["get-all-templates-page"], (oldData: any) => {
        const pages = oldData.pages[0];
        const data = pages.data as Templates[];

        if (!data || !data.length) return [];

        const obj = {
          ...oldData,
          pages: [
            {
              ...pages,
              data: data.filter((t: Templates) => t.id !== updatedTemplate.id),
            },
          ],
        };

        return obj;
      });
    }
  };

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
          <DropdownMenuItem onClick={handleNavigate}>
            <div className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleActive}>
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
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDeleteTemplate}
          >
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
