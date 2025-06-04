import axios from "axios";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCakUs_qV484dbihixd259CT1ao8wOIIh4",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
      alert("Verification email sent.Please check your inbox.");
    } catch (error) {
      const errMsg =
        error?.response?.data?.error?.message ||
        error.message ||
        "Something went wrong!";
      alert(`Error: ${errMsg}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
