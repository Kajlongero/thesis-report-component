import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Plus,
  Edit,
  Users,
  Power,
  Filter,
  Search,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/Commons/Card";
import { Badge } from "../components/Commons/Badge";
import { Input } from "../components/Commons/Input";
import { Button } from "../components/Commons/Button";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "../components/Commons/DropdownMenu";
import { TemplatePreviewModal } from "../components/Modals/TemplatePreviewModal";

export function TemplatesPage() {
  const navigate = useNavigate();
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const mockTemplates = [
    {
      id: 1,
      name: "Report Template #1",
      description:
        "Monthly performance analysis for financial departments and key metrics tracking",
      category: "Financial",
      frequency: "Monthly",
      status: "Active",
      content:
        "<h1>Monthly Financial Report</h1><p>This is a sample template content with <strong>formatting</strong>.</p><table><tr><th>Metric</th><th>Value</th></tr><tr><td>Revenue</td><td>$100,000</td></tr></table>",
      createdAt: "2 days ago",
    },
    {
      id: 2,
      name: "Report Template #2",
      description:
        "Weekly marketing performance analysis and campaign tracking",
      category: "Marketing",
      frequency: "Weekly",
      status: "Active",
      content:
        "<h1>Marketing Report</h1><p>Campaign performance overview...</p>",
      createdAt: "1 week ago",
    },
    {
      id: 3,
      name: "Report Template #3",
      description: "Daily operations summary and KPI monitoring",
      category: "Operations",
      frequency: "Daily",
      status: "Inactive",
      content: "<h1>Operations Summary</h1><p>Daily operational metrics...</p>",
      createdAt: "3 days ago",
    },
    {
      id: 4,
      name: "Report Template #4",
      description: "Quarterly HR analytics and employee performance",
      category: "HR",
      frequency: "Quarterly",
      status: "Active",
      content: "<h1>HR Analytics</h1><p>Employee performance data...</p>",
      createdAt: "1 month ago",
    },
    {
      id: 5,
      name: "Report Template #5",
      description: "Annual financial summary and budget analysis",
      category: "Financial",
      frequency: "Annual",
      status: "Active",
      content:
        "<h1>Annual Financial Summary</h1><p>Comprehensive budget analysis...</p>",
      createdAt: "2 weeks ago",
    },
  ];

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleEdit = (templateId: number) => {
    navigate(`/templates/edit/${templateId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-4 max-sm:flex-col sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">
            Manage report templates with Quill.js editor
          </p>
        </div>
        <Button
          className="bg-gradient-primary text-white"
          onClick={() => navigate("/templates/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between max-sm:flex-col sm:items-center gap-4">
            <CardTitle>All Templates</CardTitle>
            <div className="flex items-center max-sm:flex-col max-sm:items-start gap-2">
              <div className="relative max-sm:w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      {template.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-accent/10 text-accent-foreground"
                    >
                      {template.frequency}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Created {template.createdAt}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      template.status === "Active"
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }
                  >
                    {template.status}
                  </Badge>
                  <DropdownMenu
                    trigger={
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <DropdownMenuItem onClick={() => handlePreview(template)}>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(template.id)}>
                      <div className="flex items-center">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Toggle Status")}
                    >
                      <div className="flex items-center">
                        <Power className="h-4 w-4 mr-2" />
                        Toggle Status
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Assign Users")}
                    >
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Assign Users
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Delete")}
                      variant="destructive"
                    >
                      <div className="flex items-center">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Template
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TemplatePreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        templateName={selectedTemplate?.name || ""}
        templateContent={selectedTemplate?.content || ""}
        templateDescription={selectedTemplate?.description}
      />
    </div>
  );
}
