import React, { useState } from "react";
import Button from "../../components/common/Button";
import AddProductModal from "../../components/products/AddProductModal";
import EditProductModal from "../../components/products/EditProductModal";
import CreateUserModal from "../../components/users/CreateUserModal";
import EditUserModal from "../../components/users/EditUserModal";
import AddCartModal from "../../components/cart/AddCartModal";
import DeleteProductBottomSheet from "../../components/products/DeleteProductBottomSheet";
import DeleteUserBottomSheet from "../../components/users/DeleteUserBottomSheet";
import DeleteCartBottomSheet from "../../components/cart/DeleteCartBottomSheet";

export default function PreviewOverlaysPage({ initialOpen = null }) {
  const [activeOverlay, setActiveOverlay] = useState(initialOpen);

  const closeOverlay = () => setActiveOverlay(null);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark mb-2">Modals & Bottom Sheets Preview</h2>
        <p className="text-muted">
          All overlays are fully visual and controlled via <code>show</code> and <code>onHide</code> props.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Modals column */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="p-4 rounded-3 bg-white border shadow-sm h-100">
            <h5 className="fw-bold mb-3 text-dark">Modals</h5>
            <div className="d-flex flex-column gap-3">
              <Button
                variant="primary"
                onClick={() => setActiveOverlay("add-product")}
              >
                Open "Add Product Modal"
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveOverlay("edit-product")}
              >
                Open "Edit Product Modal"
              </Button>
              <Button
                variant="primary"
                onClick={() => setActiveOverlay("create-user")}
              >
                Open "Create User Modal"
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveOverlay("edit-user")}
              >
                Open "Edit User Modal"
              </Button>
              <Button
                variant="secondary"
                onClick={() => setActiveOverlay("add-cart")}
              >
                Open "Add Cart Modal" (Inferred)
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Sheets column */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="p-4 rounded-3 bg-white border shadow-sm h-100">
            <h5 className="fw-bold mb-3 text-dark">Bottom Sheets</h5>
            <div className="d-flex flex-column gap-3">
              <Button
                variant="danger"
                onClick={() => setActiveOverlay("delete-product")}
              >
                Open "Delete Product Bottom Sheet"
              </Button>
              <Button
                variant="danger"
                onClick={() => setActiveOverlay("delete-user")}
              >
                Open "Delete User Bottom Sheet"
              </Button>
              <Button
                variant="danger"
                onClick={() => setActiveOverlay("delete-cart")}
              >
                Open "Delete Cart Bottom Sheet" (Inferred)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Render active overlay */}
      <AddProductModal
        show={activeOverlay === "add-product"}
        onHide={closeOverlay}
      />
      <EditProductModal
        show={activeOverlay === "edit-product"}
        onHide={closeOverlay}
      />
      <CreateUserModal
        show={activeOverlay === "create-user"}
        onHide={closeOverlay}
      />
      <EditUserModal
        show={activeOverlay === "edit-user"}
        onHide={closeOverlay}
      />
      <AddCartModal
        show={activeOverlay === "add-cart"}
        onHide={closeOverlay}
      />

      <DeleteProductBottomSheet
        show={activeOverlay === "delete-product"}
        onHide={closeOverlay}
      />
      <DeleteUserBottomSheet
        show={activeOverlay === "delete-user"}
        onHide={closeOverlay}
      />
      <DeleteCartBottomSheet
        show={activeOverlay === "delete-cart"}
        onHide={closeOverlay}
      />
    </div>
  );
}
