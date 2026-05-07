import Rate from "@/components/common/Rate";
import { TReview } from "../_types/productDetails.type"
import AddReview from "./AddReview";

const Reviews = ({ reviews }: { reviews: TReview[] }) => {
    const getColor = (name: string) => {
        let hash = 0;

        for (let i = 0; i < name.length; i++) {
            hash += name.charCodeAt(i);
        }

        const hue = hash % 360;

        return `hsl(${hue}, 70%, 60%)`;
    };
    return (
        <div className="mt-8 w-full md:3/4 xl:w-2/4">
            {reviews.map((review) => {
                const date: Date = new Date(review.date);
                const formattedDate = new Intl.DateTimeFormat("en-GB")
                    .format(date)
                    .replace(/\//g, "-");
                console.log(review.reviewerName)
                const firstLetter = review.reviewerName[0]
                const spaceIndex = review.reviewerName.indexOf(" ")
                const secondLetter = review.reviewerName[spaceIndex + 1]

                const twoLetters = `${firstLetter}${secondLetter && secondLetter}`
                console.log(twoLetters)
                return (
                    <div key={`${review.reviewerName}-${review.date}`} className=" my-4 flex gap-4" >
                        <div style={{ backgroundColor: getColor(review.reviewerName) }} className="flex items-center justify-center w-[40px] h-[40px] rounded-full text-white font-meduim">
                            {twoLetters}
                        </div>

                        <div className="space-y-2 w-full">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col">
                                    <h3 className="text-[16px] font-semibold ">{review.reviewerName}</h3>
                                    <p className="text-[14px] font-400">{formattedDate}</p>
                                </div>
                                <Rate rate={review.rating} />
                            </div>
                            <p className="text-[14px] font-300">{review.comment}</p>
                        </div>


                    </div>
                )
            })}
            <AddReview />
        </div>
    )
}

export default Reviews