import axios from "axios";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const api_key = import.meta.env.VITE_FIREBASE_API_KEY;

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
       `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api_key}`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
      
      toast.success("Verification email sent.Please check your inbox.");
    } catch (error) {
      const errMsg =
        error?.response?.data?.error?.message ||
        error.message ||
        "Something went wrong!";
      alert(`Error: ${errMsg}`);
    }
  };

  return (
    <AuthContext.Provider value={{ verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
