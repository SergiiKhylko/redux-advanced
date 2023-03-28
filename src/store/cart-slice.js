import {createSlice} from "@reduxjs/toolkit";
import {mainActions} from "./main-slice";

const initialState = {
  items: [],
  itemsQuantity: 0,
  totalPrice: 0,
  isCartChanged: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
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
      state.isCartChanged = true;
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
      state.isCartChanged = true;
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
      state.totalPrice = action.payload.totalPrice;
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

    const sendDataHttpRequest = async () => {
      const endpoint = "https://redux-advanced-practice-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify({
          items: cartData.items,
          itemsQuantity: cartData.itemsQuantity,
          totalPrice: cartData.totalPrice
        })
      }).catch(e => {
        throw new Error("Error during sending Cart data");
      });

      if (!response.ok) {
        throw new Error("Error during sending Cart data");
      }
    }

    try {
      await sendDataHttpRequest();

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

export const getCartData = () => {
  return async dispatch => {
    dispatch(mainActions.showStatusMessage({
      status: "pending",
      title: "Getting data",
      message: "Getting Cart data from the server..."
    }));

    const getDataHttpRequest = async () => {
      const endpoint = "https://redux-advanced-practice-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(endpoint).catch(e => {
        throw new Error("Error during getting Cart data");
      });

      if (!response.ok) {
        throw new Error("Error during getting Cart data");
      }
      return await response.json();
    }

    try {
      const cartData = await getDataHttpRequest();

      dispatch(cartActions.updateCart({
        items: cartData.items || [],
        itemsQuantity: cartData.itemsQuantity,
        totalPrice: cartData.totalPrice
      }));

      dispatch(mainActions.showStatusMessage({
        status: "success",
        title: "Getting data is successful",
        message: "Cart data has been successfully got from the server"
      }));

    } catch (e) {
      dispatch(mainActions.showStatusMessage({
        status: "error",
        title: e.message,
        message: e.message
      }));
    }
  }
}

export const cartActions = cartSlice.actions;
export default cartSlice;
