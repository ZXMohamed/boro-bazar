import { Button } from "@/components/ui/button";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Rate from "./rate";

type productDataType = {
  id: string;
  image: string;
  title: string;
  slug?: string | null;
  rate?: number | null;
  price: number;
  oldPrice?: number | null;
  inCart: boolean;
}

interface ProductInterface {
  data: productDataType,
  currency: string;
}

const ProductCard = ({ data: { id = "", image = "", title = "", slug = null, rate = null, price = 0, oldPrice = null, inCart = false }, currency = "" }: ProductInterface) => {

  if (id.length === 0) return <></>;
  
  return (
    <Flex className="max-w-50 flex-col gap-0 rounded-sm border-none py-1.5 shadow-[0_2px_2px_0px_rgba(0,0,0,0.25)]">
      <Link href={`/shop/${slug??title}/${id}`}>
        <Image src={image} alt={title} width={200} height={172} className="w-full rounded-sm py-1.5" />
        <Heading as="h3" className="line-clamp-2 px-3 py-1.5 text-[14px]!">{title}</Heading>
      </Link>
      <Flex className="flex-col gap-3 px-3 py-1.5 text-sm font-bold">
        {rate && <Rate rate={rate} />}
        <Flex className="items-center justify-between!">
          <Text className="text-focused-price">
            <bdi>{currency}</bdi>
            {price}
          </Text>
          {oldPrice && <Text className="text-muted-price">
            <bdi>{currency}</bdi>
            {oldPrice}
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
//<ProductCard currency="$" data={{ id: "1", image: "/product1.png", inCart: false, oldPrice: 50.0, price: 40.0, rate: 3, slug: "product-1", title: "100 Percent Apple Juice – 64 fl oz Bottle" }} />