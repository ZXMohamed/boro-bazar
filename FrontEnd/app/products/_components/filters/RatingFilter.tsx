"use client"

import { useState } from "react";
import HeadingProductsSidebar from "./HeadingProductsSidebar";
import StarRating from "./StarRating";


const RatingFilter = () => {

    const [open, setOpen] = useState(true);
    return (
        <div>
            <div>
                <HeadingProductsSidebar title='Filter By Rating' open={open} setOpen={setOpen} />
                <div className={`${open ? 'overflow-y-auto max-h-[200px]' : 'overflow-y-hidden max-h-0'} transition-all duration-300 ease-in-out `}>
                    <StarRating />
                </div>
            </div>
        </div>
    )
}
export default RatingFilter