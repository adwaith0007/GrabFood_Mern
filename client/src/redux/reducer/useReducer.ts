// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { UserReducerInitialState } from "../../types/reducer-types";
// import { User } from "../../types/types";

// const initialState: UserReducerInitialState = {
//     user: null,
//     loading:true,
//     registeredUsername: null,
// };

// export const userReducer = createSlice({
//     name:"userReducer",
//     initialState,
//     reducers:{
//         userExist:(state,action:PayloadAction<User>)=>{
//             state.loading = false;
//             state.user=action.payload;

//         },
//         userNotExist:(state)=>{
//             state.loading = false;
//             state.user=null;
//         },

//         registerUserStore: (state, action: PayloadAction<User>) => {
//             state.loading = false;
//             state.registeredUsername = action.payload;
//         },
//     },

// });

// export const {userExist, userNotExist, registerUserStore } = userReducer.actions



import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";

// Define the initial state
const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
  registeredUsername: null,
};

// Create the userReducer slice
export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false
      console.log("redux",action.payload)
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },

    startLoading: (state) => {
      state.loading = true;
    },

    registerUserStore: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.registeredUsername = action.payload;
    },
    updateUserPhoto: (state, action: PayloadAction<string>) => {
      if (state.user) {
        console.log("redux",state.user.photo)
        state.user.photo = action.payload;
      }
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    updateUserRole: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    updateUserGender: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.gender = action.payload;
      }
    },
    updateUserToken: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.token = action.payload;
      }
    },
  },
});

// Export the actions
export const {
  userExist,
  userNotExist,
  startLoading,
  registerUserStore,
  updateUserPhoto,
  updateUserEmail,
  updateUserName,
  updateUserRole,
  updateUserGender,
  updateUserToken,
} = userReducer.actions;

// Export the reducer
export default userReducer.reducer;
