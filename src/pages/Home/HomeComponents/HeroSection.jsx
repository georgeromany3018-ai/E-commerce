import heroImage from "../../../assets/hero.png";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div>
      <section
        className="py-5"
        style={{
          backgroundColor: "var(--color-bg-alt)",
          borderBottom: "1px solid rgba(199, 196, 216, 0.4)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <div className="row align-items-center gy-5">
            {/* Left Content */}
            <div className="col-12 col-lg-6 text-start">
              <span
                className="badge mb-3 px-3 py-2 fw-semibold rounded-pill"
                style={{
                  backgroundColor: "#d4edda",
                  color: "#28a745",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                NEW SEASON ARRIVAL
              </span>
              <h1
                className="fw-bold mb-3 display-5 text-capitalize"
                style={{
                  color: "var(--color-text-heading)",
                  lineHeight: 1.2,
                }}
              >
                Experience the Future <br /> of{" "}
                <span style={{ color: "#3b3bca" }}>Innovation.</span>
              </h1>
              <p
                className="text-muted mb-4"
                style={{
                  fontSize: "1.05rem",
                  maxWidth: "500px",
                  lineHeight: "1.6",
                }}
              >
                Explore our curated selection of premium electronics designed to
                elevate your daily stream of life. Precision engineering meets
                minimalist design.
              </p>

              <div className="d-flex align-items-center gap-3 flex-wrap">
                <Link to="/products">
                  <Button
                    variant="primary"
                    size="lg"
                    style={{
                      backgroundColor: "#2020c0",
                      borderColor: "#2020c0",
                    }}
                  >
                    Shop Electronics
                  </Button>
                </Link>
                <Link to="/products">
                  <Button
                    variant="secondary"
                    size="lg"
                    style={{
                      backgroundColor: "transparent",
                      color: "#2020c0",
                      borderColor: "#c7c4d8",
                    }}
                  >
                    View Collections
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
              <div
                className="position-relative"
                style={{
                  width: "100%",
                  maxWidth: "592px",
                }}
              >
                <img
                  src={heroImage}
                  alt="Premium Wireless Headphones"
                  className="img-fluid"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
