import {
  FiTrendingUp,
  FiShoppingCart,
  FiAlertTriangle,
} from "../../../assets/icons";
export default function SummaryCards() {
  return (
    <div>
      <div className="row g-3">
        {/* Total Catalog Value */}
        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Total Catalog Value
              </span>

              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#EFF4FF", color: "#3525CD" }}
              >
                <FiTrendingUp size={18} />
              </div>
            </div>

            <div className="fs-4 fw-bold text-dark mb-1">$48,290.00</div>

            <div className="text-success small fw-medium">
              ↑ +12.4%{" "}
              <span className="text-muted fw-normal">vs last month</span>
            </div>
          </div>
        </div>

        {/* Active Customer Carts */}
        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Active Customer Carts
              </span>

              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}
              >
                <FiShoppingCart size={18} />
              </div>
            </div>

            <div className="fs-4 fw-bold text-dark mb-1">1,240</div>

            <div className="text-success small fw-medium">
              ↑ +5.8%{" "}
              <span className="text-muted fw-normal">in past 24 hours</span>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Low Stock Alerts
              </span>

              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#FEF2F2", color: "#DC2626" }}
              >
                <FiAlertTriangle size={18} />
              </div>
            </div>

            <div className="fs-4 fw-bold text-dark mb-1">18 Items</div>

            <div className="text-danger small fw-medium">
              Needs replenishment soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
