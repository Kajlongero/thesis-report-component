import ReactQuill, { type DeltaStatic } from "react-quill-new";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import type { RefObject } from "react";

import { PlaceholdersContext, QuillContext } from "../context";

import useModal from "../hooks/useModal";
import { useFetch } from "../hooks/useFetch";

import { Input } from "../components/Commons/Input";
import { Label } from "../components/Commons/Label";
import { Button } from "../components/Commons/Button";
import { QuillEditor } from "../components/Editor/Quill";
import { TemplatePreviewModal } from "../components/Modals/TemplatePreview";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/Commons/Card";

export function CreateTemplatePage() {
  const navigate = useNavigate();

  const { placeholders, clearPlaceholders } = useContext(PlaceholdersContext);

  const { content, quillRef, clearData, handleChange } =
    useContext(QuillContext);

  const { isPending, process } = useFetch({
    tx: "CreateTemplate",
    fnName: "create-template",
  });

  const [template, setTemplate] = useState({
    name: "",
    description: "",
    templateTypeId: 0,
    isPublic: true,
  });

  const {
    isOpen: isPreviewModalOpen,
    openModal: openPreviewModal,
    closeModal: closePreviewModal,
  } = useModal(false);

  const handleCreateTemplate = async () => {
    const delta = quillRef.current?.getEditor().getContents();
    const raw = quillRef.current?.editor?.root.innerHTML;

    const obj = {
      name: template.name || "Untitled Template",
      isPublic: template.isPublic || true,
      description: template.description || "No description",
      templateTypeId: template.templateTypeId || 1,
      templateDefinition: {
        raw,
        delta,
        placeholders,
      },
    };

    await toast.promise(process(obj), {
      error: "Error creating template",
      pending: "Creating template...",
      success: "Template created successfully",
    });

    navigate("/templates");
  };

  useEffect(() => {
    clearData();
  }, []);

  useEffect(() => {
    clearPlaceholders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-x-4 flex-col sm:flex-row">
        <div className="flex items-center gap-4">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => navigate("/templates")}
            disabled={isPending}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Crear Plantilla
            </h1>
            <p className="text-muted-foreground">
              Crea tu propia plantilla de reportes con el editor de Quill.js
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0 max-sm:flex-1 max-sm:w-full">
          <Button
            className="flex-1 cursor-pointer"
            variant="outline"
            onClick={openPreviewModal}
            disabled={isPending}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            className="bg-gradient-primary text-white flex-1 cursor-pointer"
            onClick={handleCreateTemplate}
            disabled={isPending}
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Plantilla
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="Enter template name..."
                  value={template.name}
                  onChange={(e) =>
                    setTemplate({ ...template, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  placeholder="Brief description..."
                  value={template.description}
                  onChange={(e) =>
                    setTemplate({ ...template, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="pb-12">
            <CardHeader>
              <CardTitle>Template Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <QuillEditor
                  value={content}
                  height="512px"
                  onChange={handleChange}
                  className="mb-4"
                  forwardedRef={quillRef as RefObject<ReactQuill>}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <TemplatePreviewModal
          open={isPreviewModalOpen}
          setOpen={closePreviewModal}
          content={content}
        />
      </div>
    </div>
  );
}
