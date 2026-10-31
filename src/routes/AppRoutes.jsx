import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Store & Public Pages
import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/products/ProductsPage";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/cart/CheckoutPage";
import OrderSuccessPage from "../pages/cart/OrderSuccessPage";
import ProfilePage from "../pages/users/ProfilePage";
import EmptyStatesPage from "../pages/common/EmptyStatesPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Dashboard & Admin Pages
import ProductDashboardPage from "../pages/dashboard/ProductDashboardPage";
import UserManagementPage from "../pages/dashboard/UserManagementPage";
import SingleUserPage from "../pages/users/SingleUserPage";
import CartManagementPage from "../pages/dashboard/CartManagementPage";
import SingleCartPage from "../pages/cart/SingleCartPage";

// Preview Overlays Page
import PreviewOverlaysPage from "../pages/common/PreviewOverlaysPage";

// Auth Actions
import { fetchUser, setAuthChecked } from "../store/Slices/authSlice";

export default function AppRoutes() {
  const dispatch = useDispatch();

  const { token, isAuthChecked } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    } else {
      dispatch(setAuthChecked());
    }
  }, [dispatch, token]);

  if (!isAuthChecked) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <Routes>
      {/* Customer Storefront Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/empty-states" element={<EmptyStatesPage />} />
      </Route>

      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<ProductDashboardPage />} />
        <Route path="products" element={<ProductDashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="users/:id" element={<SingleUserPage />} />
        <Route path="carts" element={<CartManagementPage />} />
        <Route path="carts/:id" element={<SingleCartPage />} />
      </Route>

      {/* Preview Routes */}
      <Route element={<MainLayout />}>
        <Route path="/preview" element={<PreviewOverlaysPage />} />

        <Route
          path="/preview/modal-add-product"
          element={<PreviewOverlaysPage initialOpen="add-product" />}
        />

        <Route
          path="/preview/modal-edit-product"
          element={<PreviewOverlaysPage initialOpen="edit-product" />}
        />

        <Route
          path="/preview/modal-create-user"
          element={<PreviewOverlaysPage initialOpen="create-user" />}
        />

        <Route
          path="/preview/modal-edit-user"
          element={<PreviewOverlaysPage initialOpen="edit-user" />}
        />

        <Route
          path="/preview/modal-add-cart"
          element={<PreviewOverlaysPage initialOpen="add-cart" />}
        />

        <Route
          path="/preview/sheet-delete-product"
          element={<PreviewOverlaysPage initialOpen="delete-product" />}
        />

        <Route
          path="/preview/sheet-delete-user"
          element={<PreviewOverlaysPage initialOpen="delete-user" />}
        />

        <Route
          path="/preview/sheet-delete-cart"
          element={<PreviewOverlaysPage initialOpen="delete-cart" />}
        />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
