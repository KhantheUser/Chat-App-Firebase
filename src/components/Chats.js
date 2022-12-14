import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase/config';

function Chats() {
  const [chats,setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
  useEffect(()=>{
   const getChat = ()=>{
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data())

  });
  return ()=>{
    unsub()
  }
   }
 
  currentUser.uid && getChat()
  },[currentUser.uid])
  // console.log(Object.entries(chats));
  const handleSelect = (payload)=>{
    dispatch({
      type :"CHANGE_USER",
      payload
    })
  }
  console.log(Object.entries(chats));
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].dates).map((chat)=>{

      return (
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      )
      })}
      
    </div>
  )
}

export default Chats