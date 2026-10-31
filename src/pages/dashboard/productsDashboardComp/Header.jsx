import { FiPlus } from "../../../assets/icons";
import Button from "../../../components/common/Button";

export default function Header({ onAddProductClick }) {
  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#1D1929" }}>
            Product Catalog
          </h2>

          <p className="text-muted small mb-0">
            Manage your store's items, pricing, inventory stock, and categories.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="primary"
            icon={<FiPlus size={16} />}
            onClick={onAddProductClick}
          >
            Add New Product
          </Button>
        </div>
      </div>
    </div>
  );
}
