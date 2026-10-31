import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../../assets/icons";
import laptobs from "../../../assets/laptops.png";
import watch from "../../../assets/watch.png";
import mobile_accessories from "../../../assets/mobile-accessories.png";
import Home_Decoration from "../../../assets/Home_Decoration.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../../store/Slices/CategoriesSlice";
import { useEffect } from "react";
import CategorySkeleton from "../../../components/products/CategorySkeleton";

export default function TopCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const { categories, isLoading, error } = useSelector(
    (store) => store.categories,
  );

  if (isLoading) {
    return (
      <section className="py-5">
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Top Categories</h2>
              <p className="text-muted mb-0 small">
                Curated gear for every lifestyle.
              </p>
            </div>

            <Link
              to="/products"
              className="fw-semibold d-inline-flex align-items-center gap-1"
              style={{ color: "var(--color-primary)" }}
            >
              See All <ArrowRightIcon size={16} />
            </Link>
          </div>

          <CategorySkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div
          className="container px-4 text-center"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <p className="text-danger mb-2">Failed to load categories.</p>

          <p className="text-muted small">{error}</p>

          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => dispatch(fetchAllCategories())}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }
  if (!categories[6] || !categories[9] || !categories[10] || !categories[4]) {
    return null;
  }

  return (
    <div>
      <section className="py-5">
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Top Categories</h2>
              <p className="text-muted mb-0 small">
                Curated gear for every lifestyle.
              </p>
            </div>

            <Link
              to="/products"
              className="fw-semibold d-inline-flex align-items-center gap-1"
              style={{ color: "var(--color-primary)" }}
            >
              See All <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="row g-4">
            {/* Computing - Large Card */}
            <div className="col-12 col-md-6">
              <Link
                to="/products?category=laptobs"
                className="text-decoration-none"
              >
                <div
                  className="category-tile-card h-100"
                  style={{ minHeight: "360px" }}
                >
                  <img
                    src={laptobs}
                    alt="Laptops"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />

                  <div className="category-tile-content">
                    <h3 className="category-tile-title">
                      {categories[6].name}
                    </h3>
                    <p className="category-tile-subtitle">
                      Work and play without limits.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Stack: 2 Small + 1 Wide */}
            <div className="col-12 col-md-6 d-flex flex-column gap-4">
              <div className="row g-4">
                <div className="col-6">
                  <Link
                    to="/products?category=wearables"
                    className="text-decoration-none"
                  >
                    <div
                      className="category-tile-card"
                      style={{ minHeight: "165px" }}
                    >
                      <img
                        src={watch}
                        alt="Watch"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                      />

                      <div className="category-tile-content">
                        <h4 className="category-tile-title fs-5 mb-0">
                          {categories[9].name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-6">
                  <Link
                    to="/products?category=audio"
                    className="text-decoration-none"
                  >
                    <div
                      className="category-tile-card"
                      style={{ minHeight: "165px" }}
                    >
                      <img
                        src={mobile_accessories}
                        alt="Mobile Accessories"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                      />

                      <div className="category-tile-content">
                        <h4 className="category-tile-title fs-5 mb-0">
                          {categories[10].name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div>
                <Link
                  to="/products?category=home-theater"
                  className="text-decoration-none"
                >
                  <div
                    className="category-tile-card"
                    style={{ minHeight: "165px" }}
                  >
                    <img
                      src={Home_Decoration}
                      alt="Home Decoration"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />

                    <div className="category-tile-content">
                      <h4 className="category-tile-title fs-5 mb-0">
                        {categories[4].name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
