export default function PromoSection() {
  return (
    <div>
      <section className="py-5">
        <div
          className="container px-4"
          style={{ maxWidth: "var(--max-content-width)" }}
        >
          <div
            className="p-5 text-white position-relative overflow-hidden"
            style={{
              backgroundColor: "var(--color-primary)",
              borderRadius: "24px",
            }}
          >
            <div
              className="row align-items-center gy-4 position-relative"
              style={{ zIndex: 2 }}
            >
              <div className="col-12 col-lg-7">
                <h2 className="fw-bold display-6 mb-3">
                  Stay Ahead of the Stream
                </h2>
                <p
                  className="text-white-50 lead mb-4"
                  style={{ maxWidth: "520px", fontSize: "1rem" }}
                >
                  Join our inner circle for exclusive early access to product
                  launches, seasonal deals, and curated tech trends. No spam,
                  just high-quality updates.
                </p>
                <form
                  className="d-flex flex-column flex-sm-row gap-2"
                  style={{ maxWidth: "440px" }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "#ffffff",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn fw-semibold px-4"
                    style={{
                      backgroundColor: "#027A48",
                      color: "#ffffff",
                      borderRadius: "8px",
                    }}
                  >
                    Join Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
