import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  PackageIcon,
  CartIcon,
  UsersIcon,
  SlidersIcon,
  SettingsIcon,
  ArrowLeftIcon,
} from "../../assets/icons";
import PlaceholderBox from "./PlaceholderBox";

// Dashboard Sidebar (256px wide per Figma specs)
export default function Sidebar({ adminUser = { name: "Alex Rivera", role: "Master Admin" } }) {
  return (
    <aside className="dashboard-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand d-flex align-items-center justify-content-between">
        <div>
          <div className="fw-bold" style={{ color: "var(--color-primary)", fontSize: "1.25rem" }}>
            ShopStream
          </div>
          <div className="text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            ADMIN PANEL
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="sidebar-menu">
        <span className="menu-section-label">Management</span>

        <NavLink
          to="/dashboard/products"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <PackageIcon size={18} className="nav-icon" />
          <span>Products (Inventory)</span>
        </NavLink>

        <NavLink
          to="/dashboard/carts"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <CartIcon size={18} className="nav-icon" />
          <span>Carts & Orders</span>
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <UsersIcon size={18} className="nav-icon" />
          <span>User Management</span>
        </NavLink>

        <span className="menu-section-label">System</span>

        <Link to="#" className="sidebar-nav-item">
          <SettingsIcon size={18} className="nav-icon" />
          <span>Settings</span>
        </Link>

        <Link to="/" className="sidebar-nav-item mt-auto text-primary">
          <ArrowLeftIcon size={18} className="nav-icon" />
          <span>Back to Store</span>
        </Link>
      </div>

      {/* Sidebar Footer with Admin User Profile */}
      <div className="sidebar-footer d-flex align-items-center gap-3">
        <PlaceholderBox
          width="36px"
          height="36px"
          borderRadius="50%"
          text="AR"
          style={{ fontSize: "0.75rem", backgroundColor: "#D1FADF", color: "#027A48" }}
        />
        <div className="overflow-hidden">
          <div className="fw-bold text-dark text-truncate" style={{ fontSize: "0.875rem" }}>
            {adminUser.name}
          </div>
          <div className="text-muted text-uppercase" style={{ fontSize: "0.6875rem" }}>
            {adminUser.role}
          </div>
        </div>
      </div>
    </aside>
  );
}
