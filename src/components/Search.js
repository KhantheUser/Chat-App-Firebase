import React, { useCallback, useContext, useRef, useState } from 'react'
import {db} from '../firebase/config'
import {collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where} from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext'


function Search() {
  const [username,setUsername] = useState()
  const [user,setUser] = useState(null)
  const [err,setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser);
  let timeRef = useRef('timeRef')
  const collectionRef = collection(db,'users')
 const handleSearch = (e)=>{
    
    setUsername(e.target.value)
   

 }
 const handleKeyDown = async(e)=>{
  if(e.code==="Enter"){
    const q= query(collectionRef,where("displayName","==",username))
    try{
      const querySnapshot = await getDocs(q)
  
    querySnapshot.forEach((doc)=>{
        setUser(doc.data())
    })
    }catch(e){
      setErr(true)
    }
  }
 }
 const handleSelect = async()=>{
  
    const combinedId =  currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try{
    const res = await getDoc(doc(db,'chats',combinedId))
    console.log(res);
      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db,'userChats',currentUser.uid),{
          [combinedId+'.userInfo'] :{
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL
          },
          [combinedId+'.date']:serverTimestamp()
        })
        await updateDoc(doc(db,'userChats',user.uid),{
          [combinedId+'.userInfo'] :{
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          },
          [combinedId+'.date']:serverTimestamp()
        })
      }
    }catch(e){
      setErr(true)
     
    }
    setUser(null)
    setUsername("")
 }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" onKeyDown={handleKeyDown} onChange={handleSearch} value={username} placeholder="Find a user"/>
      </div>
      {err && <span>Something went wrong</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search