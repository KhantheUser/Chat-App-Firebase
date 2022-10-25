import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/config";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext()
export const ChatProvider = ({children})=>{
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId :'null',
        user : {}
    }
    const chatReducer = (state,action)=>{
        console.log('reducer')
        switch(action.type){
            case "CHANGE_USER": {
                
                const newState ={...state}
                newState.chatId =  currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                newState.user = action.payload
                return newState
            }
               
            default : return state
        }
        
    }
    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE)
    return (
        <ChatContext.Provider value={{data:state,dispatch}}>

            {children}
        </ChatContext.Provider>
    )
}