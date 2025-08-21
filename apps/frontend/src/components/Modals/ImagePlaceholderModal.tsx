import { Quill } from "react-quill-new";
import { useState, useEffect } from "react";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import type { RefObject } from "react";
import type ReactQuill from "react-quill-new";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Label } from "../Commons/Label";
import { Button } from "../Commons/Button";
import { BLOTS_LIST } from "../../config/Quill/Blots";

interface ImageEditModalProps {
  open: boolean;
  quillRef: RefObject<ReactQuill>;

  isNewImage?: boolean;
  currentWidth?: number;
  currentHeight?: number;
  onOpenChange: () => void;
}

export const ImageEditModal = (props: ImageEditModalProps) => {
  const {
    open,
    quillRef,
    isNewImage = false,
    currentWidth = 300,
    currentHeight = 200,
    onOpenChange,
  } = props;

  const [imageModal, setImageModal] = useState({
    width: currentWidth,
    height: currentHeight,
    imageAlign: "left",
    aspectRatio: currentWidth / currentHeight,
    placeholderName: "Imagen_Placeholder",
    maintainAspectRatio: false,
  });

  const handleWidthChange = (value: string) => {
    const newWidth = parseInt(value) || 0;

    setImageModal({ ...imageModal, width: newWidth });
  };

  const handleHeightChange = (value: string) => {
    const newHeight = parseInt(value) || 0;

    setImageModal({ ...imageModal, height: newHeight });
  };

  const handleApply = () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection(true);
    let insertIndex = range.index;

    if (range.index > 0) {
      const [_, offset] = editor.getLine(range.index);
      if (offset > 0) {
        editor.insertText(range.index, "\n", Quill.sources.USER);
        insertIndex++;
      }
    }

    editor.insertEmbed(
      insertIndex,
      BLOTS_LIST.IMAGE_PLACEHOLDER.BLOT_NAME,
      {
        name: imageModal.placeholderName
          .replaceAll("{", "")
          .replaceAll("}", ""),
        width: imageModal.width,
        height: imageModal.height,
        align: imageModal.imageAlign,
      },
      Quill.sources.USER
    );
    editor.setSelection(insertIndex + 1, Quill.sources.SILENT);
  };

  useEffect(() => {
    setImageModal({
      ...imageModal,
      width: currentWidth,
      height: currentHeight,
      aspectRatio: currentWidth / currentHeight,
    });
  }, [currentWidth, currentHeight, open]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Insertar Imagen Placeholder"
      description="Ajusta el tamaño de la imagen especificando las dimensiones exactas"
    >
      <div className="space-y-6">
        {isNewImage && (
          <div className="space-y-2">
            <Label htmlFor="placeholder-name">Nombre del Placeholder</Label>
            <Input
              id="placeholder-name"
              type="text"
              value={imageModal.placeholderName}
              onChange={(e) =>
                setImageModal({
                  ...imageModal,
                  placeholderName: e.target.value,
                })
              }
              placeholder="Imagen_Placeholder"
            />
            <p className="text-sm text-muted-foreground">
              Este será el nombre del placeholder que aparecerá como:
              {`${imageModal.placeholderName}`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Ancho (px)</Label>
            <Input
              id="width"
              type="number"
              value={imageModal.width}
              onChange={(e) => handleWidthChange(e.target.value)}
              placeholder="300"
              min="1"
              max="1200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Alto (px)</Label>
            <Input
              id="height"
              type="number"
              value={imageModal.height}
              onChange={(e) => handleHeightChange(e.target.value)}
              placeholder="200"
              min="1"
              max="800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Alineación</Label>
          <div className="flex items-center gap-2 rounded-md bg-gray-100 p-1">
            <Button
              variant={imageModal.imageAlign === "left" ? "secondary" : "ghost"}
              size="sm"
              onClick={() =>
                setImageModal({ ...imageModal, imageAlign: "left" })
              }
              className="flex-1"
            >
              <AlignLeft className="h-4 w-4 mr-2" />
              Izquierda
            </Button>
            <Button
              variant={
                imageModal.imageAlign === "center" ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() =>
                setImageModal({ ...imageModal, imageAlign: "center" })
              }
              className="flex-1"
            >
              <AlignCenter className="h-4 w-4 mr-2" />
              Centro
            </Button>
            <Button
              variant={
                imageModal.imageAlign === "right" ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() =>
                setImageModal({ ...imageModal, imageAlign: "right" })
              }
              className="flex-1"
            >
              <AlignRight className="h-4 w-4 mr-2" />
              Derecha
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Vista previa del tamaño</Label>
          <div className="border border-border rounded-lg p-4 bg-muted/30 flex items-center justify-center min-h-[100px]">
            <div
              className="border-2 border-dashed border-primary bg-primary/10 flex items-center justify-center"
              style={{
                width: Math.min(imageModal.width / 2, 300),
                height: Math.min(imageModal.height / 2, 200),
              }}
            >
              <span className="text-xs text-muted-foreground">
                {imageModal.width} × {imageModal.height}px
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onOpenChange}>
            Cancelar
          </Button>
          <Button
            onClick={() => handleApply()}
            disabled={imageModal.width <= 0 || imageModal.height <= 0}
          >
            Insertar Placeholder
          </Button>
        </div>
      </div>
    </Modal>
  );
};
