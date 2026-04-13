import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { ProductT } from "@/types/product";
import "server-only";

export const getProduct = async (productId: string): Promise<ProductT> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductT>>(
      `/products/${productId}`
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Product not found"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error(`Get product ${productId} error:`, error);
    throw error;
  }
};
