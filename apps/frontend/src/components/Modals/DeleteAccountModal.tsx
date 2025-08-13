import { useContext, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

import Modal from "../Commons/Modal";

import { Input } from "../Commons/Input";
import { Button } from "../Commons/Button";
import { toast } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const REQUIRED_TEXT = "Borrar Mi Cuenta";

export default function DeleteAccountDialog(props: DeleteAccountDialogProps) {
  const { setUserData } = useContext(AuthContext);

  const { open, onOpenChange } = props;

  const { process, isPending } = useFetch({
    tx: "DeleteUser",
    fnName: "delete-user",
  });
  const [confirmText, setConfirmText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(process(undefined), {
      error: "Error deleting account",
      pending: "Deleting account...",
      success: "Account deleted successfully",
    });

    setUserData(false);
    onOpenChange(false);
  };

  const isValid = confirmText === REQUIRED_TEXT;

  const footer = (
    <>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          onOpenChange(false);
          setConfirmText("");
        }}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        variant="destructive"
        disabled={!isValid || isPending}
        form="delete-account-form"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Borrar Cuenta
      </Button>
    </>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Borrar Cuenta
        </div>
      }
      description="Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos los datos asociados."
      footer={footer}
      size="md"
    >
      <div className="space-y-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-destructive mb-1">
                ¡Advertencia!
              </h4>
              <p className="text-sm text-destructive/80">
                Una vez que borres tu cuenta, no podrás recuperar ninguno de tus
                datos.
              </p>
            </div>
          </div>
        </div>

        <form
          id="delete-account-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Para confirmar, escribe{" "}
              <span className="font-semibold">"{REQUIRED_TEXT}"</span> en el
              campo de abajo:
            </label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={REQUIRED_TEXT}
              className={`${
                !isValid && confirmText.length > 0 ? "border-destructive" : ""
              }`}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
