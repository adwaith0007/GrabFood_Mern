import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
import { userAPI } from './api/userAPI';
import { userReducer } from './reducer/useReducer';
import { productAPI } from './api/productAPI';

export const server = import.meta.env.VITE_SERVER;

const store = configureStore({
  reducer: {
    // user: userReducer,
    [userAPI.reducerPath]:userAPI.reducer,
    [userReducer.name]: productAPI.reducer,
    [productAPI.reducerPath]:userAPI.reducer,
    // Add other reducers if needed
  },
  middleware:(mid) =>[...mid() , userAPI.middleware,productAPI.middleware],
});

export default store;