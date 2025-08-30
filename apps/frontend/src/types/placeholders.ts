export type QueryItem = {
  id: number;
  query: string;
};

export interface Placeholder {
  id: number;
  name: string;
  field: string;
  typeId: number;
  queryId: number;
  metadata: object;
  typeName: string;
  createdAt: string;
  updatedAt?: string;
  queryText?: string;
  query: {
    id: number;
    field: string;
    fieldType: string;
    fieldPlaceholder: string;
    queryText: string;
  };
}
