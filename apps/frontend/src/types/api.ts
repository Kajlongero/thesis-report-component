export type ApiResponse<T> = {
  data: T;
  error: string;
  message: string;
  statusCode: number;
};
