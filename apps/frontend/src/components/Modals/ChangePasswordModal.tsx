import { Lock } from "lucide-react";
import { useState } from "react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Button } from "../Commons/Button";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog(props: ChangePasswordDialogProps) {
  const { open, onOpenChange } = props;

  const { process, isPending } = useFetch({
    tx: "ChangeUserPassword",
    fnName: "change-user-password",
  });

  const [passwords, setPasswords] = useState({
    confirm: "",
    newPassword: "",
    oldPassword: "",
    closeAllSessions: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(
      process({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        closeAllSessions: passwords.closeAllSessions,
      }),
      {
        error: "Error changing password",
        pending: "Changing password...",
        success: "Password changed successfully",
      }
    );
  };

  const footer = (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => onOpenChange(false)}
      >
        Cancelar
      </Button>
      <Button type="submit" form="change-password-form" disabled={isPending}>
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
            value={passwords.oldPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, oldPassword: e.target.value })
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
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
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
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <input
              id="close-other-sessions"
              type="checkbox"
              checked={passwords.closeAllSessions}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  closeAllSessions: e.target.checked,
                })
              }
              className="h-4 w-4 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
            <label
              htmlFor="close-other-sessions"
              className="text-sm text-foreground"
            >
              Cerrar todas las otras sesiones abiertas
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
}
