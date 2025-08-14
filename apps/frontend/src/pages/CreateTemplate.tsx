import ReactQuill, { Quill } from "react-quill-new";

import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, Eye, Save } from "lucide-react";

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
import { ImageEditModal } from "../components/Modals/ImagePlaceholderModal";
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

  const [selectedImagePlaceholder, setSelectedImagePlaceholder] = useState<{
    element: HTMLElement;
    data: { name: string; width: number; height: number };
  } | null>(null);

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

  const { content, quillRef, setContent, handleChange } = useQuillEditor({
    initialValue: "<p>¡Empieza a escribir tu documento aquí!</p>",
    onChange: (content: string, delta: DeltaStatic) => {
      console.log("Contenido HTML:", content);
      console.log("Delta:", delta);
    },
  });

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
          setSelectedImagePlaceholder(null); // Nuevo placeholder
          openImagePlaceholderModal();
        },
      }),
    [isTagsModalOpen, isImagePlaceholderModalOpen]
  );

  const modulesWithHandlers = useMemo(
    () => createModulesWithHandlers(customHandlers),
    [customHandlers]
  );

  // Función para manejar clicks en placeholders existentes
  const handlePlaceholderClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const placeholderElement = target.closest(
      ".ql-image-placeholder"
    ) as HTMLElement;

    if (placeholderElement) {
      const data = {
        name: placeholderElement.getAttribute("data-placeholder-name") || "",
        width: parseInt(
          placeholderElement.getAttribute("data-width") || "300",
          10
        ),
        height: parseInt(
          placeholderElement.getAttribute("data-height") || "200",
          10
        ),
      };

      setSelectedImagePlaceholder({ element: placeholderElement, data });
      openImagePlaceholderModal();
    }
  };

  // Agregar event listener cuando el editor esté listo
  const handleEditorReady = () => {
    if (quillRef.current) {
      const editorContainer = quillRef.current.getEditor().container;
      editorContainer.addEventListener("click", handlePlaceholderClick);

      // Cleanup function
      return () => {
        editorContainer.removeEventListener("click", handlePlaceholderClick);
      };
    }
  };

  const handleApplyImageResize = (
    width: number,
    height: number,
    placeholderName?: string
  ) => {
    const editor = quillRef.current?.getEditor();

    if (!editor) {
      console.error("El editor Quill no está listo.");
      return;
    }

    // Validar y sanitizar los datos de entrada
    const safeData = {
      name: (placeholderName || "Imagen_Placeholder").replace(
        /[^a-zA-Z0-9_-]/g,
        ""
      ),
      width: Math.max(50, Math.min(width || 300, 1200)),
      height: Math.max(50, Math.min(height || 200, 800)),
    };

    console.log("📊 Datos sanitizados para inserción:", safeData);

    try {
      // CASO 1: Editando un placeholder existente
      if (selectedImagePlaceholder) {
        console.log("✏️ Editando placeholder existente");
        const { element } = selectedImagePlaceholder;

        // Encontrar el blot asociado
        const blot = Quill.find(element);
        console.log("🔍 Blot encontrado:", !!blot);

        if (blot) {
          // Obtener la posición del blot para reemplazarlo
          const index = editor.getIndex(blot);
          console.log("📍 Posición del blot:", index);

          // Eliminar el blot existente
          editor.deleteText(index, 1, Quill.sources.USER);

          // Insertar el nuevo con datos actualizados
          editor.insertEmbed(
            index,
            "imagePlaceholder",
            safeData,
            Quill.sources.USER
          );
          editor.setSelection(index + 1, Quill.sources.SILENT);
        }
      }
      // CASO 2: Insertando un nuevo placeholder
      else {
        console.log("➕ Insertando nuevo placeholder");

        const range = editor.getSelection(true);

        if (!range) {
          console.error("No hay selección válida");
          return;
        }

        console.log("📍 Posición de inserción:", range.index);
        console.log("📦 Datos a insertar:", safeData);

        // Verificar que el blot esté disponible antes de insertar
        const ImagePlaceholderBlot = Quill.import("blots/imagePlaceholder");
        if (!ImagePlaceholderBlot) {
          throw new Error("ImagePlaceholderBlot no está disponible");
        }

        console.log("✅ Blot disponible, insertando...");

        // Insertar el placeholder
        editor.insertEmbed(
          range.index,
          "imagePlaceholder", // Debe coincidir exactamente con blotName
          safeData,
          Quill.sources.USER
        );

        // Mover cursor
        editor.setSelection(range.index + 1, Quill.sources.SILENT);

        console.log("✅ Placeholder insertado exitosamente");
      }

      // Actualizar el contenido de React
      setTimeout(() => {
        setContent(editor.root.innerHTML);
      }, 100);

      // Limpiar estado y cerrar modal
      setSelectedImagePlaceholder(null);
      closeImagePlaceholderModal();
    } catch (error) {
      console.error("❌ Error principal:", error);

      // Fallback más simple: insertar como HTML directo
      try {
        console.log("🔄 Intentando fallback HTML...");

        const range = editor.getSelection(true);
        if (range) {
          // Crear HTML manualmente si el blot falla
          const placeholderHtml = `
            <div class="ql-image-placeholder" 
                 contenteditable="false"
                 data-name="${safeData.name}"
                 data-width="${safeData.width}"
                 data-height="${safeData.height}"
                 style="border: 2px dashed #ccc; border-radius: 8px; padding: 16px; margin: 8px 0; background: #f9f9f9; display: flex; align-items: center; justify-content: center; width: ${safeData.width}px; min-height: ${safeData.height}px; cursor: pointer;">
              <div style="text-align: center; color: #666;">
                <div style="font-size: 24px; margin-bottom: 8px;">🖼️</div>
                <div style="font-weight: 500;">{{${safeData.name}}}</div>
                <div style="font-size: 12px; color: #999; margin-top: 4px;">${safeData.width} × ${safeData.height}px</div>
              </div>
            </div>
          `;

          // Insertar como clipboard (más compatible)
          const clipboard = editor.getModule("clipboard");
          const delta = clipboard.convert({ html: placeholderHtml });
          editor.updateContents(
            delta.compose(editor.getContents().slice(range.index)),
            Quill.sources.USER
          );

          setTimeout(() => setContent(editor.root.innerHTML), 100);
          closeImagePlaceholderModal();
          setSelectedImagePlaceholder(null);

          console.log("✅ Fallback HTML exitoso");
        }
      } catch (fallbackError) {
        console.error("❌ Fallback también falló:", fallbackError);
        alert(`Error insertando placeholder: ${fallbackError.message}`);
      }
    }
  };

  const handleModalClose = () => {
    setSelectedImagePlaceholder(null);
    closeImagePlaceholderModal();
  };

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
                  onReady={handleEditorReady}
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
          onOpenChange={handleModalClose}
          currentWidth={selectedImagePlaceholder?.data.width || 300}
          currentHeight={selectedImagePlaceholder?.data.height || 200}
          currentName={selectedImagePlaceholder?.data.name}
          isNewImage={!selectedImagePlaceholder}
          onApply={handleApplyImageResize}
        />
      </div>
    </div>
  );
}
