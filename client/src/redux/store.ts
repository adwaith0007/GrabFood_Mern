// import { configureStore } from '@reduxjs/toolkit';
// // import userReducer from './userSlice';
// import { userAPI } from './api/userAPI';
// import { userReducer } from './reducer/useReducer';
// import { productAPI } from './api/productAPI';

// export const server = import.meta.env.VITE_SERVER;

// const store = configureStore({
//   reducer: {
//     // user: userReducer,
//     [userAPI.reducerPath]:userAPI.reducer,
//     [userReducer.name]: productAPI.reducer,
//     [productAPI.reducerPath]:userAPI.reducer,
//     // Add other reducers if needed
//   },
//   middleware:(mid) =>[...mid() , userAPI.middleware,productAPI.middleware],
// });

// export default store;



import { configureStore } from "@reduxjs/toolkit";
// import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "../redux/reducer/useReducer"
// import { cartReducer } from "./reducer/cartReducer";
// import { orderApi } from "./api/orderAPI";
// import { dashboardApi } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    // [productAPI.reducerPath]: productAPI.reducer,
    // [orderApi.reducerPath]: orderApi.reducer,
    // [dashboardApi.reducerPath]: dashboardApi.reducer,
    // [cartReducer.name]: cartReducer.reducer,
  },

  // 👇 if redux is not working uncomment 

  // middleware: (mid) => [
  //   ...mid(),
  //   userAPI.middleware,
  //   // productAPI.middleware,
  //   // orderApi.middleware,
  //   // dashboardApi.middleware,
  // ],
});

export type RootState = ReturnType<typeof store.getState>;