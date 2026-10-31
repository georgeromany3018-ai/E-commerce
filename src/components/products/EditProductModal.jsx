import ModalWrapper from "../common/ModalWrapper";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiUploadCloud } from "../../assets/icons";
import { useState, useEffect } from "react";

export default function EditProductModal({
  show = false,
  product = null,
  onHide,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    if (!product) return;

    setFormData({
      title: product.title ?? "",
      sku: product.sku || `SKU-000${product.id}-AUD`,
      category: product.category ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      description: product.description ?? "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({
        ...formData,
        id: product.id,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
    }
  };

  if (!product) return null;

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title="Edit Product"
      size="lg"
      footer={
        <div className="d-flex justify-content-end gap-2 w-100">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
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
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
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
              required
              style={{
                borderRadius: 8,
                borderColor: "#C7C4D8",
                padding: "0.55rem 0.75rem",
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
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
              value={formData.price}
              onChange={handleChange}
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
              value={formData.stock}
              onChange={handleChange}
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
              Click or drag images to replace current photo
            </div>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
