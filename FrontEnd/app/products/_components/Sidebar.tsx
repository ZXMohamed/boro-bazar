import { getCategories } from "@/data/products/get-categories"
import CategoryFilter from "./filters/CategoryFilter"
import RatingFilter from "./filters/RatingFilter"
import { PriceFilter } from "./filters/PriceFilter"


export const Sidebar = async () => {
  const categories = await getCategories()

  return (
    <div className="flex flex-col space-y-3 w-[198px] ">
      <CategoryFilter categories={categories} />
      <PriceFilter />
      <RatingFilter />
    </div>
  )
}