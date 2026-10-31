import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/products";

export const fetchAllProducts = createAsyncThunk(
  "productsSlice/fetchAllProducts",
  async function fetchProducts(_, { rejectWithValue }) {
    try {
      const data = await getAllProducts();

      return data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    isLoading: false,
    error: null,
    products: [],
    selectedProduct: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default productsSlice.reducer;
export const { setSelectedProduct } = productsSlice.actions;
