import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UserIcon,
  ClockIcon,
  SettingsIcon,
  LogoutIcon,
  EditIcon,
  PackageIcon,
  CreditCardIcon,
  StarIcon,
} from "../../assets/icons";
import PlaceholderBox from "../../components/common/PlaceholderBox";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

function InfoItem({ label, value }) {
  return (
    <div className="col-12 col-md-6">
      <div
        className="p-3 rounded-2 border h-100"
        style={{ borderColor: "var(--color-border-subtle)" }}
      >
        <div className="text-muted small mb-1">{label}</div>
        <div className="fw-semibold text-dark text-break">
          {(value ?? value === 0) ? value : "Not available"}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, loggedIn } = useSelector((store) => store.auth);

  const profile = user || {};

  const fullName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    profile.username ||
    "User";

  console.log(user);

  return (
    <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div
        className="container px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        <div className="row g-4">
          {/* Account Sidebar */}
          <div className="col-12 col-lg-3">
            <div
              className="bg-white p-4 rounded-3 border shadow-xs"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">Account</h5>
                <p className="text-muted small mb-0">Manage your settings</p>
              </div>

              <div className="d-flex flex-column gap-2">
                <Link
                  to="/profile"
                  className="d-flex align-items-center gap-2 p-2 rounded-2 text-decoration-none fw-semibold"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "#ffffff",
                  }}
                >
                  <UserIcon size={18} />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="#"
                  className="d-flex align-items-center gap-2 p-2 rounded-2 text-decoration-none text-muted"
                >
                  <ClockIcon size={18} />
                  <span>Order History</span>
                </Link>

                <Link
                  to="#"
                  className="d-flex align-items-center gap-2 p-2 rounded-2 text-decoration-none text-muted"
                >
                  <SettingsIcon size={18} />
                  <span>Account Settings</span>
                </Link>

                <hr className="my-2 text-muted" />

                <Link
                  to="/login"
                  className="d-flex align-items-center gap-2 p-2 rounded-2 text-decoration-none text-danger"
                >
                  <LogoutIcon size={18} />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-12 col-lg-9">
            {!loggedIn && !profile.id ? (
              <div className="bg-white p-4 rounded-3 border">
                <h5 className="fw-bold text-dark">Profile</h5>
                <p className="text-muted mb-3">
                  Please sign in to view your profile information.
                </p>
                <Link to="/login" className="btn btn-primary">
                  Sign In
                </Link>
              </div>
            ) : (
              <>
                {/* Profile Header */}
                <div
                  className="bg-white p-4 rounded-3 border shadow-xs mb-4"
                  style={{ borderColor: "var(--color-border-subtle)" }}
                >
                  <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="position-relative">
                        {profile.image ? (
                          <img
                            src={profile.image}
                            alt={fullName}
                            width="96"
                            height="96"
                            className="rounded-circle object-fit-cover"
                          />
                        ) : (
                          <PlaceholderBox
                            width="96px"
                            height="96px"
                            borderRadius="50%"
                            text={fullName
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                            style={{
                              backgroundColor: "#1e293b",
                              color: "#ffffff",
                              fontSize: "1.5rem",
                              fontWeight: 700,
                            }}
                          />
                        )}

                        <button
                          type="button"
                          className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0 p-1 d-flex align-items-center justify-content-center"
                          style={{ width: "28px", height: "28px" }}
                          aria-label="Edit avatar"
                        >
                          <EditIcon size={14} />
                        </button>
                      </div>

                      <div>
                        <h3 className="fw-bold text-dark mb-1">{fullName}</h3>
                        <p className="text-muted small mb-2">
                          {profile.email || "Email not available"}
                        </p>

                        <div className="d-flex flex-wrap gap-2">
                          <Badge variant="success" pill>
                            {profile.role || "Customer"}
                          </Badge>

                          {profile.username && (
                            <Badge variant="neutral" pill>
                              @{profile.username}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      <Button variant="primary" className="fw-semibold">
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="fw-semibold">
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div
                  className="bg-white p-4 rounded-3 border shadow-xs mb-4"
                  style={{ borderColor: "var(--color-border-subtle)" }}
                >
                  <h5 className="fw-bold text-dark mb-3">
                    Personal Information
                  </h5>

                  <div className="row g-3">
                    <InfoItem label="First Name" value={profile.firstName} />
                    <InfoItem label="Last Name" value={profile.lastName} />
                    <InfoItem label="Username" value={profile.username} />
                    <InfoItem label="Email" value={profile.email} />
                    <InfoItem label="Phone" value={profile.phone} />
                    <InfoItem label="Age" value={profile.age} />
                    <InfoItem label="Gender" value={profile.gender} />
                    <InfoItem label="Birth Date" value={profile.birthDate} />
                    <InfoItem label="Blood Group" value={profile.bloodGroup} />
                    <InfoItem
                      label="Height"
                      value={profile.height ? `${profile.height} cm` : null}
                    />
                    <InfoItem
                      label="Weight"
                      value={profile.weight ? `${profile.weight} kg` : null}
                    />
                    <InfoItem label="Eye Color" value={profile.eyeColor} />
                    <InfoItem label="Hair Color" value={profile.hair?.color} />
                    <InfoItem label="Hair Type" value={profile.hair?.type} />
                  </div>
                </div>

                {/* Placeholder Statistics */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-4">
                    <div
                      className="bg-white p-3 rounded-3 border shadow-xs h-100"
                      style={{ borderColor: "var(--color-border-subtle)" }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="p-2 rounded-2"
                          style={{
                            backgroundColor: "#EFF4FF",
                            color: "var(--color-primary)",
                          }}
                        >
                          <PackageIcon size={20} />
                        </span>
                      </div>
                      <div className="text-muted small">Total Orders</div>
                      <h4 className="fw-bold text-dark mb-0">24</h4>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="bg-white p-3 rounded-3 border shadow-xs h-100">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="p-2 rounded-2"
                          style={{
                            backgroundColor: "#D1FADF",
                            color: "#027A48",
                          }}
                        >
                          <CreditCardIcon size={20} />
                        </span>
                      </div>
                      <div className="text-muted small">Wallet Balance</div>
                      <h4 className="fw-bold text-dark mb-0">$1,248.50</h4>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="bg-white p-3 rounded-3 border shadow-xs h-100">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="p-2 rounded-2"
                          style={{
                            backgroundColor: "#FEF0C7",
                            color: "#B54708",
                          }}
                        >
                          <StarIcon size={20} />
                        </span>
                      </div>
                      <div className="text-muted small">Loyalty Points</div>
                      <h4 className="fw-bold text-dark mb-0">4,800</h4>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div
                  className="bg-white p-4 rounded-3 border shadow-xs"
                  style={{ borderColor: "var(--color-border-subtle)" }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="fw-bold text-dark mb-0">Recent Orders</h5>
                    <Link
                      to="#"
                      className="text-primary small fw-semibold text-decoration-none"
                    >
                      View All
                    </Link>
                  </div>

                  <p className="text-muted small mb-0">
                    Order history is not provided by the current user API.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
