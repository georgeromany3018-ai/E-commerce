import React from "react";
import { TrashIcon, PlusIcon } from "../../assets/icons";
import PlaceholderBox from "../common/PlaceholderBox";

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}) {
  if (!item) return null;

  return (
    <div className="d-flex align-items-center justify-content-between p-3 border-bottom gap-3 flex-wrap flex-sm-nowrap">
      {/* Product Image & Info */}
      <div className="d-flex align-items-center gap-3">
        <PlaceholderBox
          width="72px"
          height="72px"
          borderRadius="8px"
          text="Item"
          style={{ backgroundColor: "#0f172a", color: "#94a3b8", flexShrink: 0 }}
        />
        <div>
          <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.95rem" }}>
            {item.title}
          </h6>
          {item.color && (
            <span className="text-muted small d-block mb-1">Color: {item.color}</span>
          )}
          <span className="fw-semibold text-primary" style={{ fontSize: "0.9rem" }}>
            ${Number(item.price).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Quantity & Total & Remove */}
      <div className="d-flex align-items-center gap-4 ms-auto">
        {/* Quantity control (Visual only) */}
        <div
          className="d-flex align-items-center border rounded-2 px-2 py-1 gap-2"
          style={{ backgroundColor: "#ffffff" }}
        >
          <button
            type="button"
            className="btn btn-sm btn-link text-muted p-0 text-decoration-none"
            onClick={() => onQuantityChange && onQuantityChange(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="fw-semibold px-2" style={{ minWidth: "20px", textAlign: "center" }}>
            {item.quantity}
          </span>
          <button
            type="button"
            className="btn btn-sm btn-link text-muted p-0 text-decoration-none"
            onClick={() => onQuantityChange && onQuantityChange(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Total price */}
        <div className="text-end" style={{ minWidth: "80px" }}>
          <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>
            ${Number(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          className="btn btn-sm btn-link text-danger p-1"
          onClick={() => onRemove && onRemove(item.id)}
          aria-label={`Remove ${item.title}`}
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  );
}
