export type ApiResponse<T> = {
  data: T;
  error: string;
  message: string;
  statusCode: number;
};

export type ApiCursorResponse<T> = {
  data: T[];
  message: string;
  statusCode: number;
  pagination: {
    nextCursor: string | null;
    hasNextPage: boolean;
    actualCursor: string | null;
  };
};
