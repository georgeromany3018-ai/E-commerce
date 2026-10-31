import { Link } from "react-router-dom";
import { CartIcon } from "../../assets/icons";
import { StarIcon } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { addItem, fetchCartItems } from "../../store/Slices/cartSlice";

export default function ProductCard({ product }) {
  const getStars = (rating = 0) => {
    const stars = Math.round(Math.min(Math.max(rating, 0), 5));

    return [1, 2, 3, 4, 5].map((i) =>
      i <= stars ? (
        <StarIcon key={i} size={16} fill="currentColor" />
      ) : (
        <StarIcon key={i} size={16} />
      ),
    );
  };

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  function handleAddItem() {
    dispatch(addItem({ id: product.id, stock: product.stock }));
    dispatch(fetchCartItems());
  }

  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} className="w-100 h-100 d-block">
          <img src={product.thumbnail} alt="" />
        </Link>
        {product.rating > 4 && (
          <span className="badge-tag badge-bestseller">BEST SELLER</span>
        )}
      </div>

      <div className="product-content ">
        <span className="product-category ">{product.title}</span>
        <p
          className="text-muted small mb-3 flex-grow-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Link to={`/products/${product.id}`} className="text-muted fw-small">
            {product.description}
          </Link>
        </p>
        <div className="d-flex align-items-center gap-1 text-warning small">
          {getStars(product.rating)}
        </div>

        <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-2">
          <span className="product-price fw-bold">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            type="button"
            className="btn btn-sm d-inline-flex align-items-center gap-1 fw-semibold text-white px-3 py-1"
            style={{
              backgroundColor: "var(--color-primary)",
              borderRadius: "8px",
            }}
            onClick={handleAddItem}
          >
            <CartIcon size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
