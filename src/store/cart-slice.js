import {createSlice} from "@reduxjs/toolkit";
import {mainActions} from "./main-slice";

const initialState = {
  items: [],
  itemsQuantity: 0,
  totalPrice: 0
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
          quantity: 1,
          totalPrice: addedItem.price,
          title: addedItem.title
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
      state.itemsQuantity++;
      state.totalPrice += addedItem.price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      }
      state.itemsQuantity--;
      state.totalPrice -= existingItem.price;
    }
  }
});

export const sendCartData = cartData => {

  return async dispatcher => {
    dispatcher(mainActions.showStatusMessage({
      status: "pending",
      title: "Sending data",
      message: "Cart data is sending to the server..."
    }));

    const sendHttpRequest = async () => {
      const endpoint = "https://redux-advanced-practice-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(cartData)
      }).catch(e => {
        throw new Error("Error during sending Cart data");
      });

      if (!response.ok) {
        throw new Error("Error during sending Cart data");
      }
    }

    try {
      await sendHttpRequest();

      dispatcher(mainActions.showStatusMessage({
        status: "success",
        title: "Sending data is successful",
        message: "Cart data has been successfully sent to the server"
      }));

    } catch (e) {
      dispatcher(mainActions.showStatusMessage({
        status: "error",
        title: e.message,
        message: e.message
      }))
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;