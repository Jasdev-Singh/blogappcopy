import React from 'react'
import Logo from "../img/blogmainlogo_white.png"
import fb from "../img/fblogo.png"
import gmail from "../img/gmaillogo.png"
import linkedin from "../img/linkedinlogo.png"

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt=""/>
      <div  className="footerdata">
      <div id="gettouch">GET IN TOUCH</div>
      <div className="logoimg">
    <a href="mailto:webdev7302@gmail.com" target="_blank" rel="noreferrer" >
          <img className="footerlogo" src={gmail} alt="" id="gmail" />
        </a>
        <a href="https://www.linkedin.com/in/jasdev-singh-065787247/?originalSubdomain=in" target="_blank" rel="noreferrer">
            <img className="footerlogo" src={linkedin} alt=""  id="linkedin"/>
        </a> 
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
           <img className="footerlogo" src={fb} alt="" id="fb"/>
        </a>
      </div>
    </div>
    </footer>
  )
}

export default Footer
