import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { AddToCartPayloadT, AddToCartResponseT } from "@/types/cart";
import "server-only";

export const addItemToCart = async (
  payload: AddToCartPayloadT
): Promise<AddToCartResponseT> => {
  try {
    const response = await apiClient.post<ApiResponse<AddToCartResponseT>>(
      "/cart/add-item",
      payload
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to add item to cart"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};
