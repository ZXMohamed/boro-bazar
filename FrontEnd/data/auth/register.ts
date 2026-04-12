import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { RegisterPayloadT, RegisterResponseT } from "@/types/auth";
import "server-only";

export const register = async (
  payload: RegisterPayloadT
): Promise<RegisterResponseT> => {
  try {
    const response = await apiClient.post<ApiResponse<RegisterResponseT>>(
      "/auth/register",
      payload
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Registration failed"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
