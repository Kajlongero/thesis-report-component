export type QueryItem = {
  id: number;
  query: string;
};

export interface Placeholder {
  id?: string;
  raw: string; // ej: "{{type:'table';alias:'ventas'}}"
  name: string; // ej: "ventas"
  type: string; // ej: "table"
  alias: string; // ej: "ventas"
  fields: string[];
  queryIds: QueryItem[]; // Los ids de la query que el usuario asigna
}
