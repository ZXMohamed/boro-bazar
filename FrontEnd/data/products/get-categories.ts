/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient, { ApiError } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/api";
import { CategoryT } from "@/types/product";
import "server-only";

export const getCategories = async (): Promise<CategoryT[]> => {
  try {
    const response =
      await apiClient.get<ApiResponse<CategoryT[]>>("/api/categories");

    const { data, success } = response.data;

    if (!success) {
      throw new ApiError(
        response.status || 400,
        "Failed to fetch categories",
        "FETCH_ERROR",
      );
    }

    if (!Array.isArray(data)) {
      throw new ApiError(
        500,
        "Invalid response format: expected array",
        "INVALID_FORMAT",
      );
    }

    return data;
  } catch (error) {
    console.error("Get categories error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      "Failed to fetch categories",
      "UNKNOWN_ERROR",
      undefined,
      error instanceof Error ? (error as any) : undefined,
    );
  }
};
