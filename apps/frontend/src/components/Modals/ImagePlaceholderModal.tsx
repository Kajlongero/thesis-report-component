import { useState, useEffect } from "react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Label } from "../Commons/Label";
import { Button } from "../Commons/Button";
import { Switch } from "../Commons/Switch";

interface ImageEditModalProps {
  open: boolean;
  onOpenChange: () => void;
  currentWidth?: number;
  currentHeight?: number;
  currentName?: string;
  isNewImage?: boolean;
  onApply: (width: number, height: number, placeholderName?: string) => void;
}

export const ImageEditModal = (props: ImageEditModalProps) => {
  const {
    open,
    isNewImage = false,
    currentWidth = 300,
    currentHeight = 200,
    currentName = "Imagen_Placeholder",
    onApply,
    onOpenChange,
  } = props;

  const [imageModal, setImageModal] = useState({
    width: currentWidth,
    height: currentHeight,
    aspectRatio: currentWidth / currentHeight,
    placeholderName: currentName,
    maintainAspectRatio: false,
  });

  const [errors, setErrors] = useState({
    width: false,
    height: false,
    name: false,
  });

  // Validaciones
  const validateInputs = () => {
    const newErrors = {
      width: imageModal.width <= 0 || imageModal.width > 1200,
      height: imageModal.height <= 0 || imageModal.height > 800,
      name: !imageModal.placeholderName.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleWidthChange = (value: string) => {
    const newWidth = parseInt(value) || 0;

    if (imageModal.maintainAspectRatio && imageModal.aspectRatio) {
      const newHeight = Math.round(newWidth / imageModal.aspectRatio);
      setImageModal({
        ...imageModal,
        width: newWidth,
        height: newHeight,
      });
    } else {
      setImageModal({ ...imageModal, width: newWidth });
    }
  };

  const handleHeightChange = (value: string) => {
    const newHeight = parseInt(value) || 0;

    if (imageModal.maintainAspectRatio && imageModal.aspectRatio) {
      const newWidth = Math.round(newHeight * imageModal.aspectRatio);
      setImageModal({
        ...imageModal,
        height: newHeight,
        width: newWidth,
      });
    } else {
      setImageModal({ ...imageModal, height: newHeight });
    }
  };

  const handleNameChange = (value: string) => {
    // Limpiar caracteres no permitidos para nombres de placeholder
    const cleanName = value.replace(/[^a-zA-Z0-9_-]/g, "");
    setImageModal({ ...imageModal, placeholderName: cleanName });
  };

  const handleAspectRatioToggle = (checked: boolean) => {
    setImageModal({
      ...imageModal,
      maintainAspectRatio: checked,
      aspectRatio: imageModal.width / imageModal.height,
    });
  };

  const handleApply = () => {
    if (validateInputs()) {
      onApply(imageModal.width, imageModal.height, imageModal.placeholderName);
    }
  };

  const handleCancel = () => {
    // Resetear a valores originales
    setImageModal({
      width: currentWidth,
      height: currentHeight,
      aspectRatio: currentWidth / currentHeight,
      placeholderName: currentName,
      maintainAspectRatio: false,
    });
    setErrors({ width: false, height: false, name: false });
    onOpenChange();
  };

  // Actualizar estado cuando cambian las props
  useEffect(() => {
    if (open) {
      setImageModal({
        width: currentWidth,
        height: currentHeight,
        aspectRatio: currentWidth / currentHeight,
        placeholderName: currentName,
        maintainAspectRatio: false,
      });
      setErrors({ width: false, height: false, name: false });
    }
  }, [currentWidth, currentHeight, currentName, open]);

  return (
    <Modal
      open={open}
      onOpenChange={handleCancel}
      title={
        isNewImage ? "Insertar Imagen Placeholder" : "Editar Imagen Placeholder"
      }
      description={
        isNewImage
          ? "Configura las dimensiones y nombre del nuevo placeholder"
          : "Modifica las propiedades del placeholder seleccionado"
      }
    >
      <div className="space-y-6">
        {/* Nombre del placeholder */}
        <div className="space-y-2">
          <Label htmlFor="placeholder-name">
            Nombre del Placeholder
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="placeholder-name"
            type="text"
            value={imageModal.placeholderName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Imagen_Placeholder"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">
              El nombre es requerido y solo puede contener letras, números, _ y
              -
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Aparecerá como:{" "}
            <code className="bg-muted px-1 rounded">
              {`{{${imageModal.placeholderName || "nombre"}}}`}
            </code>
          </p>
        </div>

        {/* Dimensiones */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">
              Ancho (px)
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="width"
              type="number"
              value={imageModal.width}
              onChange={(e) => handleWidthChange(e.target.value)}
              placeholder="300"
              min="1"
              max="1200"
              className={errors.width ? "border-red-500" : ""}
            />
            {errors.width && (
              <p className="text-sm text-red-500">
                Ancho debe estar entre 1 y 1200px
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">
              Alto (px)
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="height"
              type="number"
              value={imageModal.height}
              onChange={(e) => handleHeightChange(e.target.value)}
              placeholder="200"
              min="1"
              max="800"
              className={errors.height ? "border-red-500" : ""}
            />
            {errors.height && (
              <p className="text-sm text-red-500">
                Alto debe estar entre 1 y 800px
              </p>
            )}
          </div>
        </div>

        {/* Vista previa */}
        <div className="space-y-2">
          <Label>Vista previa del tamaño</Label>
          <div className="border border-border rounded-lg p-4 bg-muted/30 flex items-center justify-center min-h-[120px] overflow-hidden">
            <div
              className="border-2 border-dashed border-primary bg-primary/10 flex flex-col items-center justify-center gap-2 min-w-[100px] min-h-[60px]"
              style={{
                width: Math.min(imageModal.width / 3, 200),
                height: Math.min(imageModal.height / 3, 133),
                maxWidth: "200px",
                maxHeight: "133px",
              }}
            >
              <span className="text-lg">🖼️</span>
              <span className="text-xs text-muted-foreground text-center px-2">
                {imageModal.placeholderName}
              </span>
              <span className="text-xs text-muted-foreground">
                {imageModal.width} × {imageModal.height}px
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Previsualización a escala 1:3
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            onClick={handleApply}
            disabled={
              imageModal.width <= 0 ||
              imageModal.height <= 0 ||
              !imageModal.placeholderName.trim()
            }
          >
            {isNewImage ? "Insertar Placeholder" : "Actualizar Placeholder"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
