import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { LoginPayloadT, LoginResponseT } from "@/types/auth";
import "server-only";

export const login = async (
  payload: LoginPayloadT
): Promise<LoginResponseT> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponseT>>(
      "/auth/login",
      payload
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Login failed"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
