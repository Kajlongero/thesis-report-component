import { useState } from "react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Label } from "../Commons/Label";
import { Button } from "../Commons/Button";

interface TablePlaceholderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (alias: string) => void;
}

export const TablePlaceholderModal = ({
  open,
  onOpenChange,
  onApply,
}: TablePlaceholderModalProps) => {
  const [alias, setAlias] = useState("ventas_mensuales");

  const handleApply = () => {
    if (alias) {
      onApply(alias);
      onOpenChange(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={() => onOpenChange(false)}
      title="Insertar Placeholder de Tabla"
      description="Define el alias que se usará para enlazar esta tabla con una fuente de datos."
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="table-alias">Alias de la Tabla</Label>
          <Input
            id="table-alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Ej: ventas_mensuales"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button onClick={handleApply} disabled={!alias}>
          Insertar Tabla
        </Button>
      </div>
    </Modal>
  );
};
