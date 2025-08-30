import { useState } from "react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Label } from "../Commons/Label";
import { Button } from "../Commons/Button";

import type { InsertBasicPlaceholderOpts } from "../../hooks/useInserts";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { Placeholder } from "../../types/placeholders";

interface InfoPlaceholderModalProps {
  open: boolean;
  onInsert: (data: Placeholder) => void;
  onOpenChange: (open: boolean) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "INFORMATION":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "TABLE":
      return "bg-green-100 text-green-800 border-green-200";
    case "IMAGE":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "CHART":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const InsertBasicPlaceholdersModal = ({
  open,
  onOpenChange,
  onInsert,
}: InfoPlaceholderModalProps) => {
  const { data: placeholders } = useFetchQuery<Placeholder[]>({
    tx: "GetAllPlaceholders",
    fnName: "get-all-placeholders",
    options: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });

  const handlePlaceholderClick = (placeholder: Placeholder) => {
    onInsert(placeholder);
    onOpenChange(false);
  };

  const handleClose = () => onOpenChange(false);

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Insertar Placeholder de Dato"
      description="Define un placeholder para un único dato de texto."
    >
      <div className="space-y-4">
        {placeholders && placeholders.data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No hay placeholders disponibles
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {placeholders &&
              placeholders.data.map((placeholder) => (
                <div
                  key={placeholder.id}
                  className="cursor-pointer hover:shadow-md transition-shadow p-4 bg-background border border-border rounded-lg shadow-sm"
                  onClick={() => handlePlaceholderClick(placeholder)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {placeholder.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                          placeholder.typeName
                        )}`}
                      >
                        {placeholder.typeName}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      Campo: {placeholder.field}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
