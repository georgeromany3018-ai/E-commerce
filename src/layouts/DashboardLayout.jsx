import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import Sidebar from "../components/common/Sidebar";
import { SearchIcon, UserIcon } from "../assets/icons";

export default function DashboardLayout({ title = "Admin Dashboard" }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = useLocation();

  // يقفل الـ drawer لما تتنقل لصفحة تانية
  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  return (
    <div className="dashboard-wrapper">
      {/* فوق md: sidebar ثابت زي الأول | تحت md: drawer بيفتح من الشمال */}
      <Offcanvas
        responsive="md"
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        style={{ width: "256px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ShopStream</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Sidebar />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content Area */}
      <div className="dashboard-content-area">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div className="d-flex align-items-center gap-3">
            <Button
              variant="light"
              size="sm"
              className="d-md-none"
              onClick={() => setShowSidebar(true)}
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </Button>
            <h5 className="fw-bold mb-0 text-dark">{title}</h5>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div
              className="position-relative d-none d-md-block"
              style={{ width: "260px" }}
            >
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
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#EFF4FF",
                  color: "var(--color-primary)",
                }}
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
