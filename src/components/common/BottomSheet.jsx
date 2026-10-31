import React from "react";
import { AlertTriangleIcon } from "../../assets/icons";
import Button from "./Button";

// Bottom Sheet Component - Controlled purely by show and onHide
export default function BottomSheet({
  show = false,
  onHide,
  title = "Confirm Deletion",
  description = "This action is permanent and cannot be undone.",
  itemPreview = null,
  confirmText = "Confirm Delete",
  cancelText = "Cancel and Go Back",
  onConfirm,
  isDanger = true,
  footerNote = "Secure Action Required • © 2024 ShopStream Inc. Internal Admin Tool",
}) {
  if (!show) return null;

  return (
    <div
      className="bottom-sheet-backdrop"
      onClick={onHide}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="bottom-sheet-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle indicator */}
        <div className="d-flex justify-content-center mb-3">
          <div
            style={{
              width: "48px",
              height: "5px",
              borderRadius: "4px",
              backgroundColor: "var(--color-border-main)",
            }}
          />
        </div>

        {/* Warning Icon */}
        <div className="text-center mb-3">
          <span
            className="d-inline-flex align-items-center justify-content-center"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "var(--color-danger-bg)",
              color: "var(--color-danger)",
            }}
          >
            <AlertTriangleIcon size={28} />
          </span>
        </div>

        {/* Title & Desc */}
        <div className="text-center mb-4">
          <h4 className="fw-bold text-dark mb-2">{title}</h4>
          <p className="text-muted small mb-0 px-3">{description}</p>
        </div>

        {/* Item Preview Card */}
        {itemPreview && (
          <div
            className="p-3 mb-4 rounded-3"
            style={{
              backgroundColor: "var(--color-bg-alt)",
              border: "1px solid rgba(199, 196, 216, 0.4)",
            }}
          >
            {itemPreview}
          </div>
        )}

        {/* Actions */}
        <div className="d-flex flex-column flex-sm-row gap-3">
          <Button
            variant="outline"
            className="w-100 py-2"
            onClick={onHide}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? "danger" : "primary"}
            className="w-100 py-2"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>

        {/* Security Note */}
        {footerNote && (
          <p className="text-center text-muted small mt-4 mb-0" style={{ fontSize: "0.75rem" }}>
            {footerNote}
          </p>
        )}
      </div>
    </div>
  );
}
