import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { UserT } from "@/types/user";
import "server-only";

export const getUserProfile = async (): Promise<UserT> => {
  try {
    const response = await apiClient.get<ApiResponse<UserT>>("/user/profile");

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to fetch user profile",
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Get user profile error:", error);
    throw error;
  }
};
