export interface ApiResponse<T = unknown> {
  success: boolean;
  results: number;
  data: T;
  count?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  timestamp?: string;
}
