import { categories } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";
import CategoryCard from "./CategoryCard";

const TopCategories = () => {
  return (
    <section className="sec-layout flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <h2 className="text-xl font-medium capitalize">Top Categories</h2>

          <p className="text-base font-light opacity-70">
            New products with updated stocks.
          </p>
        </div>

        <Button
          asChild
          variant="ghost"
          className="text-sm font-normal opacity-80"
        >
          <Link href="/shop">
            View All <LuMoveRight />
          </Link>
        </Button>
      </div>

      <div className="hidden grid-cols-10 justify-between gap-5 lg:grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-[#FAFAFA] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-[#FAFAFA] to-transparent" />

        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="lg:hidden"
        >
          <CarouselContent className="py-2">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/4 pl-5 sm:basis-1/5 md:basis-1/6"
              >
                <CategoryCard category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TopCategories;
