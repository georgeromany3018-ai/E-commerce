import HeroSection from "./HomeComponents/HeroSection";
import TopCategory from "./HomeComponents/TopCategory";
import FeaturedProducts from "./HomeComponents/FeaturedProducts";
import PromoSection from "./HomeComponents/PromoSection";

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <TopCategory />
      <FeaturedProducts />
      <PromoSection />
    </div>
  );
}
