import React, { useState } from 'react'
import '../style.scss'
import Add from '../img/addAvatar.png'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebase/config'
function Login() {
  const navigate = useNavigate()
  const [err,setErr] = useState(false)
  const handleSubmit = async(e)=>{
    e.preventDefault()
   
    const email = e.target[0].value
    const password = e.target[1].value
    
   
  try{
    await signInWithEmailAndPassword(auth,email,password)
    navigate('/')
  }catch(e){
    setErr(true)
  }
  
  }
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
          <span className="logo">Thien Duc</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter your email'  />
            <input type="password" placeholder='Enter your password'/>
            <button>Sign in</button>
            {err && <span>Something went wrong</span>}

          </form>
          <p>Don't you have an account ? <Link to='/register'>Register</Link></p>
        </div>
    </div>
    
  )
}

export default Login