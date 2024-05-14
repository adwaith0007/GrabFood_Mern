import axios from 'axios';


const instance = axios.create({
  
  // baseURL: 'https://www.grabfood.life/api'
  baseURL: 'http://localhost:5000/api', 
  // withCredentials:true,
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

// instance.interceptors.response.use(
//   response => {
    

//     return response;
//   },
//   error => {

//     console.log('Error response:', error.response);

//     if (error.response &&  error.response.data.message === 'User is blocked.') {
//       // Display toast message for blocked user
//       toast.error('Your account is blocked. Please contact support for assistance.dfgdfg');
      
//       // Cookie.remove("token");

//       // dispatch(userNotExist());

//       // navigate("/login");

      
//     }
//     return Promise.reject(error);
//   }
// );


export default instance;