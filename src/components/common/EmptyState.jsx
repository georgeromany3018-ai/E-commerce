import { FiPackage } from "react-icons/fi";

export default function EmptyState({ className = "" }) {
  return (
    <div
      className={`text-center py-5 px-3 d-flex flex-column align-items-center justify-content-center ${className}`}
      style={{ minHeight: "360px" }}
    >
      <FiPackage size={48} color="#94A3B8" />
      <h3 className="fw-bold text-dark mt-3 mb-0">No Products Found</h3>
    </div>
  );
}
