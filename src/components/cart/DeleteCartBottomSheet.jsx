import BottomSheet from "../common/BottomSheet";
import { FiShoppingCart } from "../../assets/icons";

export default function DeleteCartBottomSheet({
  show = false,
  cart = null,
  onHide,
  onConfirmDelete,
}) {
  const targetCart = cart || {
    id: 0,
    userId: 0,
    total: 0,
    totalQuantity: 0,
  };

  const itemPreview = (
    <div className="d-flex align-items-center gap-3">
      <div
        className="rounded-3 d-flex align-items-center justify-content-center bg-white flex-shrink-0"
        style={{ width: 56, height: 56, border: "1px solid #C7C4D8", color: "#3525CD" }}
      >
        <FiShoppingCart size={24} />
      </div>
      <div>
        <span
          className="badge text-uppercase mb-1"
          style={{
            backgroundColor: "#DCFCE7",
            color: "#16A34A",
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        >
          Active Session
        </span>
        <div className="fw-bold text-dark">
          Cart #CRT-{targetCart.id ? targetCart.id.toString().padStart(4, "0") : "0000"}{" "}
          {targetCart.userId ? `(User #${targetCart.userId})` : ""}
        </div>
        <div className="small text-muted">
          {targetCart.totalQuantity ?? 0} items • Total:{" "}
          <strong className="text-primary">
            ${Number(targetCart.total ?? 0).toFixed(2)}
          </strong>
        </div>
      </div>
    </div>
  );

  return (
    <BottomSheet
      show={show}
      onHide={onHide}
      onConfirm={onConfirmDelete}
      title="Delete Customer Cart?"
      description="This will clear all items from this shopping basket session and mark the cart as deleted. DummyJSON delete operations are simulated and do not persist on the server."
      itemPreview={itemPreview}
      confirmText="Confirm Delete"
      cancelText="Cancel and Keep Cart"
      isDanger={true}
      footerNote="Simulated Action: DummyJSON write operations are simulated and non-persistent."
    />
  );
}
