import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../services/categories";

export const fetchAllCategories = createAsyncThunk(
  "CategoriesSlice/fetchAllCategories",
  async function fetchCategories(_, { rejectWithValue }) {
    try {
      const data = await getAllCategories();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState: {
    isLoading: false,
    error: null,
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default CategoriesSlice.reducer;
