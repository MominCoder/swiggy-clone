import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQty: 0,
    bill: 0,
  },
  reducers: {
    addItem: (state, action) => {
      // state.items.push(action.payload);

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push(action.payload);
        state.totalQty++;
      }
    },
    // removeItem: (state) => {
    //   state.items.pop();
    // },
    clearAll: (state) => {
      state.items = [];
    },

    incrementQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      existingItem.qty++;
      existingItem.totalPrice += existingItem.price || existingItem.defaultPrice;
    },

    decrementFromCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem.qty > 1) {
        existingItem.qty--;
        existingItem.totalPrice -= existingItem.price;
      }
    },

    removeFromCart(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
      state.totalQty--;
    },

    getTotal: (state) => {
      let amt = 0;

      state.items.forEach((item) => {
        amt += (item.price / 100) || item.defaultPrice / 100;
      });

      state.bill = Math.ceil(amt);
    },
  },
});

export const {
  addItem,
  removeFromCart,
  incrementQuantity,
  decrementFromCart,
  clearAll,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
