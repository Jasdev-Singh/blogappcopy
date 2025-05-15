import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const AuthContext  = createContext()
export const backendurl =  "http://localhost:8800"; 

export const AuthContextProvider = ({children}) =>{
    const [currentuser,setCurrentuser] = useState(JSON.parse(localStorage.getItem("user")) || null)

     

   
    const login = async(inputs) =>{
        const res =  await axios.post(`${backendurl}/api/auth/`,inputs);
        setCurrentuser(res.data)
    };

  
    const logout = async(inputs) => {
        await axios.post(`${backendurl}/api/auth/logout`);  
        setCurrentuser(null);
        localStorage.removeItem("user");
    };
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentuser));
    },[currentuser]);
    
    return (
        <AuthContext.Provider value={{currentuser,login,logout,setCurrentuser}}> {children}</AuthContext.Provider>
    )
};

  export const logoutuser = () =>{
        localStorage.removeItem("user");
    };