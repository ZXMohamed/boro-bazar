import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { CartSummaryT } from "@/types/cart";
import "server-only";

export const getCartItems = async (): Promise<CartSummaryT> => {
  try {
    const response = await apiClient.get<ApiResponse<CartSummaryT>>("/cart");

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to fetch cart items"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Get cart items error:", error);
    throw error;
  }
};
