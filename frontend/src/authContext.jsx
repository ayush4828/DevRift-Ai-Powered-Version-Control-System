import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
   const [currentUser , setcurrentUser] = useState(null);

   useEffect(()=>{
     const userId = localStorage.getItem('userId');
     if(userId){
      setcurrentUser(userId);
         
     }
   },[]);

   return(
    <AuthContext.Provider value={{currentUser,setcurrentUser}}>
    {children}
   </AuthContext.Provider>
   )
   
}