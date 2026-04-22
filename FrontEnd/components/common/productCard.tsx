import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Rate from "./Rate";
import { ProductT } from "@/types/product";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { FaShoppingCart } from "react-icons/fa";


interface ProductInterface {
  product: ProductT,
  currency: string;
}

const ProductCard = ({ product: { id = "", images = [""], name = "", slug = "", rating = 0, price = 0, originalPrice = 0, inCart = false }, currency = "" }: ProductInterface) => {

  if (id.length === 0) return <></>;
  
  return (
    <Flex className="max-w-55 flex-col gap-0 rounded-sm border-none py-1.5 shadow-[0_2px_2px_0px_rgba(0,0,0,0.25)]">
      <Link href={`/shop/${slug??name}/${id}`}>
        <Image src={images[0]} alt={name} width={200} height={172} className="w-full rounded-sm py-1.5" />
        <Heading as="h3" className="line-clamp-2 px-3 py-1.5 text-[14px]!">{name}</Heading>
      </Link>
      <Flex className="flex-col gap-3 px-3 py-1.5 text-sm font-bold">
        {rating && <Rate rate={rating} />}
        <Flex className="items-center justify-between!">
          <Text className="text-focused-price">
            <bdi>{currency}</bdi>
            {price}
          </Text>
          {originalPrice && <Text className="text-muted-price">
            <bdi>{currency}</bdi>
            {originalPrice}
          </Text>}
        </Flex>
        {inCart ? (
          <Flex className="bg-primary items-center justify-center! rounded-md px-4 py-2 text-white">
            <FaShoppingCart size={"20px"} />
          </Flex>
        ) : (
          <Button variant="outline" className="border-primary text-primary hover:text-primary text-sm font-bold">Add to Cart</Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductCard;

//*example 
//<ProductCard currency="$" product={{ id: "1", images: "/product1.png", inCart: false, originalPrice: 50.0, price: 40.0, rating: 3, slug: "product-1", name: "100 Percent Apple Juice – 64 fl oz Bottle" }} />
