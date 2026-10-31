import { Modal } from "react-bootstrap";
import { CloseIcon } from "../../assets/icons";

// Modal Wrapper - Purely controlled by show and onHide
export default function ModalWrapper({
  show = false,
  onHide,
  title,
  subtitle,
  children,
  size = "lg",
  footer = null,
  centered = true,
  className = "",
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      className={`custom-modal ${className}`}
      contentClassName="border-0 shadow-lg"
      style={{ borderRadius: "24px" }}
    >
      {(title || onHide) && (
        <Modal.Header className="border-0 pb-0 pt-4 px-4 d-flex align-items-start justify-content-between">
          <div>
            {title && (
              <h5
                className="modal-title fw-bold text-dark mb-1"
                style={{ fontSize: "1.25rem" }}
              >
                {title}
              </h5>
            )}
            {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-2 d-flex align-items-center justify-content-center text-muted"
            onClick={onHide}
            aria-label="Close modal"
          >
            <CloseIcon size={18} />
          </button>
        </Modal.Header>
      )}

      <Modal.Body className="p-4">{children}</Modal.Body>

      {footer && (
        <Modal.Footer className="border-0 pt-0 pb-4 px-4 d-flex justify-content-end gap-2">
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
}
