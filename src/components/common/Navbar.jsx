import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { SearchIcon, CartIcon, UserIcon } from "../../assets/icons";
import { useSelector } from "react-redux";

export default function Navbar({ cartCount = 1, onCartClick, onUserClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("q") || "";
  const go = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);

  function handleSearch(e) {
    const value = e.target.value;
    setSearchParams({ q: value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    go(`/products?q=${searchValue}`);
    setIsOpen(false);
  }

  return (
    <header
      className="shop-navbar d-flex align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="container-fluid px-4 d-flex align-items-center justify-content-between"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Brand & Left Links */}
        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="brand-logo" onClick={() => setIsOpen(false)}>
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

          <button
            className="navbar-toggler d-block d-md-none border-0 p-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="shopNavbarContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            style={{ outline: "none", boxShadow: "none" }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="d-flex align-items-center gap-3">
          <form
            className="nav-search-bar d-none d-md-block"
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
            onClick={(e) => {
              setIsOpen(false);
              if (onCartClick) onCartClick(e);
            }}
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
            onClick={(e) => {
              setIsOpen(false);
              if (onUserClick) onUserClick(e);
            }}
            aria-label="User Account"
          >
            <UserIcon size={20} />
          </Link>
        </div>

        {isOpen && (
          <div
            className="d-block d-md-none"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#ffffff",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              paddingBottom: "1.5rem",
              paddingTop: "1rem",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              zIndex: 1040,
            }}
          >
            <nav className="d-flex flex-column gap-3 mb-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </nav>

            <form className="nav-search-bar w-100" onSubmit={handleOnSubmit}>
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
          </div>
        )}
      </div>
    </header>
  );
}
