import { Lock } from "lucide-react";
import { useState } from "react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Button } from "../Commons/Button";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Changing password...");
    onOpenChange(false);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const footer = (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
      >
        Cancelar
      </Button>
      <Button type="submit" form="change-password-form">
        Cambiar Contraseña
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Cambiar Contraseña
        </div>
      }
      description="Ingresa tu contraseña actual y tu nueva contraseña."
      footer={footer}
      size="md"
    >
      <form
        id="change-password-form"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Contraseña Actual
          </label>
          <Input
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            placeholder="Ingresa tu contraseña actual"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nueva Contraseña
          </label>
          <Input
            type="password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            placeholder="Ingresa tu nueva contraseña"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Confirmar Nueva Contraseña
          </label>
          <Input
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            placeholder="Confirma tu nueva contraseña"
            required
          />
        </div>
      </form>
    </Modal>
  );
}
