import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children})=>{
    const [token,setToken]  = useState(null);
    const isLoggedIn = !!token;
    const login = (id)=>{
       setToken(id)
    }
    const logout = ()=>{
        setToken(null)
    }
    return (
        <AuthContext.Provider value={{token,isLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;