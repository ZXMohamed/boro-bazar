import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 10000,
    headers: {
        "ngrok-skip-browser-warning": "true",
    },
});

// Request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors and token expiration
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError<{ Status?: boolean; message?: string }>) => {
        if (error.response) {
            const { status, config, data } = error.response;
            const isLogoutRequest = config?.url?.includes("/logout");

            // Handle token expiration (401 Unauthorized)
            if (status === 401 && !isLogoutRequest) {
                localStorage.removeItem("authToken");
                window.location.href = "/login";
                console.error(
                    data?.message || "Session expired. Please log in again."
                );
            }

            if (status === 403) {
                console.error(
                    data?.message ||
                        "Access forbidden. Insufficient permissions."
                );
            }

            if (status >= 500) {
                console.error(
                    data?.message || "Server error. Please try again later."
                );
            }
        } else if (error.request) {
            console.error("Network error. Please check your connection.");
        }

        return Promise.reject(error);
    }
);

export default api;
