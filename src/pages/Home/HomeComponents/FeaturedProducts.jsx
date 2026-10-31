import { ChevronLeftIcon, ChevronRightIcon } from "../../../assets/icons";
import ProductCard from "../../../components/products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../store/Slices/productsSlice";
import { useEffect } from "react";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardSkeleton from "../../../components/products/ProductCardSkeleton";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((store) => store.products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  if (isLoading) {
    return (
      <section
        className="py-5"
        style={{ backgroundColor: "var(--color-bg-base)" }}
      >
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Featured Products</h2>
              <p className="text-muted mb-0 small">
                The latest and greatest in tech innovation.
              </p>
            </div>
          </div>

          <Swiper slidesPerView={4} slidesPerGroup={4}>
            {Array.from({ length: 4 }, (_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="py-5"
        style={{ backgroundColor: "var(--color-bg-base)" }}
      >
        <div
          className="container px-4 text-center"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <p className="text-danger mb-2">Failed to load featured products.</p>

          <p className="text-muted small">{error}</p>

          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => dispatch(fetchAllProducts())}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section
        className="py-5"
        style={{ backgroundColor: "var(--color-bg-base)" }}
      >
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Featured Products</h2>
              <p className="text-muted mb-0 small">
                The latest and greatest in tech innovation.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="prev-products btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Previous products"
              >
                <ChevronLeftIcon size={16} />
              </button>
              <button
                type="button"
                className="next-products btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                aria-label="Next products"
              >
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".prev-products",
              nextEl: ".next-products",
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = ".prev-products";
              swiper.params.navigation.nextEl = ".next-products";
            }}
            slidesPerGroup={4}
            slidesPerView={4}
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="col-12 col-sm-6 col-lg-3"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
