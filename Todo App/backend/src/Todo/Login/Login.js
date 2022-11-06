import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
const Login = () => {
  const [input ,setinput] = useState({username : "",password:""})
  const Navigate = useNavigate()
  const sumbithandler =(e)=>{
    e.preventDefault()
      axios({
          url : "http://localhost:5003/user/login",
          method : "POST",
          headers : {},
          data : input
      }).then((data)=>{
        localStorage.setItem("authtoken",data.data.authtoken)
          localStorage.setItem("user",input.username)
          Navigate("/todolist")
      }).catch((err)=>{
          setinput({username : "",password:""})
          alert("Username And Password Does't Match")
      })
 }
  return (
    <div className='login'>
      <div className='login-content'>
        <div className='login-profile'>
            <PersonRoundedIcon sx={{ color: "white" ,"fontSize":"33px"}}/>
        </div>
        <div className='login-head'>
        <span>Member Login</span>
        </div>
        <div className='login-form'>
           <form onSubmit={(e)=>sumbithandler(e)}>
            <input type='text' placeholder='Username' value={input.username} onChange={(e)=>setinput({...input,username: e.target.value})}/>
            <input type='password' placeholder='password' value={input.password} onChange={(e)=>setinput({...input,password: e.target.value})}/>
            <button type='submit'>LOGIN</button>
           </form>
        </div>        
        <div className='forgot-pass'>
           Forgot Password ?
        </div>        
      </div>
    </div>
  )
}

export default Login
