import type { DeltaStatic } from "react-quill-new";
import type { Placeholder } from "./placeholders";

export type TemplateDefinition = {
  raw: string;
  delta: DeltaStatic;
  placeholders: Placeholder[];
};

export type Templates = {
  id: number;
  name: string;
  isPublic: boolean;
  isActive: boolean;
  createdAt: string;
  description: string;
  templateType: string;
  templateTypeId: number;
  createdByName: string;
  templateDefinition: TemplateDefinition | string;
  placeholders: Placeholder[];
};
