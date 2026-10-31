import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllUsersWithLimits,
  getSearchedUsers,
  getFilteredUsersByRole,
} from "../../services/users";

export const fetchUsersDash = createAsyncThunk(
  "usersDashSlice/fetchUsersDash",
  async function (
    { limit = 8, skip = 0, sortBy = "firstName", sortOpt = "asc", searchedUser, role },
    { rejectWithValue }
  ) {
    try {
      let data;

      if (searchedUser) {
        data = await getSearchedUsers(searchedUser, limit, skip);
      } else if (role) {
        data = await getFilteredUsersByRole(role, limit, skip);
      } else {
        data = await getAllUsersWithLimits(limit, skip, sortBy, sortOpt);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong while fetching users"
      );
    }
  }
);

const usersDashSlice = createSlice({
  name: "usersDashSlice",

  initialState: {
    isLoading: false,
    error: null,
    users: [],
    limit: 8,
    skip: 0,
    total: 0,
    totalPages: 0,
  },

  reducers: {
    addUser: (state, action) => {
      state.users.unshift(action.payload);
      state.total += 1;
      state.totalPages = Math.ceil(state.total / state.limit);
    },

    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => Number(user.id) !== Number(action.payload)
      );
      state.total = Math.max(0, state.total - 1);
      state.totalPages = Math.ceil(state.total / state.limit);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsersDash.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchUsersDash.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.skip = action.payload.skip ?? 0;
      state.total = action.payload.total ?? 0;
      state.users = action.payload.users ?? [];
      state.totalPages = Math.ceil(state.total / state.limit);
    });

    builder.addCase(fetchUsersDash.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { addUser, updateUser, deleteUser } = usersDashSlice.actions;

export default usersDashSlice.reducer;
