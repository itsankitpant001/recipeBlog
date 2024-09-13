/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'


function Auth() {
  return (
    <div>
    <Login/>
    <Register/>
    </div>
  )
}
export default Auth

const Login=()=>{
  let [username,setusername]=useState()
  let[password,setpassword]=useState()
  let [,setcookie] =useCookies(["access_token"])
  const navigate=useNavigate()

  const onsubmit=async (e)=>{

    e.preventDefault()
    try {
      const response=await axios.post("http://localhost:3001/auth/login",{
        username,password
      })
     setcookie("access_token",response.data.token)
     window.localStorage.setItem("userid",response.data.id)
     navigate("/")

    } catch (error) {
      console.error(error)
    }
  }


  
  return(
  <Form username={username}
    setusername={setusername}
    password={password}
    setpassword={setpassword}
    label="Login"
    onsubmit={onsubmit}
    />)
}
const Register=()=>{
  let [username,setusername]=useState()
  let[password,setpassword]=useState()
  
  const onsubmit=async (e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/auth/register",{
        username,password
      })
      alert('registration complete')
      
    } catch (error) {
      console.error(error)
      
    }
  }


  return(<Form username={username}
    setusername={setusername}
    password={password}
    setpassword={setpassword}
    label="Register"
    onsubmit={onsubmit}
    />)
}

const Form =({username,setusername,password,setpassword,label,onsubmit})=>{
  return (<>
    <div className="auth-container">
      <form onSubmit={onsubmit} >
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e)=>setusername(e.target.value)} /> 
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)} /> 
          <div><button type="submit" >{label}</button></div>
        </div>
      </form>
    </div>
    </>)
}