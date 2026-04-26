"use client"
import { FaStar } from "react-icons/fa6"
import { useFilters } from "../../_hooks/useFilters"
import { Input } from "@/components/ui/input"

const StarRating = () => {
  const { setRating, allRating } = useFilters()

  const isChecked = (value: number) => {
    return allRating.includes(value.toString())
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <div
          key={rating}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Input
            type="checkbox"
            checked={isChecked(rating)}
            onChange={() => setRating(rating.toString())}
            className="w-[17px] h-[17px] accent-emerald-600"
          />

          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>

          
        </div>
      ))}
    </div>
  )
}

export default StarRating