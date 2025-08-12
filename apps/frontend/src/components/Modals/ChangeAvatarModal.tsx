import React, { useState, useRef } from "react";
import { Upload, Camera, Trash2, User } from "lucide-react";

import Modal from "../Commons/Modal";

import { Button } from "../Commons/Button";
import { Avatar, AvatarImage, AvatarFallback } from "../Commons/Avatar";

interface ChangeAvatarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatar: string;
  userName: string;
  onAvatarChange: (newAvatar: string) => void;
}

export default function ChangeAvatarModal({
  open,
  onOpenChange,
  currentAvatar,
  userName,
  onAvatarChange,
}: ChangeAvatarModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setPreviewUrl("");
    setSelectedFile(null);
  };

  const handleSave = () => {
    if (selectedFile) {
      // En una aplicación real, aquí subirías el archivo al servidor
      // Por ahora simulamos guardando la URL del preview
      onAvatarChange(previewUrl);
    } else if (previewUrl === "") {
      // Avatar removido
      onAvatarChange("");
    }

    // Limpiar estado y cerrar modal
    setSelectedFile(null);
    setPreviewUrl(currentAvatar);
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Restaurar estado original
    setPreviewUrl(currentAvatar);
    setSelectedFile(null);
    onOpenChange(false);
  };

  const getInitials = () => {
    return userName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const footer = (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleCancel}>
        Cancelar
      </Button>
      <Button onClick={handleSave}>Guardar Cambios</Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Cambiar Imagen de Perfil"
      description="Sube una nueva imagen o elimina la actual"
      footer={footer}
      size="md"
    >
      <div className="space-y-6">
        {/* Preview Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src={previewUrl} />
              <AvatarFallback className="text-2xl">
                {previewUrl ? <User className="h-16 w-16" /> : getInitials()}
              </AvatarFallback>
            </Avatar>

            {previewUrl && (
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                onClick={handleRemoveAvatar}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              onClick={handleUploadClick}
              className="flex items-center gap-2 h-12"
            >
              <Upload className="h-5 w-5" />
              Subir Nueva Imagen
            </Button>

            <Button
              variant="outline"
              onClick={handleUploadClick}
              className="flex items-center gap-2 h-12"
            >
              <Camera className="h-5 w-5" />
              Tomar Foto
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* File Info */}
          {selectedFile && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* Guidelines */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Formatos soportados: JPG, PNG, GIF</p>
            <p>• Tamaño máximo: 5MB</p>
            <p>• Resolución recomendada: 400x400px</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
