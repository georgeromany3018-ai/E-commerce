import React from "react";

export default function Badge({
  children,
  variant = "primary",
  pill = true,
  className = "",
  style = {},
}) {
  const variantStyles = {
    primary: {
      backgroundColor: "var(--color-primary-light)",
      color: "var(--color-primary)",
      border: "1px solid rgba(53, 37, 205, 0.2)",
    },
    success: {
      backgroundColor: "var(--color-success-bg)",
      color: "var(--color-success)",
      border: "1px solid var(--color-success-border)",
    },
    danger: {
      backgroundColor: "var(--color-danger-bg)",
      color: "var(--color-danger)",
      border: "1px solid var(--color-danger-border)",
    },
    warning: {
      backgroundColor: "var(--color-warning-bg)",
      color: "var(--color-warning)",
      border: "1px solid var(--color-warning-border)",
    },
    new: {
      backgroundColor: "var(--color-primary)",
      color: "#ffffff",
      border: "none",
    },
    neutral: {
      backgroundColor: "#F2F4F7",
      color: "#344054",
      border: "1px solid #D0D5DD",
    },
  }[variant] || {};

  return (
    <span
      className={`d-inline-flex align-items-center px-2 py-1 ${className}`}
      style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        borderRadius: pill ? "9999px" : "4px",
        lineHeight: 1.2,
        ...variantStyles,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
