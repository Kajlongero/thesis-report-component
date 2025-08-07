export type User = {
  id: number;
  role: string;
  email: string;
  isActive: boolean;
  lastName: string;
  firstName: string;
  permissions: {
    id: number;
    name: string;
  }[];
};
