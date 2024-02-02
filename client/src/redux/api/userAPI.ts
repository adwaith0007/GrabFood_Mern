import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  AllUsersResponse,
  DeleteUserRequest,
  MessageResponse,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";
import { server } from "../store";



import { User } from "../../types/types";


export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/user/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const getUser = async (id: string) => {
 try {
  
  const { data }: { data: UserResponse } = await axios.get(
    `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
  );

  return data;

 } catch (error) {
  if (axios.isAxiosError(error)) {
    // Handle specific axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something went wrong while setting up the request
      console.error('Error setting up the request:', error.message);
    }
  } else {
    // Handle other types of errors
    console.error('An unexpected error occurred:', error.message);
  }

  // Rethrow the error if needed or handle it according to your application's logic
  throw error; 
 }
};




export const { useLoginMutation } = userAPI;
