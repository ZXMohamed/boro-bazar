import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

const HeroSec = () => {
  return (
    <section className="sec-layout flex w-full flex-col overflow-hidden py-6">
      <div className="grid grid-cols-1 items-center justify-between rounded-2xl bg-[#F6F2EF] md:grid-cols-2">
        {/* Text Content Area */}
        <div className="z-10 flex flex-col items-start p-7 lg:p-10">
          <span className="mb-6 inline-block rounded-md bg-linear-to-r from-green-600 via-transparent to-transparent px-3 py-2 text-xs font-semibold text-green-900 lg:text-sm">
            Weekend Discount
          </span>

          <h1 className="mb-5 text-3xl leading-snug font-bold tracking-tight opacity-80 md:text-4xl lg:text-5xl">
            Get the best quality products at the lowest prices
          </h1>

          <p className="mb-8 max-w-lg text-sm leading-relaxed font-semibold text-gray-600 lg:text-base">
            We have prepared special discounts for you on organic breakfast
            products.
          </p>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Button asChild className="h-fit gap-3 px-5 py-3 font-semibold">
              <Link
                href="/shop"
                className="text-sm shadow-sm transition-colors duration-200 hover:bg-[#00A891] lg:text-lg"
              >
                Shop Now <LuMoveRight />
              </Link>
            </Button>

            <div className="flex flex-col">
              <div className="flex items-end gap-2">
                <span className="text-destructive text-lg leading-none font-bold lg:text-2xl">
                  $21.67
                </span>
                <span className="text-sm leading-none font-semibold line-through lg:text-base">
                  $59.99
                </span>
              </div>
              <span className="mt-1.5 text-[10px] font-medium text-gray-400 lg:text-xs">
                Don&apos;t miss this limited time offer.
              </span>
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="hidden h-full overflow-hidden md:block">
          <Image
            src="/heroImg.png"
            alt="Wella Organics Super Omega Squares"
            className="relative top-10 -right-10 scale-125 object-contain xl:top-0 xl:-right-28 xl:scale-150"
            loading="eager"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
