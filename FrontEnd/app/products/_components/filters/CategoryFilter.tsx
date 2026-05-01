"use client"
import { useState } from "react"
import HeadingProductsSidebar from "./HeadingProductsSidebar"
import { Input } from "@/components/ui/input";
import { useFilters } from "../../_hooks/useFilters";
import { TCategory } from "@/types/category";

const CategoryFilter = ({categories}: {categories: TCategory[]}) => {
  const [open, setOpen] = useState(true);
  const { updateCategory, allCategories } = useFilters()
  const isChecked = (category: TCategory) => {
    return allCategories.includes(category.slug)
  }

  const categoryList = categories?.map((category: TCategory) => {
    return (
      <div key={category.slug} className='flex gap-3 items-center my-2 '>
        <Input type='checkbox' id={category.slug}
          checked={isChecked(category)}
          className='bg-none shadow-none w-[17px] h-[17px] border-[#D5D5D5] accent-emerald-600 ' 
          onChange={() => updateCategory(category.slug)}
        />
        <label htmlFor={category.slug} className='text-[14px] font-400 text-black'>{category.name}</label>
      </div>

    )
  })
  return (
   <div>
  <HeadingProductsSidebar title='Shop by Category' open={open} setOpen={setOpen} />

  <div
    className={`
      transition-all duration-300 ease-in-out mr-2
      ${open ? 'overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent  max-h-[250px]' 
        : 'overflow-hidden max-h-0 '}
    `}
  >
    {categoryList}
  </div>
</div>
  )
}

export default CategoryFilter