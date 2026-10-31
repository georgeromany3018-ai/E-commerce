export default function CategorySkeleton() {
  return (
    <div className="row g-4">
      {/* Large Card */}
      <div className="col-12 col-md-6">
        <div className="category-tile-skeleton" style={{ minHeight: "360px" }}>
          <div className="skeleton" />
        </div>
      </div>

      {/* Right Stack */}
      <div className="col-12 col-md-6 d-flex flex-column gap-4">
        <div className="row g-4">
          <div className="col-6">
            <div
              className="category-tile-skeleton"
              style={{ minHeight: "165px" }}
            >
              <div className="skeleton" />
            </div>
          </div>

          <div className="col-6">
            <div
              className="category-tile-skeleton"
              style={{ minHeight: "165px" }}
            >
              <div className="skeleton" />
            </div>
          </div>
        </div>

        {/* Wide Card */}
        <div>
          <div
            className="category-tile-skeleton"
            style={{ minHeight: "165px" }}
          >
            <div className="skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}
