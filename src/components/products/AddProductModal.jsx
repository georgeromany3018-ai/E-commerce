import { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiUploadCloud } from "../../assets/icons";

export default function AddProductModal({ show = false, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    category: "audio",
    price: "",
    stock: "",
    description: "",
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

    onSubmit?.({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title="Add New Product"
      size="lg"
      footer={
        <div className="d-flex justify-content-end gap-2 w-100">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Product
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <Input
              label="Product Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. SonicWave Pro 2"
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU-0000-XX"
              required
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label small fw-medium text-dark mb-1">
              Category
            </label>

            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                borderRadius: 8,
                borderColor: "#C7C4D8",
                padding: "0.55rem 0.75rem",
              }}
            >
              <option value="audio">Audio</option>
              <option value="keyboards">Keyboards</option>
              <option value="drones">Drones</option>
              <option value="gaming">Gaming</option>
              <option value="home-theater">Home Theater</option>
            </select>
          </div>

          <div className="col-12 col-md-6">
            <Input
              label="Price ($)"
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
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium text-dark mb-1">
            Description
          </label>

          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product details..."
            style={{
              borderRadius: 8,
              borderColor: "#C7C4D8",
            }}
          />
        </div>

        <div className="mb-2">
          <label className="form-label small fw-medium text-dark mb-1">
            Product Images
          </label>

          <div
            className="p-4 text-center rounded-3"
            style={{
              backgroundColor: "#F8F9FF",
              border: "2px dashed #C7C4D8",
              cursor: "pointer",
            }}
          >
            <FiUploadCloud size={28} className="text-primary mb-2" />

            <div className="small text-muted">
              Click or drag images to upload
            </div>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
