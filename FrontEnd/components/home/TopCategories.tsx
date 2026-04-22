import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CategoryT } from "@/types/product";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";
import CategoryCard from "./CategoryCard";

export const categories: CategoryT[] = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    image: "/image.png",
    slug: "fruits-vegetables",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Meats & Seafood",
    image: "/image.png",
    slug: "meats-seafood",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Breakfast & Dairy",
    image: "/image.png",
    slug: "breakfast-dairy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Breads & Bakery",
    image: "/image.png",
    slug: "breads-bakery",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Beverages",
    image: "/image.png",
    slug: "beverages",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Frozen Foods",
    image: "/image.png",
    slug: "frozen-foods",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "7",
    name: "Biscuits & Snacks",
    image: "/image.png",
    slug: "biscuits-snacks",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "8",
    name: "Grocery & Staples",
    image: "/image.png",
    slug: "grocery-staples",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "9",
    name: "Baby & Pregnancy",
    image: "/image.png",
    slug: "baby-pregnancy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "10",
    name: "Healthcare",
    image: "/image.png",
    slug: "healthcare",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

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
