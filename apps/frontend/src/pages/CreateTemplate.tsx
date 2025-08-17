import ReactQuill, { type DeltaStatic } from "react-quill-new";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, Save } from "lucide-react";

import type { RefObject } from "react";

import { PlaceholdersContext } from "../context";
import { createCustomHandlers } from "../config/Quill/handlers";
import { createModulesWithHandlers, formats } from "../config/Quill";

import { useFetch } from "../hooks/useFetch";

import useModal from "../hooks/useModal";
import useQuillEditor from "../hooks/useQuill";

import { Input } from "../components/Commons/Input";
import { Label } from "../components/Commons/Label";
import { Button } from "../components/Commons/Button";
import { QuillEditor } from "../components/Editor/Quill";
import { ImageEditModal } from "../components/Modals/ImagePlaceholderModal";
import { TemplatePreviewModal } from "../components/Modals/TemplatePreview";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "../components/Commons/Card";

import type { Templates } from "../types/templates";

import "../quill.css";

export function CreateTemplatePage() {
  const client = useQueryClient();
  const navigate = useNavigate();

  const { placeholders, setPlaceholders } = useContext(PlaceholdersContext);

  const { data, isPending, process } = useFetch({
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

  const {
    isOpen: isImagePlaceholderModalOpen,
    openModal: openImagePlaceholderModal,
    closeModal: closeImagePlaceholderModal,
  } = useModal(false);

  const { isOpen: isTagsModalOpen, openModal: setIsTagsModalOpen } =
    useModal(false);

  const {
    isOpen: isSqlModalOpen,
    openModal: setIsSqlModalOpen,
    closeModal: closeSqlModal,
  } = useModal(false);

  const { content, quillRef, setContent, handleChange } = useQuillEditor({});

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

    if (!isPending && !data?.error) {
      client.setQueryData(
        ["get-all-templates-page"],
        (oldData: Templates[]) => {
          const elem = data?.data as Templates;

          if (!oldData) return [elem];

          return [...oldData, elem];
        }
      );

      navigate("/templates");
    }
  };

  const customHandlers = useMemo(
    () =>
      createCustomHandlers({
        "custom-tags": () => {
          console.log("Is Modal Open", isTagsModalOpen);
          setIsTagsModalOpen();
        },
        "image-placeholder": () => {
          console.log(
            "Is Image Placeholder Modal Open",
            isImagePlaceholderModalOpen
          );
          openImagePlaceholderModal();
        },
        "sql-modal": () => {
          console.log("Is SQL Modal Open", isTagsModalOpen);
          setIsSqlModalOpen();
        },
      }),
    [isTagsModalOpen, isImagePlaceholderModalOpen, isSqlModalOpen]
  );

  const modulesWithHandlers = useMemo(
    () => createModulesWithHandlers(customHandlers),
    [customHandlers]
  );

  useEffect(() => {
    return () => {
      setPlaceholders([], {} as DeltaStatic);
    };
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
          <Card className="pb-4">
            <CardHeader>
              <CardTitle>Template Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <QuillEditor
                  value={content}
                  onChange={handleChange}
                  forwardedRef={quillRef as RefObject<ReactQuill>}
                  modules={modulesWithHandlers}
                  formats={formats}
                  placeholder="Escribe tu documento aquí..."
                  height="512px"
                  className="mb-4"
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
        <ImageEditModal
          open={isImagePlaceholderModalOpen}
          onOpenChange={
            isImagePlaceholderModalOpen
              ? closeImagePlaceholderModal
              : openImagePlaceholderModal
          }
          currentWidth={300}
          currentHeight={200}
          isNewImage={true}
          setContent={setContent}
          quillRef={quillRef as RefObject<ReactQuill>}
        />
      </div>
    </div>
  );
}
