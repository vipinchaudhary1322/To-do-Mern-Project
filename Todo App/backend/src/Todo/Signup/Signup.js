import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import './Signup.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Signup = () => {
   const Navigate = useNavigate()
   const [input ,setinput] = useState({username : "",password:"",confirmpassword:""})
   const loginhandler = ()=>{
     Navigate("/login")
   }
   const sumbithandler =(e)=>{
      e.preventDefault()
      if(input.password===input.confirmpassword){
        axios({
            url : "http://localhost:5003/user/signup",
            method : "POST",
            headers : {},
            data : input
        }).then((data)=>{
            Navigate("/login")
        }).catch((err)=>{
            setinput({username : "",password:"",confirmpassword:""})
            alert("Username Exist")
        })
      }else{
        alert("Passwords and Confirm Password Are not Matched")
      }
   }
    return (
        <div className='register'>
            <div className='login-content'>
                <div className='login-profile'>
                    <EditIcon sx={{ color: "white", "fontSize": "33px" }} />
                </div>
                <div className='login-head'>
                    <span>Register</span>
                </div>
                <div className='login-form'>
                    <form onSubmit={(e)=>sumbithandler(e)}>
                        <input type='text' placeholder='Username' value={input.username} onChange={(e)=>setinput({...input,username: e.target.value})} />
                        <input type='password' placeholder='password' value={input.password} onChange={(e)=>setinput({...input,password: e.target.value})} />
                        <input type='password' placeholder='Confirm password' value={input.confirmpassword} onChange={(e)=>setinput({...input,confirmpassword: e.target.value})}/>
                        <button type='submit'>REGISTER</button>
                    </form>
                </div>
                    <div className='forgot-pass' onClick={()=>loginhandler()}>
                         Member login
                    </div>
            </div>
        </div>
    )
}

export default Signup
