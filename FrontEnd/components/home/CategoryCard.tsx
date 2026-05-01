import { Skeleton } from "@/components/ui/skeleton";
import { CategoryT } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: CategoryT;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group flex flex-col gap-3"
    >
      <div className="bg-background relative aspect-square w-full items-center justify-center overflow-hidden rounded-sm p-[22%] shadow-[0px_1px_2px_0px_#00000040]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16.6vw, 10vw"
          className="object-contain p-[22%] transition-all duration-200 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3 className="text-center text-xs font-medium opacity-80 lg:text-sm">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryCard;

export const CategoryCardSkeleton = () => {
  return <Skeleton className="aspect-square w-full rounded-sm" />;
};
