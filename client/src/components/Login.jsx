import React from 'react'
import { useState } from 'react'
import { API_END_POINT } from '../utils/constant'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [isLogin,setIsLogin]=useState(false)
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const navigate= useNavigate()
  
  const loginHandler= ()=>{
    setIsLogin(!isLogin)
  }

  const getInputData= async (e)=>{
    e.preventDefault();
    if(isLogin){
      const user= {username,password};
      try {
        const res= await axios.post(`${API_END_POINT}/login`,user)
        console.log(res)
        if(res.data.success){
          navigate("/chat")
        }
        
      } catch (error) {
        
        console.log(error);
        
        
      }
      
    }else{
      const user={username,email,password}
    console.log(username,email,password);

    try {
      const res= await axios.post(`${API_END_POINT}/register`,user)
      console.log(res);
      
    } catch (error) {

      console.log(error);
      
    }
    setEmail("")
    setUserName("")
    setPassword("")
    
    }
    
    
  }
  return (
    <div>
      <div className='absolute'><img src="https://wallpapercave.com/wp/wp9764008.jpg" alt="login page" />
      </div>
      <form onSubmit={getInputData} className=' flex flex-col w-3/12 p-12 my-36 left-0 right-0 mx-auto  items-center justify-center absolute bg-black opacity-85 '>
      <h1 className='text-white text-3xl mb-5 font-bold' >{isLogin ?"Login":"Signup"}</h1>
          <div>
            {
              !isLogin &&
           
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email' className='outline-none p-3 my-2 rounded-md bg-gray-800 text-white'/>
            }
             <input value={username} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='username' className='outline-none p-3 my-2 rounded-md bg-gray-800 text-white'/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' className='outline-none p-3 my-2 rounded-md bg-gray-800 text-white' />
            <button className='bg-blue-600 mt-6 p-3 text-white rounded-sm font-medium ' >{isLogin? "Login":"Signup"}</button>
            <p className='text-white mt-2'> {isLogin ? "New to BuddyBuzz? " : "Already have an account?"}<span className='ml-1 text-blue-900 font-medium cursor-pointer' onClick={loginHandler}>{isLogin ? "Signup" : "Login"}</span></p>
          </div>
      </form>
    </div>
  )
}

export default Login
