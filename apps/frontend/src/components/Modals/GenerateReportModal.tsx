import React, { useState } from "react";

import { useTemplateData } from "../../hooks/useTemplateData";
import { useInfiniteApiQuery } from "../../hooks/useInfinityFetchQuery";

import Modal from "../Commons/Modal";

import { Button } from "../Commons/Button";
import { FormatSelector } from "../Reports/Modal/FormatSelector";
import { TemplateSelector } from "../Reports/Modal/TemplateSelector";
import { BasicInformation } from "../Reports/Modal/BasicInformation";
import { TemplateParameters } from "../Reports/Modal/TemplateParameters";

import type { Templates } from "../../types/templates";
import type { FormData, FormatOption } from "../../types/reportGeneration";
import {
  transformFormDataToPayload,
  validateRequiredParams,
} from "../../utils/reportsTransformation";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../../config/api";
import { fetchDownloadReport } from "../../utils/fetcher";

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EXPORT_FORMATS: FormatOption[] = [
  { value: "CSV", label: "CSV", description: "Comma Separated Values" },
  { value: "PDF", label: "PDF", description: "Portable Document Format" },
  { value: "HTML", label: "HTML", description: "Web Page" },
  { value: "XLSX", label: "XLSX", description: "Excel Spreadsheet" },
  { value: "DOCX", label: "DOCX", description: "Word Document" },
];

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    format: "PDF",
    templateId: null, // Ahora es null en lugar de string vacío
    dynamicFields: {},
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteApiQuery<Templates>({
      tx: "GetAllTemplates",
      fnName: "getAllTemplates",
      params: {},
    });

  const { process: generateReport } = useFetch({
    tx: "ProcessCreateReport",
    fnName: "process-generate-report",
  });

  const allTemplates = data?.pages?.flatMap((page) => page.data || []) || [];
  const { templateOptions, selectedTemplate, queryGroups } = useTemplateData(
    allTemplates,
    formData.templateId
  );

  const handleFieldChange = (
    field: keyof FormData,
    value: string | number | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDynamicFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: { ...prev.dynamicFields, [fieldId]: value },
    }));
  };

  const handleGenerate = async () => {
    const validation = validateRequiredParams(formData, queryGroups);
    if (!validation.isValid) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }

    const payload = transformFormDataToPayload(formData, queryGroups);
    const toastId = toast.loading("Generando tu reporte, por favor espera...");

    try {
      const { url } = await fetchDownloadReport("ProcessCreateReport", payload);

      const a = document.createElement("a");

      a.href = url;
      a.download = `report-${payload.name.toLowerCase()}-${Date.now()}.${payload.format.toLowerCase()}`;

      document.body.appendChild(a);

      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.update(toastId, {
        render: "¡Tu reporte se ha descargado!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      onOpenChange(false);
    } catch (error: any) {
      console.error("Error al generar el reporte:", error);
      toast.update(toastId, {
        render: `Error: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const isFormValid = formData.name.trim() && formData.templateId !== null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Generate New Report"
      description="Configure your report settings and data sources"
      size="lg"
    >
      <div className="space-y-6">
        <TemplateSelector
          value={formData.templateId}
          templates={templateOptions}
          selectedTemplate={selectedTemplate}
          isLoading={isLoading}
          isFetchingMore={isFetchingNextPage}
          hasMore={hasNextPage ?? false}
          onChange={(value) => handleFieldChange("templateId", value)}
          onLoadMore={fetchNextPage}
        />

        <BasicInformation
          name={formData.name}
          description={formData.description}
          onNameChange={(value) => handleFieldChange("name", value)}
          onDescriptionChange={(value) =>
            handleFieldChange("description", value)
          }
        />

        <TemplateParameters
          queryGroups={queryGroups}
          values={formData.dynamicFields}
          onChange={handleDynamicFieldChange}
        />

        <FormatSelector
          value={formData.format}
          formats={EXPORT_FORMATS}
          onChange={(value) => handleFieldChange("format", value)}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={!isFormValid}
          className="bg-gradient-primary text-white"
        >
          Generate Report
        </Button>
      </div>
    </Modal>
  );
};
