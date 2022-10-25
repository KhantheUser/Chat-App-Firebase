import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [currentUser,setCurrentUser]= useState({})

    useEffect(()=>{
       const ubsub= onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            console.log(currentUser);
        })
        return ()=>{
            ubsub()
        }
    },[])
    
    return (
        <AuthContext.Provider value={{currentUser,setCurrentUser}}>

            {children}
        </AuthContext.Provider>
    )
}