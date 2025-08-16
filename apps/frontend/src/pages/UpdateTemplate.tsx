import ReactQuill from "react-quill-new";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";

import type { RefObject } from "react";
import type { DeltaStatic } from "react-quill-new";

import { PlaceholdersContext } from "../context";
import { createCustomHandlers } from "../config/Quill/handlers";
import { createModulesWithHandlers, formats } from "../config/Quill";

import { useFetch } from "../hooks/useFetch";

import useModal from "../hooks/useModal";
import useQuillEditor from "../hooks/useQuill";
import { useFetchQuery } from "../hooks/useFetchQuery";

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

import type { Templates, TemplateDefinition } from "../types/templates";

import "../quill.css";

export function UpdateTemplatePage() {
  const { placeholders, setPlaceholders } = useContext(PlaceholdersContext);
  const [templateDetails, setTemplateDetails] = useState({
    name: "",
    description: "",
  });
  const client = useQueryClient();
  const navigate = useNavigate();

  const { templateId } = useParams();

  const { data: template, isLoading: templateIsLoading } = useFetchQuery({
    tx: "GetTemplateById",
    fnName: "get-template-by-id",
    params: {
      id: templateId,
    },
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const { data, isPending, process } = useFetch({
    tx: "UpdateTemplate",
    fnName: "update-template",
  });

  const { content, quillRef, setContent, handleChange } = useQuillEditor({});

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
      }),
    [isTagsModalOpen, isImagePlaceholderModalOpen]
  );

  const modulesWithHandlers = useMemo(
    () => createModulesWithHandlers(customHandlers),
    [customHandlers]
  );

  const handleUpdateTemplate = async () => {
    const delta = quillRef.current?.getEditor().getContents();
    const raw = quillRef.current?.editor?.root.innerHTML;

    const updatePayload = {
      id: Number(templateId),
      ...templateDetails,
      templateDefinition: {
        raw,
        delta,
        placeholders,
      },
    };

    await toast.promise(process(updatePayload), {
      error: "Error updating template",
      pending: "Updating template...",
      success: "Template updated successfully",
    });

    if (data && !data.error) {
      const updatedTemplate = data.data as Templates;

      client.setQueryData(
        ["get-all-templates-page"],
        (oldData: Templates[] | undefined) => {
          if (!oldData) return [updatedTemplate];
          return oldData.map((t) =>
            t.id === updatedTemplate.id ? updatedTemplate : t
          );
        }
      );

      client.invalidateQueries({ queryKey: ["GetTemplateById", templateId] });
      navigate("/templates");
    }
  };

  useEffect(() => {
    return () => {
      setPlaceholders([], {} as DeltaStatic);
    };
  }, [setPlaceholders]);

  useEffect(() => {
    if (template && template.data) {
      const fetchedTemplate = template.data as Templates;
      setTemplateDetails({
        name: fetchedTemplate.name,
        description: fetchedTemplate.description,
      });

      const json = JSON.parse(fetchedTemplate.templateDefinition as string);
      const def = json as TemplateDefinition;

      setContent(def.raw);
      setPlaceholders(def.placeholders, def.delta);
    }
  }, [template, setContent, setPlaceholders]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-x-4 flex-col sm:flex-row">
        <div className="flex items-center gap-4">
          <Button
            className="cursor-pointer"
            disabled={isPending}
            variant="ghost"
            size="icon"
            onClick={() => navigate("/templates")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Actualizar Plantilla
            </h1>
            <p className="text-muted-foreground">Actualiza tu plantilla</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0 max-sm:flex-1 max-sm:w-full">
          <Button
            className="flex-1 cursor-pointer"
            variant="outline"
            onClick={openPreviewModal}
            disabled={isPending || templateIsLoading}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            disabled={isPending || templateIsLoading}
            className="bg-gradient-primary text-white flex-1 cursor-pointer"
            onClick={handleUpdateTemplate}
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
                  value={templateDetails.name}
                  onChange={(e) =>
                    setTemplateDetails({
                      ...templateDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  value={templateDetails.description}
                  id="template-description"
                  placeholder="Brief description..."
                  onChange={(e) =>
                    setTemplateDetails({
                      ...templateDetails,
                      description: e.target.value,
                    })
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
