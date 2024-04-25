import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://13.232.169.249/api', 
  // baseURL: 'http://localhost:5000/api', 
//   timeout: 5000, 
//   headers: {
//     'Content-Type': 'application/json',
    
//   },
});

export default instance;