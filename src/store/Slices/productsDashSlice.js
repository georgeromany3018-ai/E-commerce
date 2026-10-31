import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProductswithLimits,
  getSearchedProduct,
} from "../../services/products";

export const fetchProductsDash = createAsyncThunk(
  "productsDashSlice/fetchProductsDash",
  async function (
    { category, limit, skip, sortBy, sortOpt, searchedProduct },
    { rejectWithValue },
  ) {
    try {
      let data;

      if (searchedProduct) {
        data = await getSearchedProduct(searchedProduct);
      } else {
        data = await getAllProductswithLimits(
          category,
          limit,
          skip,
          sortBy,
          sortOpt,
          searchedProduct,
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const productsDashSlice = createSlice({
  name: "productsDashSlice",

  initialState: {
    isLoading: false,
    error: null,
    products: [],
    limit: 8,
    skip: 0,
    total: 0,
    totalPages: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
      state.total += 1;
      state.totalPages = Math.ceil(state.total / state.limit);
    },

    updateProduct: (state, action) => {
      const updatedProduct = action.payload;

      state.products = state.products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product,
      );
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );

      state.total = Math.max(0, state.total - 1);
      state.totalPages = Math.ceil(state.total / state.limit);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductsDash.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchProductsDash.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.skip = action.payload.skip;
      state.total = action.payload.total;
      state.products = action.payload.products;
      state.totalPages = Math.ceil(state.total / state.limit);
    });

    builder.addCase(fetchProductsDash.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsDashSlice.actions;

export default productsDashSlice.reducer;
