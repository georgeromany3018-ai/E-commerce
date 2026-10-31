import React from "react";
import { Link } from "react-router-dom";
import { GlobeIcon, MessageIcon, CompassIcon, CreditCardIcon } from "../../assets/icons";

// Store Footer - Visual layer only
export default function Footer() {
  return (
    <footer className="shop-footer">
      <div className="container px-4" style={{ maxWidth: "var(--max-content-width)" }}>
        <div className="row g-4 justify-content-between">
          {/* Brand & mission */}
          <div className="col-12 col-lg-4">
            <Link to="/" className="footer-brand">
              ShopStream
            </Link>
            <p className="footer-desc">
              A premium e-commerce experience dedicated to delivering the world's most
              innovative electronics right to your doorstep.
            </p>
            <div className="d-flex align-items-center gap-2 mt-3">
              <span className="footer-social-btn" aria-label="Website">
                <GlobeIcon size={16} />
              </span>
              <span className="footer-social-btn" aria-label="Support chat">
                <MessageIcon size={16} />
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-6 col-sm-4 col-lg-2">
            <h6 className="footer-heading">SHOP</h6>
            <ul className="footer-links">
              <li><Link to="/products">All Electronics</Link></li>
              <li><Link to="/products?category=wearables">Wearables</Link></li>
              <li><Link to="/products?category=computing">Home Office</Link></li>
              <li><Link to="/products?filter=new">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="col-6 col-sm-4 col-lg-2">
            <h6 className="footer-heading">SUPPORT</h6>
            <ul className="footer-links">
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">Shipping Info</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">FAQ</Link></li>
            </ul>
          </div>

          <div className="col-6 col-sm-4 col-lg-2">
            <h6 className="footer-heading">LEGAL</h6>
            <ul className="footer-links">
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>© 2024 ShopStream Inc. All rights reserved.</span>
          <div className="d-flex align-items-center gap-3 text-muted">
            <CreditCardIcon size={20} aria-label="Payment method" />
          </div>
        </div>
      </div>
    </footer>
  );
}
