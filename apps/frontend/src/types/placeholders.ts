export interface Placeholder {
  id: string;
  raw: string; // ej: "{{type:'table';alias:'ventas'}}"
  alias: string; // ej: "ventas"
  queryIds: string[]; // Los ids de la query que el usuario asigna
}
