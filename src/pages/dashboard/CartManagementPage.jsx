import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";
import AddCartModal from "../../components/cart/AddCartModal";
import DeleteCartBottomSheet from "../../components/cart/DeleteCartBottomSheet";
import {
  FiPlus,
  FiSearch,
  FiEye,
  FiTrash2,
  FiShoppingCart,
  FiTrendingUp,
  FiPackage,
} from "../../assets/icons";
import {
  fetchCartsDash,
  addCart,
  deleteCart,
} from "../../store/Slices/CartDashSlice";
import { deleteCartApi } from "../../services/cart";
import toast, { Toaster } from "react-hot-toast";

export default function CartManagementPage({
  onCreateCartClick,
  onViewCartClick,
  onDeleteCartClick,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, carts, limit, skip, total, totalPages } =
    useSelector((store) => store.cartDash);

  const [sortOpt, setSortOpt] = useState("desc");
  const [searchedId, setSearchedId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteSheet, setShowDeleteSheet] = useState(false);
  const [selectedDeleteCart, setSelectedDeleteCart] = useState(null);

  useEffect(() => {
    dispatch(
      fetchCartsDash({
        limit: 8,
        skip: 0,
        sortBy: "total",
        sortOpt,
        searchId: searchedId.trim(),
      })
    );
  }, [dispatch, sortOpt, searchedId]);

  const currentPage = Math.floor(skip / limit) + 1;
  const windowSize = Math.min(5, totalPages);
  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - windowSize + 1)
  );

  const calcSkip = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    dispatch(
      fetchCartsDash({
        limit,
        skip: (page - 1) * limit,
        sortBy: "total",
        sortOpt,
        searchId: searchedId.trim(),
      })
    );
  };

  const handleRetry = () => {
    dispatch(
      fetchCartsDash({
        limit,
        skip,
        sortBy: "total",
        sortOpt,
        searchId: searchedId.trim(),
      })
    );
  };

  const handleOpenAddModal = () => {
    if (onCreateCartClick) {
      onCreateCartClick();
    } else {
      setShowAddModal(true);
    }
  };

  const handleViewCart = (cart) => {
    if (onViewCartClick) {
      onViewCartClick(cart);
    } else {
      navigate(`/dashboard/carts/${cart.id}`);
    }
  };

  const handleDeleteCartClick = (cart) => {
    setSelectedDeleteCart(cart);
    setShowDeleteSheet(true);
    if (onDeleteCartClick) {
      onDeleteCartClick(cart);
    }
  };

  const from = total === 0 ? 0 : skip + 1;
  const to = Math.min(skip + carts.length, total);

  // Computed summary metrics from live data
  const pageTotalValue = carts.reduce((acc, c) => acc + (c.total || 0), 0);
  const pageTotalItems = carts.reduce((acc, c) => acc + (c.totalQuantity || 0), 0);

  return (
    <div className="cart-management-page pb-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#1D1929" }}>
            Cart Management
          </h2>
          <p className="text-muted small mb-0">
            Review live shopper sessions, order checkouts, and customer baskets.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            icon={<FiPlus size={16} />}
            onClick={handleOpenAddModal}
          >
            Create New Cart
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="p-3 rounded-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="d-flex align-items-center gap-2 flex-grow-1"
          style={{ maxWidth: 440 }}
        >
          <Input
            placeholder="Search carts by Cart ID..."
            icon={<FiSearch size={16} />}
            className="w-100"
            value={searchedId}
            onChange={(e) => setSearchedId(e.target.value)}
          />
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <select
            className="form-select form-select-sm"
            style={{
              width: "auto",
              minWidth: 200,
              borderRadius: 8,
              borderColor: "#E2E8F0",
            }}
            value={sortOpt}
            onChange={(e) => setSortOpt(e.target.value)}
          >
            <option value="desc">From Highest to Lowest Total</option>
            <option value="asc">From Lowest to Highest Total</option>
          </select>
        </div>
      </div>

      {/* Carts Table Card */}
      <div
        className="rounded-3 overflow-hidden mb-4"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              style={{
                backgroundColor: "#F8F9FF",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <tr>
                <th className="text-muted small text-uppercase py-3 ps-3">
                  Cart ID
                </th>
                <th className="text-muted small text-uppercase py-3">
                  Customer
                </th>
                <th className="text-muted small text-uppercase py-3">
                  Products
                </th>
                <th className="text-muted small text-uppercase py-3">
                  Subtotal
                </th>
                <th className="text-muted small text-uppercase py-3 text-end pe-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }, (_, index) => (
                  <tr
                    key={`cart-skeleton-${index}`}
                    className="placeholder-glow"
                    style={{ borderBottom: "1px solid #F1F5F9" }}
                  >
                    <td className="ps-3">
                      <span
                        className="placeholder rounded col-7"
                        style={{ height: 16 }}
                      />
                    </td>
                    <td>
                      <span
                        className="placeholder col-8 mb-1"
                        style={{ height: 14 }}
                      />
                      <br />
                      <span
                        className="placeholder col-5"
                        style={{ height: 11 }}
                      />
                    </td>
                    <td>
                      <span
                        className="placeholder col-6 mb-1"
                        style={{ height: 14 }}
                      />
                    </td>
                    <td>
                      <span
                        className="placeholder col-7 mb-1"
                        style={{ height: 14 }}
                      />
                      <br />
                      <span
                        className="placeholder col-4"
                        style={{ height: 11 }}
                      />
                    </td>
                    <td className="text-end pe-3">
                      <span
                        className="placeholder rounded me-2"
                        style={{ width: 28, height: 28 }}
                      />
                      <span
                        className="placeholder rounded"
                        style={{ width: 28, height: 28 }}
                      />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <div className="text-danger fw-semibold mb-2">
                      Failed to load carts
                    </div>
                    <p className="text-muted small mb-3">
                      {typeof error === "string"
                        ? error
                        : "Something went wrong while loading carts."}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleRetry}
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : carts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                carts.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td className="ps-3">
                      <span className="fw-semibold text-dark">
                        #CRT-{c.id.toString().padStart(4, "0")}
                      </span>
                    </td>
                    <td>
                      <div className="fw-medium text-dark">
                        User #{c.userId}
                      </div>
                      <div className="text-muted small">
                        Customer ID: {c.userId}
                      </div>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">
                        {c.totalQuantity ?? 0} items{" "}
                        <span className="text-muted fw-normal">
                          ({c.totalProducts ?? (c.products ? c.products.length : 0)} lines)
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">
                        ${Number(c.total || 0).toFixed(2)}
                      </div>
                      {c.discountedTotal < c.total && (
                        <div className="text-success small">
                          Disc: ${Number(c.discountedTotal || 0).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="text-end pe-3">
                      <div className="d-inline-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-light text-primary border-0 p-2"
                          title="View Cart Details"
                          onClick={() => handleViewCart(c)}
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-light text-danger border-0 p-2"
                          title="Delete Cart"
                          onClick={() => handleDeleteCartClick(c)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="text-muted small">
            Showing{" "}
            <strong className="text-dark">
              {from}-{to}
            </strong>{" "}
            of <strong className="text-dark">{total}</strong> carts
          </div>

          {totalPages > 1 && (
            <div>
              <Pagination className="my-2 justify-content-center">
                {currentPage > 1 && (
                  <Pagination.First
                    onClick={() => calcSkip(1)}
                    disabled={isLoading}
                  />
                )}

                <Pagination.Prev
                  onClick={() => calcSkip(currentPage - 1)}
                  disabled={isLoading || currentPage <= 1}
                />

                {Array.from({ length: windowSize }, (_, index) => {
                  const page = startPage + index;
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      disabled={isLoading}
                      onClick={() => calcSkip(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  onClick={() => calcSkip(currentPage + 1)}
                  disabled={isLoading || currentPage >= totalPages}
                />

                {currentPage < totalPages && (
                  <Pagination.Last
                    onClick={() => calcSkip(totalPages)}
                    disabled={isLoading}
                  />
                )}
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* 3 Summary Cards at bottom */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Total Recorded Carts
              </span>
              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#EFF4FF", color: "#3525CD" }}
              >
                <FiShoppingCart size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-1">{total}</div>
            <div className="text-success small fw-medium">
              Live DummyJSON data
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Active Page Value
              </span>
              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}
              >
                <FiTrendingUp size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-1">
              ${pageTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-success small fw-medium">
              Gross sum across loaded carts
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Total Items in View
              </span>
              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#F5F3FF", color: "#7C3AED" }}
              >
                <FiPackage size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-1">
              {pageTotalItems} Items
            </div>
            <div className="text-muted small">
              Across {carts.length} visible customer baskets
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddCartModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={(newCart) => {
          dispatch(addCart(newCart));
          setShowAddModal(false);
        }}
      />

      <DeleteCartBottomSheet
        show={showDeleteSheet}
        cart={selectedDeleteCart}
        onHide={() => {
          setShowDeleteSheet(false);
          setSelectedDeleteCart(null);
        }}
        onConfirmDelete={async () => {
          if (!selectedDeleteCart) return;
          const cartId = selectedDeleteCart.id;
          try {
            await deleteCartApi(cartId);
          } catch {
            // Simulated operation in DummyJSON
          }
          dispatch(deleteCart(cartId));
          setShowDeleteSheet(false);
          setSelectedDeleteCart(null);
          toast.success(
            `Cart #CRT-${cartId.toString().padStart(4, "0")} removed (Simulated)`,
            { id: `delete-cart-${cartId}` }
          );
        }}
      />
      <Toaster position="top-right" />
    </div>
  );
}
