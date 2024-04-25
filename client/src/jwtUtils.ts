// import {jwtDecode} from 'jwt-decode';
import  {jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';

const setToken = (token) => {
  // Set token in a secure HTTP-only cookie
  Cookie.set('token', token, { sameSite: true });
};

const getToken = () => {
  return Cookie.get('token');
};

const removeToken = () => {
  Cookie.remove('token');
};

const getUserIdFromToken = () => {
  const token = getToken();
  if (token) {
    // const decoded = jwtDecode(token);
    const decoded:any = jwtDecode(token); 
    
    return decoded.userId;
  }
  return null;
};

export { setToken, getToken, removeToken, getUserIdFromToken };