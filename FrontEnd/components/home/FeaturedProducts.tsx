import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductT } from "@/types/product";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";
import ProductCard from "../common/ProductCard";

const products: ProductT[] = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    slug: "",
    description: "Crisp and sweet organic apples sourced from local farms.",
    category: "fruits-vegetables",
    images: ["/product1.png", "/product1.png"],
    price: 120,
    originalPrice: 150,
    inCart: false,
    rating: 4.5,
    reviews: 32,
    stock: 25,
  },
  {
    id: "2",
    name: "Premium Beef Steak",
    slug: "",
    description: "High-quality fresh beef steak, perfect for grilling.",
    category: "meats-seafood",
    images: ["/product1.png", "/product1.png"],
    price: 350,
    originalPrice: 400,
    inCart: false,
    rating: 4.7,
    reviews: 18,
    stock: 12,
  },
  {
    id: "3",
    name: "Full Cream Milk 1L",
    slug: "",
    description: "Rich and creamy full-fat milk for daily use.",
    category: "breakfast-dairy",
    images: ["/product1.png", "/product1.png"],
    price: 30,
    originalPrice: 35,
    inCart: false,
    rating: 4.3,
    reviews: 54,
    stock: 40,
  },
  {
    id: "4",
    name: "Whole Wheat Bread",
    slug: "",
    description: "Freshly baked healthy whole wheat bread.",
    category: "breads-bakery",
    images: ["/product1.png", "/product1.png"],
    price: 25,
    originalPrice: 30,
    inCart: false,
    rating: 4.2,
    reviews: 21,
    stock: 30,
  },
  {
    id: "5",
    name: "Orange Juice 1L",
    slug: "",
    description: "Refreshing natural orange juice with no added sugar.",
    category: "beverages",
    images: ["/product1.png", "/product1.png"],
    price: 45,
    originalPrice: 55,
    inCart: false,
    rating: 4.6,
    reviews: 27,
    stock: 20,
  },
  {
    id: "6",
    name: "Frozen Chicken Nuggets",
    slug: "",
    description: "Crispy frozen chicken nuggets, quick and easy meal.",
    category: "frozen-foods",
    images: ["/product1.png", "/product1.png"],
    price: 90,
    originalPrice: 110,
    inCart: false,
    rating: 4.4,
    reviews: 39,
    stock: 15,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="sec-layout flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium capitalize">Featured Products</h2>

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

      <div className="hidden grid-cols-6 gap-3.5 lg:grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} currency="$" />
        ))}
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="lg:hidden"
      >
        <CarouselContent className="py-2">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 pl-5 md:basis-1/3"
            >
              <ProductCard product={product} currency="$" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-8 left-2" />
        <CarouselNext className="top-8 right-2" />
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;
