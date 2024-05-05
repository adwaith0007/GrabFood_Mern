import axios from 'axios';
import toast from "react-hot-toast";

const instance = axios.create({
  // baseURL: 'http://13.232.169.249/api', 
  // baseURL: 'http://35.154.131.245/api', 
  // baseURL: 'https://www.grabfood.life/api'
  // withCredentials:true,
  baseURL: 'http://localhost:5000/api', 
//   timeout: 5000, 
//   headers: {
//     'Content-Type': 'application/json',
    
//   },
});

instance.interceptors.request.use(
  config => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    console.log('Error response:', error.response);

    if (error.response &&  error.response.data.message === 'User is blocked.') {
      // Display toast message for blocked user
      toast.error('Your account is blocked. Please contact support for assistance.');
    }
    return Promise.reject(error);
  }
);


export default instance;