import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
import { userAPI } from './api/userAPI';

export const server = import.meta.env.VITE_SERVER;

const store = configureStore({
  reducer: {
    // user: userReducer,
    [userAPI.reducerPath]:userAPI.reducer
    // Add other reducers if needed
  },
  middleware:(mid) =>[...mid() , userAPI.middleware],
});

export default store;