import { Button } from "@/components/ui/button";
import { ProductT } from "@/types/product";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import Rate from "./Rate";

const ProductCard = ({ product }: { product: ProductT }) => {
  const { _id, image, slug, price, rating, name } = product;

  return (
    <Flex className="group max-w-55 flex-col gap-0 overflow-hidden rounded-sm border-none py-1.5 shadow-[0_2px_2px_0px_rgba(0,0,0,0.25)]">
      <Link
        href={`/shop/${slug ?? name}/${_id}`}
        className="transition-all duration-200 group-hover:scale-110"
      >
        <Image
          src={image.url}
          alt={name}
          width={200}
          height={172}
          className="aspect-video w-full rounded-sm object-cover py-1.5"
        />
      </Link>
      <Flex className="flex-col gap-3 px-3 py-1.5 text-sm font-bold">
        <Heading as="h3" className="line-clamp-1 text-[14px]!">
          {name}
        </Heading>
        {rating && <Rate rate={rating} />}
        <Flex className="items-center justify-between!">
          <Text className="text-focused-price">
            <bdi>$</bdi>
            {price}
          </Text>
        </Flex>
        <Button
          variant="outline"
          className="border-primary text-primary hover:text-primary text-sm font-bold"
        >
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProductCard;

//*example
//<ProductCard currency="$" product={{ id: "1", images: "/product1.png", inCart: false, originalPrice: 50.0, price: 40.0, rating: 3, slug: "product-1", name: "100 Percent Apple Juice – 64 fl oz Bottle" }} />
