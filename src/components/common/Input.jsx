export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon = null,
  disabled = false,
  required = false,
  className = "",
  ...rest
}) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="form-label text-dark fw-medium small mb-1"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="position-relative">
        {icon && (
          <span
            className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
            style={{ pointerEvents: "none" }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`form-control ${icon ? "ps-5" : ""} ${error ? "is-invalid" : ""}`}
          style={{
            borderRadius: "8px",
            borderColor: error
              ? "var(--color-danger)"
              : "var(--color-border-main)",
            paddingTop: "0.55rem",
            paddingBottom: "0.55rem",
          }}
          {...rest}
        />
      </div>
      {error && (
        <div className="invalid-feedback d-block small mt-1">{error}</div>
      )}
      {helperText && !error && (
        <div className="form-text text-muted small mt-1">{helperText}</div>
      )}
    </div>
  );
}
