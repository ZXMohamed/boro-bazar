"use client"
import Rate from "@/components/common/Rate"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const AddReview = () => {
  const [rating,setRating] = useState<number>(0)

  return (
    <div className="flex flex-col space-y-2 my-8">
      <h6 className="text-[15px] font-medium">Add a review</h6>
      <Textarea className="h-[170px] border border-[#D5D5D5] bg-[#FAFAFA]" placeholder="Write your review..." />
      <Rate editAble={true} rate={rating}  onChangeRate={setRating} />
      <Button className="bg-[#02B290] py-2 px-4 text-white max-w-fit">Submit Review</Button>
    </div>
  )
}

export default AddReview