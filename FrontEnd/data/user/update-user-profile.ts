import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { UpdateProfilePayloadT, UserT } from "@/types/user";
import "server-only";

export const updateUserProfile = async (
  payload: UpdateProfilePayloadT,
): Promise<UserT> => {
  try {
    const response = await apiClient.patch<ApiResponse<UserT>>(
      "/user/profile",
      payload,
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to update profile",
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Update user profile error:", error);
    throw error;
  }
};
