import type {
  FormData,
  GenerateReportPayload,
  QueryGroup,
} from "../types/reportGeneration";

export const transformFormDataToPayload = (
  formData: FormData,
  queryGroups: QueryGroup[]
): GenerateReportPayload => {
  const params: Record<string, any[]> = {};

  queryGroups.forEach((queryGroup) => {
    const queryId = queryGroup.queryId.toString();
    const fieldValue = formData.dynamicFields[queryGroup.fieldKey];

    if (fieldValue !== undefined && fieldValue.trim() !== "") {
      // Convertir el valor según el tipo de campo
      const transformedValue = transformFieldValue(
        fieldValue,
        queryGroup.inputType
      );

      // Si ya existe el queryId, agregar al array, sino crear nuevo array
      if (params[queryId]) {
        params[queryId].push(transformedValue);
      } else {
        params[queryId] = [transformedValue];
      }
    }
  });

  return {
    name: formData.name,
    description: formData.description,
    format: formData.format,
    templateId: formData.templateId as number,
    params,
  };
};

/**
 * Transforma el valor del campo según su tipo
 */
const transformFieldValue = (value: string, inputType: string): any => {
  switch (inputType.toLowerCase()) {
    case "number":
    case "integer":
      const numValue = parseFloat(value);
      return isNaN(numValue) ? value : numValue;

    case "boolean":
      return value.toLowerCase() === "true" || value === "1";

    case "date":
    case "datetime":
    case "datetime-local":
      return new Date(value).toISOString();

    case "json":
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }

    default:
      return value;
  }
};

/**
 * Valida si los parámetros requeridos están completos
 */
export const validateRequiredParams = (
  formData: FormData,
  queryGroups: QueryGroup[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields: string[] = [];

  queryGroups.forEach((queryGroup) => {
    const fieldValue = formData.dynamicFields[queryGroup.fieldKey];
    if (!fieldValue || fieldValue.trim() === "") {
      missingFields.push(queryGroup.label);
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};
