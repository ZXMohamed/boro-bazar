import {
  FeaturedProducts,
  HeroSec,
  LatestProducts,
  PopularProducts,
  TopCategories,
} from "@/components/home";
import Offers from "@/components/home/Offers";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <div className="bg-[#FAFAFA] pb-5">
        <HeroSec />
        <TopCategories />
      </div>

      <PopularProducts />
      <Offers />
      <LatestProducts />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
