import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import PlaceholderBox from "../../components/common/PlaceholderBox";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiShield,
} from "../../assets/icons";
import { getUserById } from "../../services/users";

export default function SingleUserPage({
  user: initialUser = null,
  onBackClick,
  onEditClick,
  onDeleteClick,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fetchedUser, setFetchedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(!initialUser && Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadUser() {
      try {
        const data = await getUserById(id);
        if (!isCancelled) {
          setFetchedUser(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err.response?.data?.message || "Failed to load user details"
          );
          setIsLoading(false);
        }
      }
    }

    if (!initialUser && id) {
      loadUser();
    }

    return () => {
      isCancelled = true;
    };
  }, [id, initialUser]);

  const user = initialUser || fetchedUser;

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return (
      <div className="single-user-page pb-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading user...</span>
          </div>
          <div className="text-muted small mt-2">Loading user profile...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="single-user-page pb-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            type="button"
            className="btn btn-outline-light text-dark border p-2 rounded-3 bg-white"
            onClick={handleBack}
          >
            <FiArrowLeft size={18} />
          </button>
          <h4 className="fw-bold mb-0 text-dark">User Profile</h4>
        </div>
        <div className="p-4 rounded-3 bg-white border text-center text-danger">
          <p className="mb-2 fw-semibold">{error || "User not found."}</p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={handleBack}
          >
            Back to User Management
          </button>
        </div>
      </div>
    );
  }

  const roleBadgeStyle =
    user.role === "admin"
      ? { backgroundColor: "#F5F3FF", color: "#7C3AED" }
      : user.role === "moderator"
        ? { backgroundColor: "#EFF4FF", color: "#3525CD" }
        : { backgroundColor: "#DCFCE7", color: "#16A34A" };

  return (
    <div className="single-user-page pb-5">
      {/* Back button & top bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-outline-light text-dark border p-2 rounded-3 bg-white"
            onClick={handleBack}
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="fw-bold mb-0 text-dark">
                {user.firstName} {user.lastName}
              </h2>
              <Badge variant={user.role === "admin" ? "primary" : "neutral"}>
                {user.role}
              </Badge>
            </div>
            <div className="text-muted small">
              User ID: #{user.id} • DummyJSON Record
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          {onEditClick && (
            <Button
              variant="outline"
              icon={<FiEdit2 size={16} />}
              onClick={onEditClick}
            >
              Edit User
            </Button>
          )}
          {onDeleteClick && (
            <Button
              variant="danger"
              icon={<FiTrash2 size={16} />}
              onClick={onDeleteClick}
            >
              Delete User
            </Button>
          )}
        </div>
      </div>

      <div className="row g-4">
        {/* Left: User Profile Details Card */}
        <div className="col-12 col-lg-8">
          <div
            className="p-4 rounded-3 bg-white mb-4"
            style={{
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.firstName}
                  width={72}
                  height={72}
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <PlaceholderBox
                  width={72}
                  height={72}
                  label={`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`}
                  radius="50%"
                />
              )}
              <div>
                <h5 className="fw-bold text-dark mb-1">
                  {user.firstName} {user.lastName}
                </h5>
                <div className="text-muted small mb-2">@{user.username}</div>
                <span
                  className="badge text-uppercase"
                  style={{
                    ...roleBadgeStyle,
                    fontWeight: 600,
                    padding: "6px 12px",
                    borderRadius: 6,
                  }}
                >
                  <FiShield size={12} className="me-1" /> {user.role}
                </span>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="text-muted small text-uppercase fw-semibold mb-1">
                  Email Address
                </label>
                <div className="d-flex align-items-center gap-2 text-dark fw-medium">
                  <FiMail className="text-muted" size={16} /> {user.email}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="text-muted small text-uppercase fw-semibold mb-1">
                  Phone Number
                </label>
                <div className="d-flex align-items-center gap-2 text-dark fw-medium">
                  <FiPhone className="text-muted" size={16} /> {user.phone || "—"}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="text-muted small text-uppercase fw-semibold mb-1">
                  Address
                </label>
                <div className="d-flex align-items-center gap-2 text-dark fw-medium">
                  <FiMapPin className="text-muted" size={16} />
                  {user.address?.address || user.address?.city
                    ? `${user.address.address || ""}, ${user.address.city || ""}, ${user.address.state || ""} ${user.address.postalCode || ""}`
                    : "—"}
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="text-muted small text-uppercase fw-semibold mb-1">
                  Birth Date
                </label>
                <div className="d-flex align-items-center gap-2 text-dark fw-medium">
                  <FiCalendar className="text-muted" size={16} />{" "}
                  {user.birthDate || "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Account Summary Stats */}
        <div className="col-12 col-lg-4">
          <div
            className="p-4 rounded-3 bg-white"
            style={{
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h6 className="fw-bold mb-3 text-dark">Company & Role Overview</h6>
            <div className="d-flex align-items-center justify-content-between p-3 rounded-2 bg-light mb-3">
              <div className="d-flex align-items-center gap-2">
                <FiShoppingBag className="text-primary" />
                <span className="small text-muted">Department</span>
              </div>
              <span className="fw-bold text-dark">{user.company?.department || "Operations"}</span>
            </div>

            <div className="d-flex align-items-center justify-content-between p-3 rounded-2 bg-light mb-3">
              <div className="d-flex align-items-center gap-2">
                <FiShield className="text-primary" />
                <span className="small text-muted">Title</span>
              </div>
              <span className="fw-bold text-dark">{user.company?.title || user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
