import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { backendurl } from '../context/authContext'

const Register = () => {

  const [inputs,setInputs] =useState({
    username: "",
    email:"",
    password:"",
  })

  //handle error if user exist
  const [err,setError] = useState(null)

  //user react dom navigator to navigate to another page
  const navigate = useNavigate()

  //handle the change in values
 const handlechange = e =>{
  setInputs(prev => ({...prev,[e.target.name] : e.target.value}))
 }

 //handle submit of form
 const handlesubmit = async e =>{
  e.preventDefault();
 
  try {
 
  await axios.post(`${backendurl}/api/auth/register`,inputs)
  //navigate to login page
  navigate("/");

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
     <h1>Register Here</h1>
     <form>
       <input required type="text" placeholder='username' name='username' onChange={handlechange}/>
       <input required type="email" placeholder='email address' name='email' onChange={handlechange}/>
       <input required type="password" placeholder='password' name='password' onChange={handlechange}/>
       <button onClick={handlesubmit}> Register</button>
    
       {err && <p>{err}</p>}
       <span>Do you have an account? <Link to="/">Login</Link></span>
     </form>
 
 
     </div>
   )
}

export default Register