import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-3"
      style={{ backgroundColor: "var(--color-bg-alt)" }}
    >
      <div className="text-center mb-4">
        <Link
          to="/"
          className="brand-logo fw-bold"
          style={{ fontSize: "1.75rem", color: "var(--color-primary)" }}
        >
          ShopStream
        </Link>
      </div>

      <div className="w-100" style={{ maxWidth: "440px" }}>
        <Outlet />
      </div>

      <div className="mt-4 text-center">
        <span className="text-muted small">
          © 2024 ShopStream Inc. All rights reserved.
        </span>
      </div>
    </div>
  );
}
