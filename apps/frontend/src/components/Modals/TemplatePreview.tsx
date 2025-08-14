import { LayoutTemplate } from "lucide-react";
import Modal from "../Commons/Modal";

type Props = {
  content: string;

  open: boolean;
  setOpen: () => void;
};

export const TemplatePreviewModal = ({ open, content, setOpen }: Props) => {
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title={
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-5 w-5" />
          Visualización del template de Quill
        </div>
      }
      description="Ingresa tu contraseña actual y tu nueva contraseña."
      size="xl"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Vista Previa
        </h3>
        <div
          className="prose max-w-none border rounded p-4 bg-gray-50 min-h-32 ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Modal>
  );
};
