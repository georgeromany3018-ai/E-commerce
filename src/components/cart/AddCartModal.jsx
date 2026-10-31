import { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiShoppingCart, FiInfo } from "../../assets/icons";

export default function AddCartModal({
  show = false,
  onHide,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    userId: "1",
    productId: "1",
    productTitle: "Wireless Earbuds",
    price: "49.99",
    quantity: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = Math.max(1, Number(formData.quantity) || 1);
    const unitPrice = Math.max(0, Number(formData.price) || 0);
    const total = Number((unitPrice * qty).toFixed(2));

    onSubmit?.({
      id: Date.now(),
      userId: Number(formData.userId) || 1,
      total,
      discountedTotal: total,
      totalProducts: 1,
      totalQuantity: qty,
      products: [
        {
          id: Number(formData.productId) || 1,
          title: formData.productTitle || "Standard Item",
          price: unitPrice,
          quantity: qty,
          total,
          discountPercentage: 0,
          discountedTotal: total,
        },
      ],
    });
  };

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title={
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40, backgroundColor: "#EFF4FF", color: "#3525CD" }}
          >
            <FiShoppingCart size={20} />
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-dark">Create New Customer Cart</h5>
            <div className="text-muted small fw-normal">
              Initiate a manual shopping cart session.
            </div>
          </div>
        </div>
      }
      size="md"
      footer={
        <div className="d-flex justify-content-end gap-2 w-100">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Cart
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <Input
              label="Customer User ID"
              name="userId"
              type="number"
              min="1"
              value={formData.userId}
              onChange={handleChange}
              placeholder="e.g. 5"
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <Input
              label="Product ID"
              name="productId"
              type="number"
              min="1"
              value={formData.productId}
              onChange={handleChange}
              placeholder="e.g. 12"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <Input
            label="Product Title"
            name="productTitle"
            value={formData.productTitle}
            onChange={handleChange}
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            required
          />
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <Input
              label="Unit Price ($)"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Info box for simulated API notice */}
        <div
          className="p-3 rounded-3 d-flex align-items-start gap-2"
          style={{ backgroundColor: "#EFF4FF", border: "1px solid #D9E3F6" }}
        >
          <FiInfo size={18} className="text-primary mt-1 flex-shrink-0" />
          <div className="small text-muted" style={{ fontSize: "0.825rem" }}>
            Simulated action: New carts are tracked within this session. DummyJSON simulates creation and will not persist data permanently to its remote database.
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
