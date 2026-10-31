
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authLogin, getCurrentUser } from "../../services/auth";

export const fetchLogin = createAsyncThunk(
  "authSlice/fetchLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await authLogin({ username, password });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "authSlice/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      return await getCurrentUser(token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",

  initialState: {
    isLoading: false,
    error: null,
    user: {},
    loggedIn: false,
    token: localStorage.getItem("token"),
    isAuthChecked: false,
  },

  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },

    logout: (state) => {
      state.user = {};
      state.loggedIn = false;
      state.token = null;
      state.error = null;
      state.isAuthChecked = true;

      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        state.loggedIn = true;
        state.token = action.payload.accessToken;
        state.isAuthChecked = true;

        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.loggedIn = false;
        state.isAuthChecked = true;
      })

      // Restore user after refresh
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        state.loggedIn = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = {};
        state.loggedIn = false;
        state.token = null;
        state.isAuthChecked = true;

        localStorage.removeItem("token");
      });
  },
});

export const { setAuthChecked, logout } = authSlice.actions;

export default authSlice.reducer;
