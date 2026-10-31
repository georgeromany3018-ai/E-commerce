import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, TruckIcon, PackageIcon } from "../../assets/icons";
import { fetchCartItems } from "../../store/Slices/cartSlice";
import Button from "../../components/common/Button";

export default function OrderSuccessPage() {
  const dispatch = useDispatch();

  const { cartItems, totalAmount, isLoading, error } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const tax = 27.76;
  const total = totalAmount + tax;

  return (
    <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div
        className="container px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Top Celebration Header */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-sm"
            style={{
              width: "72px",
              height: "72px",
              backgroundColor: "#34D399",
              color: "#ffffff",
            }}
          >
            <CheckIcon size={36} />
          </div>

          <h1 className="fw-bold text-dark display-6 mb-2">
            Order #12345 Confirmed
          </h1>

          <p
            className="text-muted lead mx-auto"
            style={{ maxWidth: "540px", fontSize: "1.05rem" }}
          >
            Woohoo! Your order has been placed successfully. We've sent a
            confirmation email to{" "}
            <span className="text-primary fw-medium">
              alex.design@example.com
            </span>
            .
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Left: Delivery & Tracking Details Card */}
          <div className="col-12 col-lg-7">
            <div
              className="bg-white p-4 rounded-3 border shadow-xs h-100"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4 className="fw-bold text-dark mb-0">Estimated Delivery</h4>
                <TruckIcon size={24} className="text-muted" />
              </div>

              <p className="fw-bold mb-4" style={{ color: "#059669" }}>
                Tuesday, October 24th, 2024
              </p>

              {/* Progress Timeline */}
              <div className="d-flex align-items-center justify-content-between px-3 mb-5 position-relative">
                <div
                  className="text-center position-relative"
                  style={{ zIndex: 2 }}
                >
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle text-white mb-2"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "var(--color-primary)",
                    }}
                  >
                    <CheckIcon size={16} />
                  </span>
                  <div className="small fw-semibold text-dark">Placed</div>
                </div>

                <div
                  className="flex-grow-1 mx-2"
                  style={{
                    height: "2px",
                    backgroundColor: "var(--color-primary)",
                  }}
                />

                <div
                  className="text-center position-relative"
                  style={{ zIndex: 2 }}
                >
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle border mb-2 text-primary bg-light"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    <PackageIcon size={16} />
                  </span>
                  <div className="small fw-semibold text-muted">Processing</div>
                </div>

                <div
                  className="flex-grow-1 mx-2"
                  style={{
                    height: "2px",
                    backgroundColor: "var(--color-border-main)",
                  }}
                />

                <div
                  className="text-center position-relative"
                  style={{ zIndex: 2 }}
                >
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle border mb-2 text-muted bg-white"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <TruckIcon size={16} />
                  </span>
                  <div className="small text-muted">Shipped</div>
                </div>
              </div>

              <hr className="my-4 text-muted" />

              <div className="row g-3 small">
                <div className="col-12 col-sm-6">
                  <div
                    className="text-uppercase fw-bold text-muted mb-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    SHIPPING ADDRESS
                  </div>
                  <div className="fw-semibold text-dark">Alex Johnston</div>
                  <div className="text-muted">123 Indigo Way, Suite 404</div>
                  <div className="text-muted">San Francisco, CA 94103</div>
                </div>

                <div className="col-12 col-sm-6">
                  <div
                    className="text-uppercase fw-bold text-muted mb-1"
                    style={{ fontSize: "0.75rem" }}
                  >
                    SHIPPING METHOD
                  </div>
                  <div className="fw-semibold text-dark">
                    Express Delivery (2-3 Business Days)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="col-12 col-lg-5">
            <div
              className="bg-white p-4 rounded-3 border shadow-xs h-100"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <h4 className="fw-bold text-dark mb-4">Order Summary</h4>

              {isLoading ? (
                <p className="text-muted">Loading order items...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : cartItems.length === 0 ? (
                <p className="text-muted">No items found.</p>
              ) : (
                <>
                  <div className="d-flex flex-column gap-3 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center justify-content-between gap-3"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="rounded-2"
                            style={{
                              width: "56px",
                              height: "56px",
                              objectFit: "cover",
                            }}
                          />

                          <div>
                            <div className="fw-bold text-dark small">
                              {item.title}
                            </div>
                            <div className="text-muted small">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>

                        <span className="fw-bold text-dark small">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="text-muted my-3" />

                  <div className="d-flex flex-column gap-2 mb-3 small text-muted">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <span className="fw-semibold text-dark">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Shipping</span>
                      <span className="fw-semibold text-success">FREE</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Tax</span>
                      <span className="fw-semibold text-dark">
                        ${tax.toFixed(2)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
                      <span>Total</span>
                      <span style={{ color: "var(--color-primary)" }}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <Link to="/products" className="text-decoration-none">
            <Button variant="primary" size="lg" className="px-4">
              Continue Shopping
            </Button>
          </Link>

          <Link to="/cart" className="text-decoration-none">
            <Button variant="secondary" size="lg" className="px-4">
              View Order History
            </Button>
          </Link>
        </div>

        {/* Support Banner */}
        <div
          className="p-4 rounded-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3"
          style={{
            backgroundColor: "#D1FADF",
            border: "1px solid #A6F4C5",
          }}
        >
          <div>
            <h6 className="fw-bold text-dark mb-1">
              Need help with your order?
            </h6>
            <p className="text-muted small mb-0">
              Our support team is available 24/7. Reference order #12345 when
              contacting us.
            </p>
          </div>

          <button
            type="button"
            className="btn text-white fw-bold px-4 py-2 text-nowrap"
            style={{ backgroundColor: "#027A48", borderRadius: "8px" }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
