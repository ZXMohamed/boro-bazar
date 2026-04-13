import apiClient, { ApiError } from "@/lib/axios-instance";
import { AddAddressPayloadT, AddressT } from "@/types/address";
import { ApiResponse } from "@/types/api";
import "server-only";

export const addAddress = async (
  payload: AddAddressPayloadT
): Promise<AddressT> => {
  try {
    const response = await apiClient.post<ApiResponse<AddressT>>(
      "/user/addresses",
      payload
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to add address"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Add address error:", error);
    throw error;
  }
};
