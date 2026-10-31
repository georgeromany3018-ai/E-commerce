import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProductswithLimits,
  getSearchedProduct,
} from "../../services/products";

export const fetchAllProductsListing = createAsyncThunk(
  "productsListingSlice/fetchAllProductsListing",
  async function fetchProductsWithListing(
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

const productsListingSlice = createSlice({
  name: "productsListingSlice",
  initialState: {
    isLoading: false,
    error: null,
    products: [],
    limit: 9,
    skip: 0,
    total: 0,
    totalPages: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsListing.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProductsListing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.skip = action.payload.skip;
      state.total = action.payload.total;
      state.products = action.payload.products;
      state.totalPages = Math.ceil(state.total / state.limit);
    });
    builder.addCase(fetchAllProductsListing.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default productsListingSlice.reducer;
