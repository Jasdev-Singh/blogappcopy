import React, { useContext } from 'react'
import Logo from "../img/bloglogo.png"
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext,logoutuser } from '../context/authContext';

const Navbar = () => {
//use context we create for user
  const {setCurrentuser,currentuser}= useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout=()=>{
    logoutuser();
    setCurrentuser(null);
    //navigate("/login");
  }



  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
        <Link to="/home">
          <img src={Logo} alt=""/>
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/home/?cat=art'><h6>ART</h6></Link>
          <Link className='link' to='/home/?cat=science'><h6>SCIENCE</h6></Link>
          <Link className='link' to='/home/?cat=technology'><h6>TECHNOLOGY</h6></Link>
          <Link className='link' to='/home/?cat=cinema'><h6>CINEMA</h6></Link>
          <Link className='link' to='/home/?cat=food'><h6>FOOD</h6></Link>
          <Link className='link' to='/home/?cat=design'><h6>DESIGN</h6></Link>
          
          <span>{currentuser?.username}</span>
          {currentuser? (<span onClick={handlelogout}>Logout</span>) : (<Link className='link' to="/">Login </Link>)}
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}


export default Navbar