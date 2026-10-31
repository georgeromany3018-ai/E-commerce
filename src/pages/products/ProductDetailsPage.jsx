import { Link, useParams } from "react-router-dom";
import {
  StarIcon,
  CartIcon,
  HeartIcon,
  ShieldIcon,
  TruckIcon,
  RefreshIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "../../assets/icons";
import { Container, Card, Row, Col } from "react-bootstrap";

import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchCartItems } from "../../store/Slices/cartSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch();

  const { products } = useSelector((store) => store.products);
  const { products: listingProducts } = useSelector(
    (store) => store.productsListing,
  );

  const selectedProduct =
    products.find((product) => product.id === productId) ||
    listingProducts.find((product) => product.id === productId);

  const getStars = (rating = 0) => {
    const stars = Math.round(Math.min(Math.max(rating, 0), 5));

    return [1, 2, 3, 4, 5].map((i) =>
      i <= stars ? (
        <StarIcon key={i} size={16} fill="currentColor" />
      ) : (
        <StarIcon key={i} size={16} />
      ),
    );
  };

  console.log(selectedProduct);

  function handleAddToCart() {
    dispatch(
      addItem({
        id: selectedProduct.id,
        stock: selectedProduct.stock,
      }),
    );
    dispatch(fetchCartItems());
  }

  return (
    <div className="py-4" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div
        className="container px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Breadcrumbs */}
        <nav className="mb-4 small text-muted">
          <Link to="/" className="text-muted text-decoration-none">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <Link to="/products" className="text-muted text-decoration-none">
            {selectedProduct.category}
          </Link>
          <span className="mx-2">&gt;</span>

          <span className="mx-2">&gt;</span>
          <span className="text-dark fw-semibold">{selectedProduct.title}</span>
        </nav>

        {/* Product Hero Details Row */}
        <div className="row g-5 mb-5">
          {/* Gallery Column */}
          <div className="col-12 col-lg-7 d-flex flex-column flex-md-row gap-3">
            {/* Thumbnails */}

            {/* Main Stage Image */}
            <div
              className="position-relative flex-grow-1 rounded-4 overflow-hidden border order-1 order-md-2"
              style={{
                backgroundColor: "#f1f5f9",
                minHeight: "440px",
                borderColor: "var(--color-border-subtle)",
              }}
            >
              <img
                className="w-100 h-100"
                src={selectedProduct.thumbnail}
                alt=""
              />
              <button
                type="button"
                className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm d-flex align-items-center justify-content-center p-2 text-muted"
                aria-label="Add to wishlist"
              >
                <HeartIcon size={20} />
              </button>
            </div>
          </div>

          {/* Product Buying Info Column */}
          <div className="col-12 col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className="badge px-2 py-1 fw-bold rounded-pill"
                style={{
                  backgroundColor: "#D1FADF",
                  color: "#027A48",
                  fontSize: "0.75rem",
                }}
              >
                {selectedProduct.rating > 4 && (
                  <span className="badge-tag badge-bestseller">
                    BEST SELLER
                  </span>
                )}
              </span>
              <span className="text-muted small">{selectedProduct.sku}</span>
            </div>

            <h1
              className="fw-bold text-dark display-6 mb-2"
              style={{ fontSize: "2rem" }}
            >
              {selectedProduct.title}
            </h1>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex text-warning small">
                {getStars(selectedProduct?.rating)}
              </div>
              <span className="fw-bold text-dark small">
                {selectedProduct.rating}
              </span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-baseline gap-3 mb-2">
              <span className="fw-bold text-dark fs-2">
                ${Number(selectedProduct.price).toFixed(2)}
              </span>
              <span className="text-muted text-decoration-line-through">
                ${Number(selectedProduct.price * 1.15).toFixed(2)}
              </span>
              <span className="fw-bold text-success small">(15% OFF)</span>
            </div>
            <p className="text-muted small mb-4">
              Shipping calculated at checkout. Free shipping on orders over
              $500.
            </p>

            <p className="text-muted mb-4" style={{ lineHeight: 1.6 }}>
              {selectedProduct.description}
            </p>

            {/* Color Swatches */}
            <div className="mb-4">
              <label className="fw-semibold small text-dark d-block mb-2">
                Select Color:{" "}
                <span className="text-muted fw-normal">Midnight Indigo</span>
              </label>
              <div className="d-flex gap-2">
                {["#3525CD", "#334155", "#E2E8F0"].map((color, i) => (
                  <button
                    key={color}
                    type="button"
                    className="rounded-circle border p-1"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: color,
                      borderColor: i === 0 ? "var(--color-primary)" : "#CBD5E1",
                      outline:
                        i === 0 ? "2px solid var(--color-primary)" : "none",
                      outlineOffset: "2px",
                    }}
                    aria-label={`Color option ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Buttons */}
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <Button
                  variant="primary"
                  className="flex-grow-1 py-2"
                  onClick={handleAddToCart}
                >
                  <CartIcon size={18} /> Add to Cart
                </Button>
              </div>
              <Link
                to="/checkout"
                className="btn text-white fw-bold py-2"
                style={{ backgroundColor: "#027A48", borderRadius: "8px" }}
                onClick={handleAddToCart}
              >
                Buy Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="row g-3 pt-3 border-top text-muted small">
              <div className="col-6 d-flex align-items-center gap-2">
                <ShieldIcon size={18} className="text-primary" />
                <span>2 Year Warranty</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <TruckIcon size={18} className="text-primary" />
                <span>Fast 2-Day Delivery</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <RefreshIcon size={18} className="text-primary" />
                <span>30-Day Returns</span>
              </div>
              <div className="col-6 d-flex align-items-center gap-2">
                <CheckCircleIcon size={18} className="text-primary" />
                <span>Lifetime Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Tabs Section */}
        <div className="mb-5">
          <Container className="my-5">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Specifications</h3>
              <p className="text-muted">
                Everything you need to know about this product
              </p>
            </div>

            <Card
              className="border-0 shadow-sm rounded-4 mx-auto"
              style={{ maxWidth: "1000px" }}
            >
              <Card.Body className="p-3 p-md-4">
                <Row className="g-3">
                  {[
                    ["Product Name", selectedProduct?.title],
                    ["Brand", selectedProduct?.brand],
                    ["Category", selectedProduct?.category],
                    [
                      "Price",
                      selectedProduct?.price != null
                        ? `$${Number(selectedProduct.price).toFixed(2)}`
                        : null,
                    ],
                    ["Rating", selectedProduct?.rating],
                    ["Stock", selectedProduct?.stock],
                    ["Warranty", selectedProduct?.warrantyInformation],
                    ["Shipping", selectedProduct?.shippingInformation],
                    ["Return Policy", selectedProduct?.returnPolicy],
                  ].map(([label, value]) => (
                    <Col xs={12} md={6} key={label}>
                      <div className="d-flex align-items-center justify-content-between gap-3 bg-light rounded-3 p-3 h-100">
                        <span className="text-muted small">{label}</span>
                        <span className="fw-semibold text-end text-break">
                          {value ?? "N/A"}
                        </span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>

        {/* Complete Your Setup */}
        <div>
          <Link
            to="/products"
            className="fw-semibold small text-primary d-flex align-items-center gap-1"
          >
            View All Products <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
