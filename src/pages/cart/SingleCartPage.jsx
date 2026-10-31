import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import PlaceholderBox from "../../components/common/PlaceholderBox";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiShoppingBag,
} from "../../assets/icons";
import { getCartById } from "../../services/cart";

export default function SingleCartPage({
  cart: initialCart = null,
  onBackClick,
  onEditClick,
  onDeleteClick,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fetchedCart, setFetchedCart] = useState(null);
  const [isLoading, setIsLoading] = useState(!initialCart && Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadCart() {
      try {
        const data = await getCartById(id);
        if (!isCancelled) {
          setFetchedCart(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err.response?.data?.message || "Failed to load cart details"
          );
          setIsLoading(false);
        }
      }
    }

    if (!initialCart && id) {
      loadCart();
    }

    return () => {
      isCancelled = true;
    };
  }, [id, initialCart]);

  const cart = initialCart || fetchedCart;

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="single-cart-page pb-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading cart...</span>
          </div>
          <div className="text-muted small mt-2">Loading cart details...</div>
        </div>
      </div>
    );
  }

  if (error || !cart) {
    return (
      <div className="single-cart-page pb-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            type="button"
            className="btn btn-outline-light text-dark border p-2 rounded-3 bg-white"
            onClick={handleBack}
          >
            <FiArrowLeft size={18} />
          </button>
          <h4 className="fw-bold mb-0 text-dark">Cart Details</h4>
        </div>
        <div className="p-4 rounded-3 bg-white border text-center text-danger">
          <p className="mb-2 fw-semibold">{error || "Cart not found."}</p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={handleBack}
          >
            Back to Cart Management
          </button>
        </div>
      </div>
    );
  }

  const productsList = cart.products || [];

  return (
    <div className="single-cart-page pb-5">
      {/* Back button & top bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-outline-light text-dark border p-2 rounded-3 bg-white"
            onClick={handleBack}
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="fw-bold mb-0 text-dark">
                Cart #CRT-{cart.id ? cart.id.toString().padStart(4, "0") : "0000"}
              </h2>
              <Badge variant="primary">Active Session</Badge>
            </div>
            <div className="text-muted small">
              Live DummyJSON Customer Session
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          {onEditClick && (
            <Button
              variant="outline"
              icon={<FiEdit2 size={16} />}
              onClick={onEditClick}
            >
              Edit Cart
            </Button>
          )}
          {onDeleteClick && (
            <Button
              variant="danger"
              icon={<FiTrash2 size={16} />}
              onClick={onDeleteClick}
            >
              Delete Cart
            </Button>
          )}
        </div>
      </div>

      <div className="row g-4">
        {/* Left: Cart Items Table */}
        <div className="col-12 col-lg-8">
          <div
            className="rounded-3 overflow-hidden bg-white"
            style={{
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
              <h6 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                <FiShoppingBag className="text-primary" /> Cart Contents ({productsList.length} Items)
              </h6>
              <span className="text-muted small">
                Total Quantity: {cart.totalQuantity ?? 0}
              </span>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="bg-light text-muted small text-uppercase">
                  <tr>
                    <th className="ps-3 py-2">Item</th>
                    <th className="py-2">Price</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-end pe-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #F1F5F9" }}
                    >
                      <td className="ps-3 py-3">
                        <div className="d-flex align-items-center gap-3">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              width={50}
                              height={50}
                              style={{ objectFit: "cover", borderRadius: 8 }}
                            />
                          ) : (
                            <PlaceholderBox
                              width={50}
                              height={50}
                              label="Item"
                              radius={8}
                            />
                          )}
                          <div>
                            <div className="fw-semibold text-dark">
                              {item.title}
                            </div>
                            <div className="text-muted small">
                              Item #{item.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="fw-medium text-dark">
                          ${Number(item.price || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="badge bg-light text-dark border px-2 py-1">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="py-3 text-end pe-3 fw-bold text-dark">
                        ${Number(item.total || item.price * item.quantity || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Cart Summary & Customer info */}
        <div className="col-12 col-lg-4">
          {/* Customer info card */}
          <div
            className="p-4 rounded-3 bg-white mb-3"
            style={{
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
              <FiUser className="text-primary" /> Customer Info
            </h6>
            <div className="d-flex align-items-center gap-3 mb-3">
              <PlaceholderBox width={40} height={40} label={`U${cart.userId || ""}`} radius="50%" />
              <div>
                <div className="fw-semibold text-dark">User #{cart.userId}</div>
                <div className="text-muted small">Customer ID: #{cart.userId}</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FiCalendar size={14} /> Active DummyJSON session
            </div>
          </div>

          {/* Pricing Summary card */}
          <div
            className="p-4 rounded-3 bg-white"
            style={{
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h6 className="fw-bold mb-3 text-dark">Financial Summary</h6>
            <div className="d-flex justify-content-between mb-2 text-muted small">
              <span>Gross Subtotal</span>
              <span className="text-dark fw-medium">
                ${Number(cart.total || 0).toFixed(2)}
              </span>
            </div>
            {cart.discountedTotal < cart.total && (
              <div className="d-flex justify-content-between mb-2 text-success small">
                <span>Total Discount</span>
                <span>
                  -${Number(cart.total - cart.discountedTotal).toFixed(2)}
                </span>
              </div>
            )}
            <div className="d-flex justify-content-between mb-2 text-muted small">
              <span>Estimated Tax (8%)</span>
              <span className="text-dark fw-medium">
                ${Number((cart.total || 0) * 0.08).toFixed(2)}
              </span>
            </div>
            <hr className="my-3 text-muted" />
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold text-dark">Net Payable</span>
              <span className="fs-5 fw-bold" style={{ color: "#3525CD" }}>
                ${Number((cart.discountedTotal || cart.total || 0) + (cart.total || 0) * 0.08).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
