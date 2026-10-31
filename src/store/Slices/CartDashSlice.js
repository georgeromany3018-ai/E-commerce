import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCartsWithLimits, getCartById } from "../../services/cart";

export const fetchCartsDash = createAsyncThunk(
  "cartDashSlice/fetchCartsDash",
  async function (
    { limit = 8, skip = 0, sortBy = "total", sortOpt = "desc", searchId },
    { rejectWithValue }
  ) {
    try {
      let data;

      if (searchId) {
        try {
          const singleCart = await getCartById(searchId);
          data = {
            carts: singleCart && singleCart.id ? [singleCart] : [],
            total: singleCart && singleCart.id ? 1 : 0,
            skip: 0,
            limit: limit,
          };
        } catch {
          data = {
            carts: [],
            total: 0,
            skip: 0,
            limit: limit,
          };
        }
      } else {
        data = await getAllCartsWithLimits(limit, skip, sortBy, sortOpt);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong while fetching carts"
      );
    }
  }
);

const cartDashSlice = createSlice({
  name: "cartDashSlice",

  initialState: {
    isLoading: false,
    error: null,
    carts: [],
    limit: 8,
    skip: 0,
    total: 0,
    totalPages: 0,
  },

  reducers: {
    addCart: (state, action) => {
      state.carts.unshift(action.payload);
      state.total += 1;
      state.totalPages = Math.ceil(state.total / state.limit);
    },

    deleteCart: (state, action) => {
      state.carts = state.carts.filter(
        (cart) => Number(cart.id) !== Number(action.payload)
      );
      state.total = Math.max(0, state.total - 1);
      state.totalPages = Math.ceil(state.total / state.limit);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCartsDash.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchCartsDash.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.skip = action.payload.skip ?? 0;
      state.total = action.payload.total ?? 0;
      state.carts = action.payload.carts ?? [];
      state.totalPages = Math.ceil(state.total / state.limit);
    });

    builder.addCase(fetchCartsDash.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { addCart, deleteCart } = cartDashSlice.actions;

export default cartDashSlice.reducer;
