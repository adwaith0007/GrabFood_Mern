import {configureStore} from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";

import {createStore} from "redux"

export const server = import.meta.env.VITE_SERVER

// export const useAuthStore = cerate((set)=>({
//     auth: {
//         username:'',
//         active:false
//     },
//     setUsername: (name) => set((state)=>({auth:{...state.auth,username:name}}))
// }))

export const store = configureStore({
    reducer:{

        [userAPI.reducerPath] :userAPI.reducer
        
    },
    middleware: (mid) => [...mid(), userAPI.middleware]
})