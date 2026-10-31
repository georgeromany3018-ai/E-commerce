import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "../../assets/icons";
import Button from "../../components/common/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../store/Slices/authSlice";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((store) => store.auth);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await dispatch(fetchLogin({ username: userName, password })).unwrap();

      navigate("/profile");
    } catch (error) {
      console.log(error);
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
        style={{ maxWidth: "460px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
          <p className="text-muted small mb-0">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-dark">
              Username
            </label>

            <input
              type="text"
              className="form-control py-2"
              placeholder="Enter your username"
              style={{ borderRadius: "8px" }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label small fw-semibold text-dark mb-0">
                Password
              </label>

              <Link
                to="#"
                className="small fw-semibold text-primary text-decoration-none"
              >
                Forgot?
              </Link>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control py-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              defaultChecked
            />

            <label
              className="form-check-label small text-muted"
              htmlFor="rememberMe"
            >
              Stay signed in for 30 days
            </label>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-danger small mb-3" role="alert">
              {error}
            </p>
          )}

          {/* Sign In button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 mb-4 fw-bold"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <ArrowRightIcon size={18} />}
          </Button>

          {/* Register link */}
          <p className="text-center small text-muted mb-0">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="fw-bold text-primary text-decoration-none"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
