import {
  FeaturedProducts,
  HeroSec,
  LatestProducts,
  PopularProducts,
  TopCategories,
} from "@/components/home";
import Offers from "@/components/home/Offers";
import { getProducts } from "@/data/products/get-products";

const HomePage = async () => {
  const [allProducts, latestProducts] = await Promise.all([
    getProducts({ limit: 50 }), // fetch enough to filter from
    getProducts({ sort: "latest", limit: 6 }),
  ]);

  const popularProducts = allProducts
    .filter((p) => p.rating >= 4.5 && p.numReviews >= 5)
    .slice(0, 6);

  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <div className="space-y-10">
      <div className="bg-[#FAFAFA] pb-5">
        <HeroSec />
        <TopCategories />
      </div>

      <PopularProducts products={popularProducts} />
      <Offers />
      <LatestProducts products={latestProducts} />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
};

export default HomePage;
