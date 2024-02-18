import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";



const initialState: UserReducerInitialState = {
    user: null,
    loading:true,
    registeredUsername: null,
};

export const userReducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExist:(state,action:PayloadAction<User>)=>{
            state.loading = false;
            state.user=action.payload;
        },
        userNotExist:(state)=>{
            state.loading = false;
            state.user=null;
        },

        registerUserStore: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.registeredUsername = action.payload;
        },
    },

});

export const {userExist, userNotExist, registerUserStore } = userReducer.actions