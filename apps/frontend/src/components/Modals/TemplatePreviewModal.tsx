import Modal from "../Commons/Modal";

interface TemplatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateName: string;
  templateContent: string;
  templateDescription?: string;
}

export const TemplatePreviewModal = ({
  open,
  onOpenChange,
  templateName,
  templateContent,
  templateDescription,
}: TemplatePreviewModalProps) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={`Preview: ${templateName}`}
      description={templateDescription}
      size="xl"
    >
      <div className="max-h-96 overflow-y-auto">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              templateContent ||
              '<p class="text-muted-foreground">No content available</p>',
          }}
        />
      </div>
    </Modal>
  );
};
