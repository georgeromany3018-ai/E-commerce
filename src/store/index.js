import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/productsSlice";
import CategoriesReducer from "./Slices/CategoriesSlice";
import productsListingReducer from "./Slices/productsListingSlice";
import cartReducer from "./Slices/cartSlice";
import authReducer from "./Slices/authSlice";
import productsDashReducer from "./Slices/productsDashSlice";
import cartDashReducer from "./Slices/CartDashSlice";
import usersDashReducer from "./Slices/usersDashSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productsListing: productsListingReducer,
    categories: CategoriesReducer,
    cart: cartReducer,
    auth: authReducer,
    productsDash: productsDashReducer,
    cartDash: cartDashReducer,
    usersDash: usersDashReducer,
  },
});
