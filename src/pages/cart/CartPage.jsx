import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon, ArrowRightIcon, TruckIcon } from "../../assets/icons";
import {
  fetchCartItems,
  removeItem,
  incQty,
  decQty,
} from "../../store/Slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();

  const { cartItems, totalAmount, isLoading, error } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  function handleIncrease(id) {
    dispatch(incQty(id));
    dispatch(fetchCartItems());
  }

  function handleDecrease(id) {
    dispatch(decQty(id));
    dispatch(fetchCartItems());
  }

  function handleRemove(id) {
    dispatch(removeItem(id));
    dispatch(fetchCartItems());
  }

  return (
    <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div
        className="container px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        <h1 className="fw-bold text-dark mb-4">Your Shopping Cart</h1>

        {isLoading && cartItems.length === 0 && (
          <p className="text-muted">Loading cart...</p>
        )}

        {error && (
          <p className="text-danger">
            {typeof error === "string" ? error : "Failed to load cart items."}
          </p>
        )}

        {!isLoading && cartItems.length === 0 && !error && (
          <div className="bg-white border rounded-3 p-5 text-center">
            <h4 className="fw-bold mb-3">Your cart is empty</h4>
            <p className="text-muted">Add some products to get started.</p>
            <Link to="/products" className="text-decoration-none">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-3 border d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 shadow-xs"
                    style={{ borderColor: "var(--color-border-subtle)" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{
                          width: "88px",
                          height: "88px",
                          objectFit: "contain",
                          borderRadius: "12px",
                          flexShrink: 0,
                        }}
                      />

                      <div>
                        <h5
                          className="fw-bold text-dark mb-2"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {item.title}
                        </h5>

                        <p className="text-muted small mb-2">
                          ${Number(item.price).toFixed(2)} each
                        </p>

                        <div className="d-inline-flex align-items-center border rounded-2 px-2 py-1 gap-2">
                          <button
                            type="button"
                            className="btn btn-link text-muted p-0 text-decoration-none "
                            onClick={() => handleDecrease(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>

                          <span className="fw-bold px-2">{item.quantity}</span>

                          <button
                            type="button"
                            className="btn btn-link text-muted p-0 text-decoration-none"
                            onClick={() => handleIncrease(item.id)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-sm-column align-items-center align-items-sm-end justify-content-between gap-3 ms-auto">
                      <span
                        className="fw-bold fs-5"
                        style={{ color: "var(--color-primary)" }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <button
                        type="button"
                        className="btn btn-link text-danger p-0 text-decoration-none d-flex align-items-center gap-1 small"
                        onClick={() => handleRemove(item.id)}
                      >
                        <TrashIcon size={16} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div
                className="bg-white p-4 rounded-3 border shadow-xs"
                style={{ borderColor: "var(--color-border-subtle)" }}
              >
                <h4 className="fw-bold text-dark mb-4">Order Summary</h4>

                <div className="d-flex justify-content-between text-muted mb-3">
                  <span>Subtotal</span>
                  <span className="fw-semibold text-dark">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between text-muted mb-3">
                  <span>Shipping</span>
                  <span className="fw-semibold text-success">Free</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-baseline mb-4">
                  <span className="fw-bold text-dark fs-5">Total</span>
                  <span
                    className="fw-bold fs-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <Link to="/checkout" className="text-decoration-none">
                  <Button variant="primary" className="w-100 py-3 mb-3 fw-bold">
                    Proceed to Checkout <ArrowRightIcon size={18} />
                  </Button>
                </Link>

                <div
                  className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{
                    backgroundColor: "var(--color-bg-alt)",
                    border: "1px solid rgba(53, 37, 205, 0.1)",
                  }}
                >
                  <div className="text-primary">
                    <TruckIcon size={24} />
                  </div>

                  <div>
                    <div className="fw-bold text-dark small">
                      Free Express Delivery
                    </div>
                    <div className="text-muted small">
                      Arrives in 2-3 business days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
