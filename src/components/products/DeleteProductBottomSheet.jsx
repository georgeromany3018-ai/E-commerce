import React from "react";
import BottomSheet from "../common/BottomSheet";
import Button from "../common/Button";
import PlaceholderBox from "../common/PlaceholderBox";
import { FiAlertTriangle, FiTrash2, FiLock } from "../../assets/icons";

export default function DeleteProductBottomSheet({
  show = false,
  product = null,
  onHide,
  onConfirmDelete,
}) {
  const targetProduct = product || {
    id: 1,
    title: "Precision X1 Carbon Frame",
    sku: "SS-8429-CB",
    price: 3499.0,
    stock: 12,
  };

  return (
    <BottomSheet show={show} onHide={onHide} onConfirm={onConfirmDelete}>
      <div className="text-center mb-3">
        {/* Warning Icon */}
        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#FEE2E2",
            color: "#DC2626",
          }}
        >
          <FiAlertTriangle size={24} />
        </div>

        <h4 className="fw-bold text-dark mb-2">Delete Product?</h4>
        <p className="text-muted small mx-auto mb-4" style={{ maxWidth: 420 }}>
          This action is permanent and cannot be undone. All data associated
          with this product will be removed from the store's inventory.
        </p>

        {/* Product Preview Card */}
        <div
          className="p-3 rounded-3 d-flex align-items-center gap-3 text-start mb-4 mx-auto"
          style={{
            maxWidth: 480,
            backgroundColor: "#EFF4FF",
            border: "1px solid #D9E3F6",
          }}
        >
          <PlaceholderBox width={56} height={56} label="Item" radius={8} />
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
              {targetProduct.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
            </span>
            <div className="fw-bold text-dark">{targetProduct.title}</div>
            <div className="small text-muted">
              ID: {targetProduct.sku || `SS-842${targetProduct.id}-CB`} •{" "}
              <strong className="text-primary">
                ${targetProduct.price.toFixed(2)}
              </strong>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-4 mx-auto"
          style={{ maxWidth: 480 }}
        >
          <Button variant="outline" className="flex-grow-1" onClick={onHide}>
            Cancel and Go Back
          </Button>
          <Button
            variant="danger"
            className="flex-grow-1"
            icon={<FiTrash2 size={16} />}
            onClick={onConfirmDelete}
          >
            Confirm Delete
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-muted small" style={{ fontSize: "0.75rem" }}>
          <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
            <FiLock size={12} /> Secure Action Required
          </div>
          <div>© 2024 ShopStream Inc. Internal Admin Tool</div>
        </div>
      </div>
    </BottomSheet>
  );
}
