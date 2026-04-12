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
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
};

/**
 * Create Axios Instance
 */
const apiClient: AxiosInstance = axios.create(axiosConfig);

/**
 * Request Interceptor
 * - Add authorization token
 * - Add custom headers
 * - Log requests in development
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from auth store
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
 * - Refresh token on 401
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
  async (error: AxiosError<ApiErrorResponse>) => {
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
     */
    if (status === 401) {
      const authStore = useAuthStore.getState();

      // Check if token refresh is needed
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh token
          const refreshResponse = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {},
            {
              headers: {
                "X-Request-ID": generateRequestId(),
              },
            },
          );

          const newToken = refreshResponse.data?.data?.token;

          if (newToken) {
            // Update token in store
            authStore.setToken(newToken);

            // Update authorization header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Retry original request
            return apiClient(originalRequest);
          }
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
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 403 Forbidden
     */
    if (status === 403) {
      return Promise.reject(
        new ApiError(
          403,
          data?.message ||
            "You do not have permission to access this resource.",
          data?.errors,
          error,
        ),
      );
    }

    /**
     * Handle 404 Not Found
     */
    if (status === 404) {
      return Promise.reject(
        new ApiError(
          404,
          data?.message || "Resource not found.",
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 409 Conflict
     */
    if (status === 409) {
      return Promise.reject(
        new ApiError(
          409,
          data?.message || "Resource conflict. Please try again.",
          data?.errors,
          error,
        ),
      );
    }

    /**
     * Handle 422 Unprocessable Entity (Validation Errors)
     */
    if (status === 422) {
      return Promise.reject(
        new ApiError(
          422,
          data?.message || "Validation failed.",
          data?.errors,
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
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 500+ Server Errors
     */
    if (status >= 500) {
      return Promise.reject(
        new ApiError(
          status,
          data?.message || "Server error. Please try again later.",
          undefined,
          error,
        ),
      );
    }

    /**
     * Handle 4xx Client Errors
     */
    if (status >= 400) {
      return Promise.reject(
        new ApiError(
          status,
          data?.message || "An error occurred. Please try again.",
          data?.errors,
          error,
        ),
      );
    }

    // Fallback error
    return Promise.reject(
      new ApiError(status, "An unexpected error occurred.", undefined, error),
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
