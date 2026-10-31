
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import { SearchIcon, UserIcon } from "../assets/icons";

export default function DashboardLayout({ title = "Admin Dashboard" }) {
  return (
    <div className="dashboard-wrapper">
      {/* 256px Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-content-area">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="d-flex align-items-center gap-3">
            <h5 className="fw-bold mb-0 text-dark">{title}</h5>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="position-relative d-none d-md-block" style={{ width: "260px" }}>
              <span
                className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
                style={{ pointerEvents: "none" }}
              >
                <SearchIcon size={16} />
              </span>
              <input
                type="text"
                className="form-control form-control-sm ps-5 rounded-pill"
                placeholder="Search records..."
                aria-label="Search records"
              />
            </div>

            <Link
              to="/profile"
              className="d-flex align-items-center gap-2 text-decoration-none text-dark"
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px", backgroundColor: "#EFF4FF", color: "var(--color-primary)" }}
              >
                <UserIcon size={18} />
              </div>
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
