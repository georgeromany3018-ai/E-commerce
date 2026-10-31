import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import Input from "../../../components/common/Input";
import { FiSearch, FiEdit2, FiTrash2 } from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsDash,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../store/Slices/productsDashSlice";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import EmptyState from "../../../components/common/EmptyState";
import EditProductModal from "../../../components/products/EditProductModal";
import DeleteProductBottomSheet from "../../../components/products/DeleteProductBottomSheet";
import AddProductModal from "../../../components/products/AddProductModal";

export default function DashboardContent({ showAddModal, onHideAddModal }) {
  const dispatch = useDispatch();
  const { isLoading, error, products, limit, skip, total, totalPages } =
    useSelector((store) => store.productsDash);

  const categories = [
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
    { slug: "home-decoration", name: "Home Decoration" },
    { slug: "kitchen-accessories", name: "Kitchen Accessories" },
    { slug: "laptops", name: "Laptops" },
    { slug: "mens-shirts", name: "Mens Shirts" },
    { slug: "mens-shoes", name: "Mens Shoes" },
    { slug: "mens-watches", name: "Mens Watches" },
    { slug: "mobile-accessories", name: "Mobile Accessories" },
    { slug: "motorcycle", name: "Motorcycle" },
    { slug: "skin-care", name: "Skin Care" },
    { slug: "smartphones", name: "Smartphones" },
    { slug: "sports-accessories", name: "Sports Accessories" },
    { slug: "sunglasses", name: "Sunglasses" },
    { slug: "tablets", name: "Tablets" },
    { slug: "tops", name: "Tops" },
    { slug: "vehicle", name: "Vehicle" },
    { slug: "womens-bags", name: "Womens Bags" },
    { slug: "womens-dresses", name: "Womens Dresses" },
    { slug: "womens-jewellery", name: "Womens Jewellery" },
    { slug: "womens-shoes", name: "Womens Shoes" },
    { slug: "womens-watches", name: "Womens Watches" },
  ];

  const sortBy = "stock";

  const [sortOpt, setSortOpt] = useState("desc");
  const [searchedProduct, setSearchedProduct] = useState("");
  const [category, setCategory] = useState("");

  const handleSortOptChange = (e) => {
    setSortOpt(e.target.value);
  };

  useEffect(() => {
    dispatch(
      fetchProductsDash({
        category,
        limit: 8,
        skip: 0,
        sortBy,
        sortOpt,
        searchedProduct,
      }),
    );
  }, [dispatch, category, sortOpt, searchedProduct]);

  const currentPage = skip / limit + 1;
  const windowSize = Math.min(5, totalPages);

  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - windowSize + 1),
  );

  const calcSkip = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    dispatch(
      fetchProductsDash({
        category,
        limit,
        skip: (page - 1) * limit,
        sortBy,
        sortOpt,
        searchedProduct,
      }),
    );
  };

  const handleRetry = () => {
    dispatch(
      fetchProductsDash({
        limit,
        skip,
        sortBy,
        sortOpt,
        searchedProduct,
        category,
      }),
    );
  };

  const from = total === 0 ? 0 : skip + 1;
  const to = skip + products.length;

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDeleteSheet, setShowDeleteSheet] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);

  return (
    <div>
      <div
        className="p-3 rounded-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="d-flex align-items-center gap-2 flex-grow-1"
          style={{ maxWidth: 440 }}
        >
          <Input
            placeholder="Search products by title...."
            icon={<FiSearch size={16} />}
            className="w-100"
            value={searchedProduct}
            onChange={(e) => {
              setSearchedProduct(e.target.value);
            }}
          />
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Category */}
          <select
            className="form-select form-select-sm"
            style={{
              width: "auto",
              minWidth: 140,
              borderRadius: 8,
              borderColor: "#E2E8F0",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Stock Status - Sorting by stock */}
          <select
            className="form-select form-select-sm"
            style={{
              width: "auto",
              minWidth: 200,
              borderRadius: 8,
              borderColor: "#E2E8F0",
            }}
            value={sortOpt}
            onChange={handleSortOptChange}
          >
            <option value="asc">From Low Stock to In Stock</option>
            <option value="desc">From In Stock to Low Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div
        className="rounded-3 overflow-hidden mb-4"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              style={{
                backgroundColor: "#F8F9FF",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <tr>
                <th className="text-muted small text-uppercase py-3">
                  Product
                </th>

                <th className="text-muted small text-uppercase py-3">
                  Category
                </th>

                <th className="text-muted small text-uppercase py-3">Price</th>

                <th className="text-muted small text-uppercase py-3">
                  Inventory
                </th>

                <th className="text-muted small text-uppercase py-3 text-end pe-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Loading Shimmer */}
              {isLoading ? (
                Array.from({ length: 8 }, (_, index) => (
                  <tr
                    key={`skeleton-${index}`}
                    className="placeholder-glow"
                    style={{ borderBottom: "1px solid #F1F5F9" }}
                  >
                    {/* Product */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="placeholder rounded"
                          style={{
                            width: 46,
                            height: 46,
                            flexShrink: 0,
                          }}
                        />

                        <div className="flex-grow-1">
                          <span
                            className="placeholder col-8 mb-2"
                            style={{ height: 14 }}
                          />

                          <br />

                          <span
                            className="placeholder col-5"
                            style={{ height: 11 }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span
                        className="placeholder rounded"
                        style={{ width: 85, height: 25 }}
                      />
                    </td>

                    {/* Price */}
                    <td>
                      <span
                        className="placeholder col-7 mb-2"
                        style={{ height: 14 }}
                      />

                      <br />

                      <span
                        className="placeholder col-5"
                        style={{ height: 11 }}
                      />
                    </td>

                    {/* Inventory */}
                    <td>
                      <span
                        className="placeholder rounded"
                        style={{ width: 95, height: 25 }}
                      />
                    </td>

                    {/* Actions */}
                    <td className="text-end pe-3">
                      <span
                        className="placeholder rounded me-2"
                        style={{ width: 28, height: 28 }}
                      />

                      <span
                        className="placeholder rounded"
                        style={{ width: 28, height: 28 }}
                      />
                    </td>
                  </tr>
                ))
              ) : error ? (
                /* Error State */
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <div className="text-danger fw-semibold mb-2">
                      Failed to load products
                    </div>

                    <p className="text-muted small mb-3">
                      {typeof error === "string"
                        ? error
                        : "Something went wrong while loading products."}
                    </p>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleRetry}
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                /* Empty State */
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                /* Products */
                products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    {/* Product */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          width={46}
                          height={46}
                          style={{
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />

                        <div>
                          <div
                            className="fw-semibold text-dark mb-0"
                            style={{ fontSize: "0.925rem" }}
                          >
                            {p.title}
                          </div>

                          <div className="text-muted small">
                            SKU-00{p.id} • {p.brand}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span
                        className="badge text-capitalize"
                        style={{
                          backgroundColor: "#EFF4FF",
                          color: "#3525CD",
                          fontWeight: 500,
                          padding: "6px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {p.category.replace("-", " ")}
                      </span>
                    </td>

                    {/* Price */}
                    <td>
                      <div className="fw-bold text-dark">
                        ${p.price.toFixed(2)}
                      </div>

                      {p.discountPercentage > 0 && (
                        <div className="text-muted small text-decoration-line-through">
                          ${(p.price * 1.15).toFixed(2)}
                        </div>
                      )}
                    </td>

                    {/* Inventory */}
                    <td>
                      <Badge
                        variant={
                          p.availabilityStatus === "In Stock"
                            ? "success"
                            : p.availabilityStatus === "Out of Stock"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {p.availabilityStatus}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="text-end pe-3">
                      <div className="d-inline-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-light text-secondary border-0 p-2"
                          title="Edit Product"
                          onClick={() => {
                            setSelectedProduct(p);
                            setShowEditModal(true);
                          }}
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-light text-danger border-0 p-2"
                          title="Delete Product"
                          onClick={() => {
                            setSelectedDeleteProduct(p);
                            setShowDeleteSheet(true);
                          }}
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="text-muted small">
            Showing{" "}
            <strong className="text-dark">
              {from}-{to}
            </strong>{" "}
            of <strong className="text-dark">{total}</strong> products
          </div>

          {totalPages > 1 && (
            <div>
              <Pagination className="my-2 justify-content-center">
                {currentPage > 1 && (
                  <Pagination.First
                    onClick={() => calcSkip(1)}
                    disabled={isLoading}
                  />
                )}

                <Pagination.Prev
                  onClick={() => calcSkip(currentPage - 1)}
                  disabled={isLoading || currentPage <= 1}
                />

                {Array.from({ length: windowSize }, (_, index) => {
                  const page = startPage + index;

                  return (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      disabled={isLoading}
                      onClick={() => calcSkip(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  onClick={() => calcSkip(currentPage + 1)}
                  disabled={isLoading || currentPage >= totalPages}
                />

                {currentPage < totalPages && (
                  <Pagination.Last
                    onClick={() => calcSkip(totalPages)}
                    disabled={isLoading}
                  />
                )}
              </Pagination>
            </div>
          )}
        </div>
      </div>
      <EditProductModal
        show={showEditModal}
        product={selectedProduct}
        onHide={() => setShowEditModal(false)}
        onSubmit={(updatedProduct) => {
          dispatch(updateProduct(updatedProduct));
          setShowEditModal(false);
        }}
      />
      <DeleteProductBottomSheet
        show={showDeleteSheet}
        product={selectedDeleteProduct}
        onHide={() => {
          setShowDeleteSheet(false);
          setSelectedDeleteProduct(null);
        }}
        onConfirmDelete={() => {
          if (!selectedDeleteProduct) return;

          dispatch(deleteProduct(selectedDeleteProduct.id));

          setShowDeleteSheet(false);
          setSelectedDeleteProduct(null);
        }}
      />
      <AddProductModal
        show={showAddModal}
        onHide={onHideAddModal}
        onSubmit={(newProduct) => {
          const product = {
            ...newProduct,
            id: Date.now(),
            thumbnail: "",
            brand: "—",
            discountPercentage: 0,
          };

          dispatch(addProduct(product));
          onHideAddModal();
        }}
      />
    </div>
  );
}
