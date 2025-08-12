import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Search } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/Commons/Card";
import { Input } from "../components/Commons/Input";
import { Button } from "../components/Commons/Button";
import { TemplatePreviewModal } from "../components/Modals/TemplatePreviewModal";
import { InfiniteScrollContainer } from "../components/Containers/InfiniteScroll";
import { TemplateCard } from "../components/Templates/Card";

export function TemplatesPage() {
  const navigate = useNavigate();

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

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
          <InfiniteScrollContainer
            tx="GetAllTemplates"
            fnName="get-all-templates-page"
            component={TemplateCard}
          />
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
