export default function ProductCardSkeleton() {
  return (
    <div className="product-card product-card-skeleton">
      <div className="product-image-wrap">
        <div className="skeleton skeleton-image"></div>
      </div>

      <div className="product-content">
        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text skeleton-text-short"></div>

        <div className="skeleton-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="skeleton skeleton-star"></div>
          ))}
        </div>

        <div className="skeleton-footer">
          <div className="skeleton skeleton-price"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}
