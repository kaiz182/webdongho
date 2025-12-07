import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Kiểu dữ liệu cho item trong giỏ
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
}

// Kiểu state của giỏ
interface CartState {
  items: CartItem[];
}

// Lấy dữ liệu từ localStorage nếu có
const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ
    addToCart(state, action: PayloadAction<CartItem>) {
      const exist = state.items.find((i) => i.id === action.payload.id);
      if (exist) {
        exist.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Xóa sản phẩm khỏi giỏ
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // Cập nhật số lượng sản phẩm
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart(state) {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },

    // Set toàn bộ cart items (dùng khi fetch từ backend)
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

// Export action và reducer
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartItems, // <- export action mới
} = cartSlice.actions;

export default cartSlice.reducer;
