  import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserIcon,
  EyeIcon,
  ArrowRightIcon,
  ShieldIcon,
} from "../../assets/icons";
import Button from "../../components/common/Button";
import { registerUser } from "../../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service.");
      return;
    }

    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    setIsLoading(true);

    try {
      await registerUser({
        firstName,
        lastName,
        username: formData.username.trim().replace(/^@/, ""),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="py-5 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "var(--color-bg-alt)",
        minHeight: "80vh",
      }}
    >
      <div
        className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white w-100"
        style={{ maxWidth: "480px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-2">Create Account</h2>
          <p className="text-muted small mb-0">
            Join ShopStream for a personalized shopping experience.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="form-label small fw-semibold text-dark"
            >
              Full Name
            </label>

            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <UserIcon size={18} />
              </span>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className="form-control ps-5 py-2"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>

          {/* Username & Email */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-sm-6">
              <label
                htmlFor="username"
                className="form-label small fw-semibold text-dark"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="form-control py-2"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label
                htmlFor="email"
                className="form-label small fw-semibold text-dark"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="form-control py-2"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label small fw-semibold text-dark"
            >
              Password
            </label>

            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                🔒
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="form-control ps-5 pe-5 py-2"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />

              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-1 p-2 text-muted border-0"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon size={18} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="form-label small fw-semibold text-dark"
            >
              Confirm Password
            </label>

            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <ShieldIcon size={18} />
              </span>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="form-control ps-5 pe-5 py-2"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              />

              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-1 p-2 text-muted border-0"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <EyeIcon size={18} />
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheck"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />

            <label
              className="form-check-label small text-muted"
              htmlFor="termsCheck"
            >
              I agree to the{" "}
              <Link to="#" className="text-primary text-decoration-none">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-primary text-decoration-none">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="alert alert-success py-2 small" role="status">
              {success}
            </div>
          )}

          {/* Submit */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 mb-4 fw-bold"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
            {!isLoading && <ArrowRightIcon size={18} />}
          </Button>

          {/* Divider */}
          <div className="d-flex align-items-center mb-4">
            <div className="flex-grow-1 border-bottom" />
            <span className="px-3 text-muted small text-nowrap">
              Or register with
            </span>
            <div className="flex-grow-1 border-bottom" />
          </div>

          {/* Social buttons */}
          <div className="row g-2 mb-4">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-light border text-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small fw-semibold"
                style={{ borderRadius: "8px" }}
              >
                <span>G</span> Google
              </button>
            </div>

            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-light border text-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2 small fw-semibold"
                style={{ borderRadius: "8px" }}
              >
                <span></span> Apple
              </button>
            </div>
          </div>

          {/* Sign In */}
          <p className="text-center small text-muted mb-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-bold text-primary text-decoration-none"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
