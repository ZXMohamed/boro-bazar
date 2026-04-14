import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

const LatestProducts = () => {
  return (
    <section className="sec-layout flex flex-col gap-5 pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium capitalize">Latest Products</h2>
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
        {/* {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))} */}
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="lg:hidden"
      >
        <CarouselContent className="py-2">
          {/* {products.map((product) => (
                <CarouselItem key={product._id} className="basis-1/2 pl-5">
                  <ProductCard product={product} />
                </CarouselItem>
              ))} */}
        </CarouselContent>
        <CarouselPrevious className="top-8 left-2" />
        <CarouselNext className="top-8 right-2" />
      </Carousel>
    </section>
  );
};

export default LatestProducts;
