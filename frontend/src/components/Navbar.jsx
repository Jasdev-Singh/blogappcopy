import React, { useContext, useState } from 'react'
import Logo from "../img/blogmainlogo.png"
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext,logoutuser } from '../context/authContext';
import userlogo from "../img/userlogo.png"
import homelogo from "../img/homelogo.png";
const Navbar = () => {
//use context we create for user
  const {setCurrentuser,currentuser}= useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout=()=>{
    logoutuser();
    setCurrentuser(null);
    //navigate("/login");
    navigate("/")
  }

 //const cuserid = currentuser?.id;
const [activeCat, setActiveCat] = useState('');
const activeStyle = {
  color: '#007bff',
 
};

const inactiveStyle = {
  color: 'black',

};

const refreshpage = ()=>{
 
   navigate("/home")
     window.location.reload();

}


  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo' >
        <Link className='logohome' >
        <div className="navbarhomelogo" onClick={refreshpage} > <img className='homelogo' src={homelogo} alt=''/></div>
         <div > <img className='mainlogo' src={Logo} onClick={refreshpage} alt=""/></div>
          </Link>
        </div>
        <div className='links'>
          <Link className='link' id="navlink" to='/home/?cat=art'  >
              <h6 onClick={() => setActiveCat("art")} style={activeCat === "art" ? activeStyle : inactiveStyle}>ART </h6>
          </Link>
          <Link className='link' id="navlink"  to='/home/?cat=science' >
            <span className='navseparator'>|</span>  <h6  onClick={() => setActiveCat("science")} style={activeCat === "science" ? activeStyle : inactiveStyle}>SCIENCE </h6>
          </Link>
          <Link className='link' id="navlink" to='/home/?cat=technology'  >
             <span className='navseparator'>|</span>   <h6 onClick={() => setActiveCat("technology")} style={activeCat === "technology" ? activeStyle : inactiveStyle}>TECHNOLOGY</h6>
          </Link>
          <Link className='link' id="navlink" to='/home/?cat=cinema' >
            <span className='navseparator'>|</span>    <h6  onClick={() => setActiveCat("cinema")} style={activeCat === "cinema" ? activeStyle : inactiveStyle}>CINEMA</h6>
          </Link>
          <Link className='link' id="navlink" to='/home/?cat=food'  >
             <span className='navseparator'>|</span>   <h6 onClick={() => setActiveCat("food")} style={activeCat === "food" ? activeStyle : inactiveStyle}>FOOD</h6>
          </Link>
          <Link className='link'  id="navlink" to='/home/?cat=design'  >
            <span className='navseparator'>|</span>    <h6 className='lasth6' onClick={() => setActiveCat("design")} style={activeCat === "design" ? activeStyle : inactiveStyle}>DESIGN</h6>
          </Link>
          </div>
          <div className='links' >
        
          <div className="navbaruserdata"> <img className='userlogo' src={userlogo} alt=''/>{currentuser?.username}</div>
          <button id="logoutbtn" className="logout-button" onClick={handlelogout}>Logout</button>
      
          <span className='write'>
          <Link className='link' to="/write">
          <button className='writebutton'> Write Blog</button> </Link>
          </span>
        </div>
      </div>
    </div>
  )
}


export default Navbar
