import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../assets/icons";

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className = "",
}) {
  const pages = [1, 2, 3, "...", totalPages];

  return (
    <nav className={`d-flex align-items-center justify-content-center gap-2 ${className}`} aria-label="Pagination">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
        style={{ width: "36px", height: "36px", borderRadius: "8px" }}
        disabled={currentPage === 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <ChevronLeftIcon size={16} />
      </button>

      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span key={`dots-${idx}`} className="px-2 text-muted">
              ...
            </span>
          );
        }
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            className={`btn btn-sm ${isActive ? "btn-primary-custom" : "btn-outline-neutral"}`}
            style={{ width: "36px", height: "36px", borderRadius: "8px", fontWeight: 600 }}
            onClick={() => onPageChange && onPageChange(p)}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
        style={{ width: "36px", height: "36px", borderRadius: "8px" }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <ChevronRightIcon size={16} />
      </button>
    </nav>
  );
}
