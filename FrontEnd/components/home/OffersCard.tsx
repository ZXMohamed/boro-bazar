import Image from "next/image";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";
import { Button } from "../ui/button";
import { OfferT } from "./Offers";

const OffersCard = ({ offer }: { offer: OfferT }) => {
  return (
    <div className="relative z-10 overflow-hidden rounded-md bg-[#f7f5e9] px-5 py-8 last:md:col-span-2 last:lg:col-span-1">
      <div className="absolute -right-28 bottom-0 -z-10 size-full">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 55vw, 25vw"
        />
      </div>

      <div className="flex w-56 flex-col gap-3">
        <span className="text-sm font-semibold text-[#ea5f17] capitalize">
          Only This Week
        </span>
        <p className="text-xl leading-tight font-bold">{offer.title}</p>
        <p className="text-sm text-[#878c96]">{offer.sub_title}</p>
        <Button
          asChild
          variant="ghost"
          className="w-fit rounded-full bg-white font-semibold hover:bg-white/80"
        >
          <Link href="/shop">
            <span>Shop Now</span>
            <LuMoveRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OffersCard;
