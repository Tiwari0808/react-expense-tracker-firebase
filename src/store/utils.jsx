import { jwtDecode } from "jwt-decode";


export const isTokenValid = () => {
  const expiration = localStorage.getItem("tokenExpiration");
  if (!expiration) return false;
  return Date.now() < parseInt(expiration);
};

export const getuserIdFromToken = (token)=>{
  try {
    const decode = jwtDecode(token);
    return decode.user_id;
  } catch (error) {
    return null;
  }
}

const validateTokenFromFirebaase = ()=>{
  
}

