import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Save } from "lucide-react";

import type ReactQuill from "react-quill-new";
import type { RefObject } from "react";
import type { DeltaStatic } from "react-quill-new";

import useQuillEditor from "../hooks/useQuill";

import { createCustomHandlers } from "../config/Quill/handlers";
import { createModulesWithHandlers, formats } from "../config/Quill";

import useModal from "../hooks/useModal";
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

import "../quill.css";

export function CreateTemplatePage() {
  const navigate = useNavigate();

  const {
    isOpen: isPreviewModalOpen,
    openModal: openPreviewModal,
    closeModal: closePreviewModal,
  } = useModal(false);

  const { isOpen: isTagsModalOpen, openModal: setIsTagsModalOpen } =
    useModal(false);

  const { content, handleChange, quillRef } = useQuillEditor({
    initialValue: "<p>¡Empieza a escribir tu documento aquí!</p>",
    onChange: (content: string, delta: DeltaStatic) => {
      console.log("Contenido HTML:", content);
      console.log("Delta:", delta);
    },
  });

  // const handleGetDelta = () => {
  //   const delta = getDelta();
  //   console.log("Delta actual:", JSON.stringify(delta, null, 2));
  // };

  const customHandlers = useMemo(
    () =>
      createCustomHandlers({
        "custom-tags": () => {
          console.log("Is Modal Open", isTagsModalOpen);
          setIsTagsModalOpen();
        },
      }),
    [isTagsModalOpen]
  );

  const modulesWithHandlers = useMemo(
    () => createModulesWithHandlers(customHandlers),
    [customHandlers]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-x-4 flex-col sm:flex-row">
        <div className="flex items-center gap-4">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => navigate("/templates")}
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
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            className="bg-gradient-primary text-white flex-1 cursor-pointer"
            onClick={() => console.log("Save Template")}
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
                  value={""}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  placeholder="Brief description..."
                  value={""}
                  onChange={(e) => console.log(e.target.value)}
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
      </div>
    </div>
  );
}
