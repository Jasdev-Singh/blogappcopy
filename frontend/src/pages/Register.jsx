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
   const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity(); // Show HTML5 validation errors
    return;
  }
 
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
<div className="background">
        <div className="contentforregisterpage">
            <div className="form-container">
                <h2>Register Yourself</h2>
                <form onSubmit={handlesubmit}>
                    <label htmlFor="username" className='loginwelcometext'>Username</label> 
                    <input type="text" id="username" name="username"  onChange={handlechange} required/>

                    <label htmlFor="email" className='loginwelcometext'>Email</label>
                    <input type="email" id="email" name="email" onChange={handlechange} required />

                    <label htmlFor="password" className='loginwelcometext'>Password</label>
                    <input type="password" id="password" name="password" onChange={handlechange} required />

                    <button   type='submit'> Register</button>
  
                </form>
                
                <div className="login-link">
                    <span className='loginwelcometext'>Already have an account? <Link to="/">Login</Link></span>
                </div>
            </div>
        </div>
    </div>
   )
}

export default Register
