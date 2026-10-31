import { fetchAllProductsListing } from "../../store/Slices/productsListingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { Container, Pagination, Row } from "react-bootstrap";
import ProductCardSkeleton from "../../components/products/ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, limit, skip, total, totalPages, isLoading, error } =
    useSelector((store) => store.productsListing);
  const [sortBy, setSortBy] = useState("title");
  const [sortOpt, setSortOpt] = useState("asc");
  const [category, setCategory] = useState("");

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("q") || "";

  useEffect(() => {
    dispatch(
      fetchAllProductsListing({
        category,
        limit: 9,
        skip: 0,
        sortBy,
        sortOpt,
        searchedProduct: searchValue,
      }),
    );
  }, [sortBy, sortOpt, category, searchValue]);

  const currentPage = skip / limit + 1;
  const windowSize = Math.min(5, totalPages);
  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - windowSize + 1),
  );

  const categories = [
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
    { slug: "home-decoration", name: "Home Decoration" },
    { slug: "kitchen-accessories", name: "Kitchen Accessories" },
    { slug: "laptops", name: "Laptops" },
    { slug: "mens-shirts", name: "Mens Shirts" },
    { slug: "mens-shoes", name: "Mens Shoes" },
    { slug: "mens-watches", name: "Mens Watches" },
    { slug: "mobile-accessories", name: "Mobile Accessories" },
    { slug: "motorcycle", name: "Motorcycle" },
    { slug: "skin-care", name: "Skin Care" },
    { slug: "smartphones", name: "Smartphones" },
    { slug: "sports-accessories", name: "Sports Accessories" },
    { slug: "sunglasses", name: "Sunglasses" },
    { slug: "tablets", name: "Tablets" },
    { slug: "tops", name: "Tops" },
    { slug: "vehicle", name: "Vehicle" },
    { slug: "womens-bags", name: "Womens Bags" },
    { slug: "womens-dresses", name: "Womens Dresses" },
    { slug: "womens-jewellery", name: "Womens Jewellery" },
    { slug: "womens-shoes", name: "Womens Shoes" },
    { slug: "womens-watches", name: "Womens Watches" },
  ];

  const categoryName = categories.find((c) => c.slug === category)?.name;

  const calcSkip = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const newSkip = (page - 1) * limit;

    dispatch(
      fetchAllProductsListing({
        category,
        limit,
        skip: newSkip,
        sortBy,
        sortOpt,
        searchedProduct: searchValue,
      }),
    );
  };

  const from = total === 0 ? 0 : skip + 1;
  const to = skip + products.length;

  if (isLoading) {
    return (
      <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <h3 className="fw-bold text-dark mb-4">All Products</h3>

          <div className="row g-3">
            {Array.from({ length: 9 }, (_, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="py-5 text-center"
        style={{ backgroundColor: "var(--color-bg-base)" }}
      >
        <p className="text-danger mb-2">Failed to load products.</p>

        <p className="text-muted small">{error}</p>

        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            dispatch(
              fetchAllProductsListing({
                category,
                limit,
                skip,
                sortBy,
                sortOpt,
              }),
            )
          }
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div
        className="container px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        <div className="row g-4">
          {/* Left Filters Sidebar */}
          {!(searchValue && products.length === 0) && (
            <div className="col-12 col-lg-3">
              <div
                className="p-4 bg-white rounded-3 border"
                style={{ borderColor: "var(--color-border-subtle)" }}
              >
                {/* Category Filter */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6
                      className="fw-bold text-uppercase small text-dark mb-0"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      CATEGORY
                    </h6>

                    <button
                      type="button"
                      className="btn btn-sm fw-semibold"
                      style={{
                        backgroundColor: "#E0EAFF",
                        color: "var(--color-primary)",
                        borderRadius: "8px",
                        border: "none",
                      }}
                      onClick={() => setCategory("")}
                    >
                      Clear Filters
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {categories.map((cat) => (
                      <div className="form-check" key={cat.slug}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`cat-${cat.slug}`}
                          checked={category === cat.slug}
                          onChange={() => setCategory(cat.slug)}
                        />
                        <label
                          className="form-check-label text-muted small"
                          htmlFor={`cat-${cat.name}`}
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Product Grid */}
          <div className="col-12 col-lg-9">
            {/* Header: count + sort */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-2">
              <div>
                <h3 className="fw-bold text-dark mb-1">
                  {categoryName || "All Products"}
                </h3>
                <p className="text-muted small mb-0">
                  Showing {from}-{to} of {total} results
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small text-nowrap">Sort by:</span>

                <select
                  className="form-select form-select-sm"
                  style={{ minWidth: "160px" }}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    console.log(event.target.value);
                  }}
                >
                  <option disabled>...</option>
                  <option value="title">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small text-nowrap">Sort by:</span>

                <select
                  className="form-select form-select-sm"
                  style={{ minWidth: "160px" }}
                  onChange={(event) => {
                    setSortOpt(event.target.value);
                  }}
                >
                  <option disabled>...</option>
                  <option value="asc">Ascending Order</option>
                  <option value="desc">Descending Order</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <Container>
              <Row>
                {searchValue && products.length === 0 && (
                  <div className="col-12">
                    <div
                      className="d-flex flex-column align-items-center justify-content-center text-center py-5 px-3 rounded-4"
                      style={{
                        backgroundColor: "var(--color-bg-base)",
                        minHeight: "350px",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: "#E0EAFF",
                          color: "var(--color-primary)",
                        }}
                      >
                        <FiSearch className="fs-1" />
                      </div>

                      <h4 className="fw-bold text-dark mb-2">
                        No Products Found
                      </h4>

                      <p
                        className="text-muted mb-0"
                        style={{ maxWidth: "360px" }}
                      >
                        We couldn't find any products matching "{searchValue}".
                        Try another keyword or check your spelling.
                      </p>
                    </div>
                  </div>
                )}

                {products.map((product) => (
                  <div
                    className="col-12 col-md-6 col-lg-4 mb-2"
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </Row>
            </Container>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-3">
                <Pagination className="my-4 justify-content-center">
                  {currentPage > 1 && (
                    <Pagination.First onClick={() => calcSkip(1)} />
                  )}

                  <Pagination.Prev
                    onClick={() => calcSkip(currentPage - 1)}
                    disabled={currentPage <= 1}
                  />

                  {Array.from({ length: windowSize }, (_, index) => {
                    const page = startPage + index;

                    return (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => calcSkip(page)}
                      >
                        {page}
                      </Pagination.Item>
                    );
                  })}

                  <Pagination.Next
                    onClick={() => calcSkip(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  />

                  {currentPage < totalPages && (
                    <Pagination.Last onClick={() => calcSkip(totalPages)} />
                  )}
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
