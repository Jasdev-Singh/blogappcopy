//import axios from 'axios'
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {

const [inputs,setInputs] =useState({
    username: "",
    password:"",
  })

  //handle error if user exist
  const [err,setError] = useState(null)

  //user react dom navigator to navigate to another page
  const navigate = useNavigate()

  //usecontext
  const {login}= useContext(AuthContext);
 

  //handle the change in values
 const handlechange = e =>{
  setInputs(prev => ({...prev,[e.target.name] : e.target.value}))
 }

 //handle submit of form
 const handlesubmit = async e =>{
  e.preventDefault();
 
  try {
 await login(inputs)
  //await axios.post(`${backendurl}/api/auth/login`,inputs)
  //navigate to login page
  navigate("/home");

  }
  catch(err)
  {
    console.log(err)
    setError(err.response.data);
  }
 }
 
 console.log(inputs)
 //create html code


  return (
    <div className='auth'>
    <h1>Login</h1>
    <form>
      <input type="text" placeholder='username' name='username' onChange={handlechange}/>
      <input type="password" placeholder='password' name='password' onChange={handlechange}/>
      <button onClick={handlesubmit}> Login</button>
     {err &&<p>{err}</p>}
      <span>Don't you have an account? <Link to="/register">Register</Link></span>
    </form>


    </div>
  )
}

export default Login
