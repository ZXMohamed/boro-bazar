import apiClient, { ApiError } from "@/lib/axios-instance";
import { AddressT } from "@/types/address";
import { ApiResponse } from "@/types/api";
import "server-only";

export const getAddresses = async (): Promise<AddressT[]> => {
  try {
    const response = await apiClient.get<ApiResponse<AddressT[]>>(
      "/user/addresses"
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to fetch addresses"
      );
    }

    return response.data.data || [];
  } catch (error) {
    console.error("Get addresses error:", error);
    throw error;
  }
};
