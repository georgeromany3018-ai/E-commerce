
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TruckIcon,
  CreditCardIcon,
  ShieldIcon,
  RefreshIcon,
  ArrowRightIcon,
} from "../../assets/icons";
import { fetchCartItems } from "../../store/Slices/cartSlice";
import Button from "../../components/common/Button";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, isLoading, error } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div
        className="container px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        <div className="mb-4">
          <h1 className="fw-bold text-dark mb-1">Secure Checkout</h1>
          <p className="text-muted small mb-0">
            Complete your order with ShopStream's verified protection.
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 mb-5 small">
          <div className="d-flex align-items-center gap-2 fw-bold text-primary">
            <span
              className="rounded-circle d-flex align-items-center justify-content-center text-white"
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "var(--color-primary)",
                fontSize: "0.75rem",
              }}
            >
              1
            </span>
            <span>Shipping</span>
          </div>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "var(--color-border-main)",
            }}
          />
          <div className="d-flex align-items-center gap-2 text-muted">
            <span
              className="rounded-circle border d-flex align-items-center justify-content-center"
              style={{ width: "24px", height: "24px", fontSize: "0.75rem" }}
            >
              2
            </span>
            <span>Payment</span>
          </div>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "var(--color-border-main)",
            }}
          />
          <div className="d-flex align-items-center gap-2 text-muted">
            <span
              className="rounded-circle border d-flex align-items-center justify-content-center"
              style={{ width: "24px", height: "24px", fontSize: "0.75rem" }}
            >
              3
            </span>
            <span>Review</span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div
              className="bg-white p-4 rounded-3 border mb-4 shadow-xs"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <div className="d-flex align-items-center gap-2 mb-4">
                <TruckIcon size={20} className="text-primary" />
                <h4 className="fw-bold text-dark mb-0">
                  Shipping Information
                </h4>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-dark">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="John"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold text-dark">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Doe"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold text-dark">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="123 Commerce Way"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label small fw-semibold text-dark">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="New York"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label small fw-semibold text-dark">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="10001"
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label small fw-semibold text-dark">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-3 border mb-4 shadow-xs"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <div className="d-flex align-items-center gap-2 mb-4">
                <CreditCardIcon size={20} className="text-primary" />
                <h4 className="fw-bold text-dark mb-0">Payment Method</h4>
              </div>

              <div
                className="p-3 rounded-3 border mb-3"
                style={{
                  borderColor: "var(--color-primary)",
                  backgroundColor: "rgba(53, 37, 205, 0.02)",
                }}
              >
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentOption"
                    id="payCard"
                    defaultChecked
                  />
                  <label
                    className="form-check-label fw-bold text-dark"
                    htmlFor="payCard"
                  >
                    Credit or Debit Card
                  </label>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small text-muted">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted">CVC</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              <div
                className="p-3 rounded-3 border"
                style={{ borderColor: "var(--color-border-subtle)" }}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentOption"
                    id="payPal"
                  />
                  <label
                    className="form-check-label fw-bold text-dark"
                    htmlFor="payPal"
                  >
                    PayPal
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <Link to="/order-success" className="text-decoration-none">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-5 py-3 fw-bold"
                >
                  Place Order <ArrowRightIcon size={18} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div
              className="bg-white p-4 rounded-3 border shadow-xs"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <h4 className="fw-bold text-dark mb-4">Order Summary</h4>

              {isLoading && cartItems.length === 0 && (
                <p className="text-muted small">Loading cart...</p>
              )}

              {error && (
                <p className="text-danger small">
                  {typeof error === "string"
                    ? error
                    : "Failed to load cart items."}
                </p>
              )}

              {!isLoading && cartItems.length === 0 && !error && (
                <p className="text-muted small">Your cart is empty.</p>
              )}

              <div className="d-flex flex-column gap-3 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between gap-3"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{
                          width: "52px",
                          height: "52px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                      <div>
                        <div
                          className="fw-semibold text-dark small text-truncate"
                          style={{ maxWidth: "160px" }}
                        >
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

              <div className="d-flex flex-column gap-2 mb-4 small text-muted">
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
                  <span>Tax (Est.)</span>
                  <span className="fw-semibold text-dark">$31.18</span>
                </div>
                <div className="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
                  <span>Total</span>
                  <span style={{ color: "var(--color-primary)" }}>
                    ${(totalAmount + 31.18).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="d-flex gap-2 mb-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Promo Code"
                />
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm px-3 fw-semibold"
                >
                  Apply
                </button>
              </div>

              <div
                className="p-3 rounded-3"
                style={{ backgroundColor: "#D1FADF", color: "#027A48" }}
              >
                <div className="d-flex align-items-center gap-2 small fw-semibold mb-1">
                  <ShieldIcon size={16} /> 256-bit SSL Secure Payment
                </div>
                <div className="d-flex align-items-center gap-2 small fw-semibold">
                  <RefreshIcon size={16} /> 30-Day Money Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
