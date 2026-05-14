/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/authStore";
import { ApiErrorResponse, ApiResponse } from "@/types/api";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * Custom Error Class for API errors
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public errors?: Record<string, string[]>,
    public originalError?: AxiosError,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Axios Configuration
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with every request (cookie-based auth)
};

/**
 * Create Axios Instance
 */
const apiClient: AxiosInstance = axios.create(axiosConfig);

/**
 * Request Interceptor
 * - Add custom headers
 * - Log requests in development
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add request ID for tracking
    config.headers["X-Request-ID"] = generateRequestId();

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        {
          data: config.data,
          params: config.params,
        },
      );
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("[Request Interceptor Error]", error);
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * - Handle success responses
 * - Handle various error scenarios
 * - Refresh token on 401 (via cookie-based refresh endpoint)
 * - Logout on 401 (permanent)
 * - Retry failed requests
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[API Response] ${response.status} ${response.config.url}`,
        response.data,
      );
    }

    return response;
  },
  async (
    error: AxiosError<
      ApiErrorResponse | { success: boolean; message: string; code?: string }
    >,
  ) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Network error (no response)
    if (!error.response) {
      console.error("[Network Error]", error.message);

      return Promise.reject(
        new ApiError(
          0,
          "Network error. Please check your connection.",
          undefined,
          undefined,
          error,
        ),
      );
    }

    const { status, data } = error.response;

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error(
        `[API Error] ${status} ${error.config?.url}`,
        error.response.data,
      );
    }

    /**
     * Handle 401 Unauthorized
     * Attempt a silent token refresh via the cookie-based refresh endpoint.
     * The backend sets the new auth cookie in the response automatically.
     */
    if (status === 401) {
      const authStore = useAuthStore.getState();

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Cookie is sent automatically via withCredentials; backend rotates
          // the auth cookie and responds with 200 on success.
          await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {},
            {
              withCredentials: true,
              headers: {
                "X-Request-ID": generateRequestId(),
              },
            },
          );

          // Retry the original request — the refreshed cookie will be sent
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("[Token Refresh Failed]", refreshError);
        }
      }

      // If token refresh failed or retry already attempted, logout
      authStore.logout();

      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login?expired=true";
      }

      return Promise.reject(
        new ApiError(
          401,
          "Session expired. Please login again.",
          "UNAUTHORIZED",
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 403 Forbidden
     */
    if (status === 403) {
      const errorData = data as any;
      return Promise.reject(
        new ApiError(
          403,
          errorData?.message ||
            "You do not have permission to access this resource.",
          errorData?.code,
          errorData?.errors,
          error,
        ),
      );
    }

    /**
     * Handle 404 Not Found
     */
    if (status === 404) {
      const errorData = data as any;
      return Promise.reject(
        new ApiError(
          404,
          errorData?.message || "Resource not found.",
          errorData?.code,
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 409 Conflict
     */
    if (status === 409) {
      const errorData = data as any;
      return Promise.reject(
        new ApiError(
          409,
          errorData?.message || "Resource conflict. Please try again.",
          errorData?.code,
          errorData?.errors,
          error,
        ),
      );
    }

    /**
     * Handle 422 Unprocessable Entity (Validation Errors)
     */
    if (status === 422) {
      const errorData = data as any;
      return Promise.reject(
        new ApiError(
          422,
          errorData?.message || "Validation failed.",
          errorData?.code,
          errorData?.errors,
          error,
        ),
      );
    }

    /**
     * Handle 429 Too Many Requests (Rate Limiting)
     */
    if (status === 429) {
      return Promise.reject(
        new ApiError(
          429,
          "Too many requests. Please try again later.",
          "RATE_LIMITED",
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 500+ Server Errors
     */
    if (status >= 500) {
      const errorData = data as any;
      return Promise.reject(
        new ApiError(
          status,
          errorData?.message || "Server error. Please try again later.",
          errorData?.code,
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 4xx Client Errors
     */
    if (status >= 400) {
      const errorData = data as any;
      return Promise.reject(
        new ApiError(
          status,
          errorData?.message || "An error occurred. Please try again.",
          errorData?.code,
          errorData?.errors,
          error,
        ),
      );
    }

    // Fallback error
    return Promise.reject(
      new ApiError(
        status,
        "An unexpected error occurred.",
        "UNKNOWN_ERROR",
        undefined,
        error,
      ),
    );
  },
);

/**
 * Utility Functions
 */

/**
 * Generate unique request ID for tracking
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if response is successful
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

/**
 * Get error code
 */
export function getErrorCode(error: unknown): string | undefined {
  if (isApiError(error)) {
    return error.code;
  }
  return undefined;
}

/**
 * Get validation errors from API response
 */
export function getValidationErrors(
  error: unknown,
): Record<string, string[]> | null {
  if (isApiError(error) && error.errors) {
    return error.errors;
  }

  return null;
}

/**
 * Retry request with exponential backoff
 */
export async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx except 429)
      if (
        isApiError(error) &&
        error.statusCode >= 400 &&
        error.statusCode < 500 &&
        error.statusCode !== 429
      ) {
        throw error;
      }

      // Calculate exponential backoff delay
      const delay = baseDelay * Math.pow(2, i);

      if (i < maxRetries - 1) {
        console.log(
          `Retrying request (attempt ${i + 2}/${maxRetries}) after ${delay}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Cancel pending requests
 */
const cancelTokenMap = new Map<
  string,
  ReturnType<typeof axios.CancelToken.source>
>();

/**
 * Create cancelable request
 */
export function createCancelableRequest(key: string) {
  const cancelSource = axios.CancelToken.source();
  cancelTokenMap.set(key, cancelSource);
  return cancelSource;
}

/**
 * Cancel request by key
 */
export function cancelRequest(key: string) {
  const cancelSource = cancelTokenMap.get(key);
  if (cancelSource) {
    cancelSource.cancel(`Request cancelled: ${key}`);
    cancelTokenMap.delete(key);
  }
}

/**
 * Cancel all pending requests
 */
export function cancelAllRequests() {
  cancelTokenMap.forEach((cancelSource) => {
    cancelSource.cancel("All requests cancelled");
  });
  cancelTokenMap.clear();
}

export default apiClient;
