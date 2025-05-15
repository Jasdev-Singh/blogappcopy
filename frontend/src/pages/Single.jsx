import React, { useContext, useEffect, useState } from 'react'
import Edit from "../img/iconedit.png"
import Delete from "../img/delete.png"
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Menu from "../components/Menu"
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import moment from 'moment'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { backendurl } from '../context/authContext'

const Single = () => {
 const [post,setPost] = useState({});  //empty object

  const location = useLocation()
  const navigate = useNavigate()
  //get only id
  const postid = location.pathname.split("/")[2]; //2nd item in array is id

  const {currentuser} = useContext(AuthContext)
  useEffect(()=>{
    const fetchdata = async () =>{
      try{
        const res = await axios.get(`${backendurl}api/posts/${postid}`);
        setPost(res.data);
       console.log(res);
      }catch(err)
      {
        console.log(err)
      }
    };
    fetchdata();

  },[postid]); 

  //delete post
  const handledelete = async()=>{
    try{

      const res = await axios.delete(`${backendurl}/api/posts/${postid}`)
      console.log(res);

      navigate("/home")
     
    }catch(err)
    {
      console.log(err)
    }
  }
  //html code

  return (
    <>
    <Navbar/>
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt=""/>
      <div className='user'>
         {post.userimg && <img src={post?.userimg} alt=""/> }
      <div className='info'>
      <span>{post?.username}</span>
      <p>Posted {moment(post.date).fromNow()}</p>
      </div>
       {currentuser && currentuser.username === post.username &&
      <div className="edit">
      <Link to={`/write?edit=2`} state={post}>
        <img src={Edit} alt="" />
      </Link>
        <img onClick= {handledelete} src={Delete} alt="" />
      </div> }
      </div>

      <h1>{post.title} </h1>
      {post.desc}
      </div> 
      <Menu cat={post.cat}/>
    </div>
    <Footer/>
    </>
  )
}

export default Single
