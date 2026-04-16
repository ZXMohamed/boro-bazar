import { Button } from "@/components/ui/button";
import { ProductT } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Rate from "./Rate";

const ProductCard = ({ product }: { product: ProductT }) => {
  const { id, name, images, price, rating, stock, originalPrice, slug } =
    product;

  return (
    <Card className="gap-0 rounded-sm border-none p-0 pt-4 shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
      <Image
        src={images[0]}
        alt={name}
        width={200}
        height={175}
        className="rounded-sm aspect-square w-full"
      />
      <CardContent className="flex flex-col gap-3 p-5 text-sm font-bold">
        <Link
          href={`/shop/${slug}/${id}`}
          className="line-clamp-1"
          title={name}
        >
          {name}
        </Link>
        <div className="flex items-center gap-1">
          <Rate rate={rating} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-destructive">${price}</span>
          <span className="text-muted-price">${originalPrice}</span>
        </div>
        <Button
          variant="outline"
          disabled={stock === 0}
          className="border-primary text-primary hover:text-primary text-sm font-bold"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
