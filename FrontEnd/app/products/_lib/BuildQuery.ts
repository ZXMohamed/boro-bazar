import { TSearchParams } from "../_types/type.products"

export const BuildQuery = (params: TSearchParams) => {
  const query = new URLSearchParams()

  if (params.category) {
    const cats = Array.isArray(params.category) ? params.category : [params.category]
    cats.forEach(c => query.append("category", c))
  }

  if (params.rating) {
    const rates = Array.isArray(params.rating) ? params.rating : [params.rating]
    rates.forEach(r => query.append("rating", r))
  }

  if (params.minPrice) query.set("minPrice", params.minPrice)
  if (params.maxPrice) query.set("maxPrice", params.maxPrice)
  if (params.sort) query.set("sort", params.sort)
  if (Number(params.page) > 1) query.set("page", String(params.page))

  return query.toString()
}