import { useState } from "react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Label } from "../Commons/Label";
import { Button } from "../Commons/Button";

import type { InsertBasicPlaceholderOpts } from "../../hooks/useInserts";

interface InfoPlaceholderModalProps {
  open: boolean;
  onInsert: (data: InsertBasicPlaceholderOpts) => void;
  onOpenChange: (open: boolean) => void;
}

const metadataInitialState: InsertBasicPlaceholderOpts = {
  text: "",
  alias: "",
  field: "",
};

export const InfoPlaceholderModal = ({
  open,
  onOpenChange,
  onInsert,
}: InfoPlaceholderModalProps) => {
  const [metadata, setMetadata] =
    useState<InsertBasicPlaceholderOpts>(metadataInitialState);

  const { text, alias, field } = metadata;

  const handleInsert = () => {
    if (text && alias && field) {
      onInsert(metadata);
      setMetadata(metadataInitialState);
    }
  };

  const handleClose = () => {
    setMetadata(metadataInitialState);
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Insertar Placeholder de Dato"
      description="Define un placeholder para un único dato de texto."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="display-name">Texto a Mostrar</Label>
          <Input
            id="display-name"
            value={text}
            onChange={(e) => setMetadata({ ...metadata, text: e.target.value })}
            placeholder="Ej: Nombre del Cliente"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alias">Alias de la Fuente de Datos</Label>
          <Input
            id="alias"
            value={alias}
            onChange={(e) =>
              setMetadata({ ...metadata, alias: e.target.value })
            }
            placeholder="Ej: datos_cliente_1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="field-name">Nombre del Campo</Label>
          <Input
            id="field-name"
            value={field}
            onChange={(e) =>
              setMetadata({ ...metadata, field: e.target.value })
            }
            placeholder="Ej: nombre_completo"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleInsert} disabled={!text || !alias || !field}>
            Insertar Placeholder
          </Button>
        </div>
      </div>
    </Modal>
  );
};
