import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@radix-ui/themes";

const ProductCardSkeleton = () => {
  return (
    <Card className="gap-0 rounded-sm border-none p-0 pt-4 shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
      <Skeleton className="aspect-square w-full rounded-sm" />
      <CardContent className="flex flex-col gap-3 p-5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;