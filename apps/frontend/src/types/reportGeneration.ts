import { type Placeholder } from "./placeholders";

export interface FormData {
  name: string;
  format: string;
  templateId: number | null;
  description: string;
  dynamicFields: Record<string, string>;
}

export interface FormatOption {
  value: string;
  label: string;
  description: string;
}

export interface QueryGroup {
  queryId: number;
  fieldKey: string;
  label: string;
  placeholder: string;
  inputType: string;
  placeholderFields: string[];
  query: Placeholder["query"];
}

export interface GenerateReportPayload {
  name: string;
  format: string;
  templateId: number;
  description: string;
  params: Record<string, any[]>;
}
