import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style = {},
  icon = null,
  ariaLabel,
  ...rest
}) {
  const variantClass = {
    primary: "btn-primary-custom",
    secondary: "btn-secondary-custom",
    outline: "btn-outline-neutral",
    danger: "btn-danger-custom",
    ghost: "btn-link text-decoration-none",
  }[variant] || "btn-primary-custom";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn ${variantClass} d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
      style={style}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
