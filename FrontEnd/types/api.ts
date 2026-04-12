export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
  statusCode?: number;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}
