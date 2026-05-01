import "server-only";
import { TCategory } from "@/types/category";

export const getCategories = async (): Promise<TCategory[]> => {
  try {
    const res = await fetch(
      "https://dummyjson.com/products/categories",
      { cache: "no-store" }
    )

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Categories fetch failed:", error)
    return []
  }
}