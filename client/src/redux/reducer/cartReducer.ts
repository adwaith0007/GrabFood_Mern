// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart(state, action) {
//       const { name } = action.payload;
//       const existingItem = state.items.find(item => item.name === name);

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ name, quantity: 1 });
//       }
//     },
//   },
// });

// export const { addItemToCart } = cartSlice.actions;

// export default cartSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// // Initial state for the cart
// const initialState = {
//   items: [],
// };

// // Create a slice of the store
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     // Reducer to handle adding items to the cart
//     addItemToCart(state, action) {
//       const { name } = action.payload;
//       const existingItem = state.items.find(item => item.name === name);

//       if (existingItem) {
//         // If item exists, increment the quantity
//         existingItem.quantity += 1;
//       } else {
//         // If item does not exist, add it to the cart with quantity 1
//         state.items.push({ name, quantity: 1 });
//       }
//     },

//     // Example of additional reducer for removing items from the cart
//     removeItemFromCart(state, action) {
//       const { name } = action.payload;
//       const index = state.items.findIndex(item => item.name === name);

//       if (index !== -1) {
//         state.items.splice(index, 1); // Remove the item from the array
//       }
//     },
//   },
// });

// // Export actions to be used in components
// export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

// // Export the reducer to be used in the store
// export default cartSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { productId, name, price, imageUrl, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        state.items.push({ productId, name, price, imageUrl, quantity });
      }
    },
    removeItemFromCart(state, action) {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;