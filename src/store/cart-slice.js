import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemsQuantity: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action){
      const addedItem = action.payload;
      const existingItem = state.items.find(item => item.id === addedItem.id);
      if (!existingItem) {
        state.items.push({
          id: addedItem.id,
          price: addedItem.price,
          quantity: addedItem.quantity,
          totalPrice: addedItem.price,
          title: addedItem.title
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action){
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else if (existingItem && existingItem.quantity === 1){
        state.items = state.items.filter(item => item.id !== id);
      }
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;