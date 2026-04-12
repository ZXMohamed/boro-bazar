import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { ChangePasswordPayloadT, ChangePasswordResponseT } from "@/types/user";
import "server-only";

export const updateUserPassword = async (
  payload: ChangePasswordPayloadT
): Promise<ChangePasswordResponseT> => {
  try {
    const response = await apiClient.post<ApiResponse<ChangePasswordResponseT>>(
      "/user/change-password",
      payload
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to change password"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
};
