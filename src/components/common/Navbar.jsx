import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon, CartIcon, UserIcon } from "../../assets/icons";
import { useSelector } from "react-redux";

// Store Navbar - Pure visual layer
export default function Navbar({ cartCount = 1, onCartClick, onUserClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("q") || "";
  const go = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  function handleSearch(e) {
    const value = e.target.value;

    setSearchParams({ q: value });
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    go(`/products?q=${searchValue}`);
  }

  return (
    <header className="shop-navbar d-flex align-items-center">
      <div
        className="container-fluid px-4 d-flex align-items-center justify-content-between"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Brand & Left Links */}
        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="brand-logo">
            ShopStream
          </Link>
          <nav className="d-none d-md-flex align-items-center gap-3 ms-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>

        {/* Right Actions: Search + Cart + Profile */}
        <div className="d-flex align-items-center gap-3">
          <form
            className="nav-search-bar d-none d-sm-block"
            onSubmit={handleOnSubmit}
          >
            <span className="search-icon">
              <SearchIcon size={16} />
            </span>
            <input
              type="search"
              className="form-control search-input"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearch}
              aria-label="Search products"
            />
          </form>

          <Link
            to="/cart"
            className="nav-action-btn"
            onClick={onCartClick}
            aria-label={`Cart with ${cartCount} items`}
          >
            <CartIcon size={20} />
            {cartCount > 0 && (
              <span className="badge-counter">{cartItems.length}</span>
            )}
          </Link>

          <Link
            to="/profile"
            className="nav-action-btn"
            onClick={onUserClick}
            aria-label="User Account"
          >
            <UserIcon size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
