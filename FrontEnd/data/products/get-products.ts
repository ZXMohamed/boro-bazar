import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { ProductsParamsT, ProductsResponseT } from "@/types/product";
import "server-only";

export const getProducts = async (
  params?: ProductsParamsT
): Promise<ProductsResponseT> => {
  try {
    const response = await apiClient.get<ApiResponse<ProductsResponseT>>(
      "/products",
      { params }
    );

    if (!response.data.success) {
      throw new ApiError(
        response.status,
        response.data.message || "Failed to fetch products"
      );
    }

    return response.data.data!;
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};
