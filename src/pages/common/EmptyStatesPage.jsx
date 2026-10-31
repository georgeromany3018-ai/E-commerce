import React from "react";
import { Link } from "react-router-dom";
import { CartIcon, SearchIcon, CheckIcon, MessageIcon } from "../../assets/icons";
import Button from "../../components/common/Button";
import PlaceholderBox from "../../components/common/PlaceholderBox";

export default function EmptyStatesPage() {
  return (
    <div className="py-5" style={{ backgroundColor: "var(--color-bg-base)" }}>
      <div className="container px-4" style={{ maxWidth: "var(--max-content-width)" }}>
        {/* Section 1: Empty Cart State */}
        <div className="bg-white p-5 rounded-4 border text-center mb-5 shadow-xs" style={{ borderColor: "var(--color-border-subtle)" }}>
          <div className="mb-4 position-relative d-inline-block">
            <PlaceholderBox
              width="180px"
              height="180px"
              borderRadius="50%"
              text="Empty Cart"
              style={{ backgroundColor: "#E0EAFF", color: "var(--color-primary)" }}
            />
          </div>

          <h2 className="fw-bold text-dark display-6 mb-2">Your cart is feeling light</h2>
          <p className="text-muted lead mx-auto mb-4" style={{ maxWidth: "460px", fontSize: "1.05rem" }}>
            It looks like you haven't added anything to your cart yet. Let's find something special for you.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/products" className="text-decoration-none">
              <Button variant="primary" size="lg" className="px-4">
                Start Shopping
              </Button>
            </Link>
            <Link to="/products" className="text-decoration-none">
              <Button variant="secondary" size="lg" className="px-4">
                View Saved Items
              </Button>
            </Link>
          </div>
        </div>

        <hr className="my-5 text-muted" />

        {/* Section 2: No Search Results State */}
        <div className="text-center mb-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 p-3"
            style={{ backgroundColor: "#EFF4FF", color: "var(--color-primary)" }}
          >
            <SearchIcon size={24} />
          </div>
          <h2 className="fw-bold text-dark mb-2">No results for "Astro-Glider Pro"</h2>
          <p className="text-muted small mb-5">We couldn't find exactly what you were looking for.</p>

          <div className="row g-4 text-start mb-5 justify-content-center">
            {/* Need a quick fix card */}
            <div className="col-12 col-md-7">
              <div
                className="p-4 rounded-3 border h-100 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3"
                style={{ backgroundColor: "#EFF4FF", borderColor: "rgba(53, 37, 205, 0.15)" }}
              >
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: "var(--color-primary)" }}>Need a quick fix?</h5>
                  <ul className="list-unstyled small mb-0 d-flex flex-column gap-2 text-dark">
                    <li className="d-flex align-items-center gap-2">
                      <CheckIcon size={16} className="text-success" /> Check your spelling for any typos.
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <CheckIcon size={16} className="text-success" /> Try using more general keywords.
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <CheckIcon size={16} className="text-success" /> Use the filters to broaden your search.
                    </li>
                  </ul>
                </div>
                <PlaceholderBox width="140px" height="100px" borderRadius="8px" text="Laptop" style={{ flexShrink: 0 }} />
              </div>
            </div>

            {/* Chat with us card */}
            <div className="col-12 col-md-5">
              <div
                className="p-4 rounded-3 border h-100 d-flex flex-column justify-content-between"
                style={{ backgroundColor: "#D1FADF", borderColor: "#A6F4C5" }}
              >
                <div>
                  <h5 className="fw-bold text-dark mb-2">Chat with us</h5>
                  <p className="text-muted small mb-3">Our shopping assistants are online and ready to help you find the right item.</p>
                </div>
                <button
                  type="button"
                  className="btn text-white fw-bold d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{ backgroundColor: "#027A48", borderRadius: "8px" }}
                >
                  <MessageIcon size={16} /> Start Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Browse popular categories pills */}
          <div>
            <h6 className="text-uppercase small fw-bold text-muted mb-3">BROWSE POPULAR CATEGORIES</h6>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {["Electronics", "Fashion", "Home", "Sports", "Beauty", "All Shop"].map((c) => (
                <Link
                  key={c}
                  to="/products"
                  className="px-4 py-2 rounded-3 text-decoration-none fw-semibold small"
                  style={{ backgroundColor: "#E0EAFF", color: "var(--color-primary)" }}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
