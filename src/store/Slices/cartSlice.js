import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems } from "../../services/cart";
import toast from "react-hot-toast";

export const fetchCartItems = createAsyncThunk(
  "cartSlice/fetchCartItems",
  async function (_, { rejectWithValue, getState }) {
    try {
      //to get local cart
      const store = getState();
      const items = store.cart.items;
      //to get the data from api
      const cartItems = await Promise.all(
        items.map(async (item) => {
          const cartItem = await getCartItems(item.id);
          return { ...cartItem, quantity: item.quantity };
        }),
      );
      //to calc. the total from cart
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      return { totalAmount, cartItems };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    isLoading: false,
    error: null,
    items: JSON.parse(localStorage.getItem("cart")) || [],
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { id, stock } = action.payload;
      const product = state.items.find((itm) => itm.id === id);
      if (product) {
        if (product.quantity >= stock) {
          toast.error(`you can't add More Than the ${stock}`);
          return;
        }
        product.quantity += 1;
        toast.success("item added Successfully");
      } else {
        state.items.push({ id, quantity: 1 });
        toast.success("item added Successfully");
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((itm) => itm.id !== id);
      toast.success("item Removed Successfully");

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incQty: (state, action) => {
      const id = action.payload;
      const product = state.items.find((itm) => itm.id === id);
      if (product) {
        if (product.quantity > product.stock) {
          toast.error(`you can't add More `);
          return;
        }
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decQty: (state, action) => {
      const id = action.payload;
      const product = state.items.find((itm) => itm.id === id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.cartItems = action.payload.cartItems;
      state.totalAmount = action.payload.totalAmount;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { addItem, removeItem, incQty, decQty } = cartSlice.actions;
export default cartSlice.reducer;
