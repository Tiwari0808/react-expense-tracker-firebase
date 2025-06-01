import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children})=>{
    const storedToken = localStorage.getItem('token');
    const [token,setToken]  = useState(storedToken || null);
    const isLoggedIn = !!token;
    const login = (id)=>{
       setToken(id);
       localStorage.setItem('token',token);
    }
    const logout = ()=>{
        setToken(null);
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={{token,isLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;