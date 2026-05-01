import ProductList from "@/components/common/ProductList";
import ProductListItem from "@/components/common/ProductListItem";

const MyListPage = () => {
  return (
    <ProductList
      title="My List"
      description="There are 4 products in your My List"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductListItem
          key={index}
          product={{
            id: "1",
            brand: "Fortune",
            name: "Fortune Sunlite Refined Sunflower Oil 1 L",
            images: ["/product1.png"],
            rating: 3.5,
            originalPrice: 54,
            price: 45,
          }}
          currency="$"
          className="px-6"
        />
      ))}
    </ProductList>
  );
};

export default MyListPage;
