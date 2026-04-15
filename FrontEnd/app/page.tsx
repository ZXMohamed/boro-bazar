import {
  FeaturedProducts,
  HeroSec,
  LatestProducts,
  PopularProducts,
  TopCategories,
} from "@/components/home";


const HomePage = () => {
  return (
    <>
      <div className="bg-[#FAFAFA] pb-6">
        <HeroSec />
        <TopCategories />
      </div>

      <PopularProducts />
      <LatestProducts />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
