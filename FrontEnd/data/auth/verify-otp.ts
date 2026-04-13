import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { VerifyOtpPayloadT, VerifyOtpResponseT } from "@/types/auth";
import "server-only";

export const verifyOtp = async (
  payload: VerifyOtpPayloadT
): Promise<VerifyOtpResponseT> => {
  try {
    const response = await apiClient.post<ApiResponse<VerifyOtpResponseT>>(
      "/auth/verify-otp",
      payload
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "OTP verification failed"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};
