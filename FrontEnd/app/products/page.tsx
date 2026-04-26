import { Sidebar } from "./_components/Sidebar";
import { ProductsList } from "./_components/ProductsList";
import { TSearchParams } from "./_types/type.products";


const ProductsPage = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const filters = await searchParams;
  
  return (
    <div className="container mx-auto flex gap-5 mt-6 ">
      <div className="w-[198px] ">
        <Sidebar />
      </div>
      <div className="grow">
        <ProductsList searchParams={filters} />
      </div>
    </div>
  );
};

export default ProductsPage;
