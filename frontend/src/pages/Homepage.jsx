import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { backendurl } from '../context/authContext';


const Homepage = () => {

  
  const [posts,setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(()=>{
    const fetchdata = async () =>{
      try{
        const res = await axios.get(`${backendurl}/api/posts${cat}`)
        setPosts(res.data);
      }catch(err)
      {
        console.log(err)
      }
    };
    fetchdata();

  },[cat]);  //whenever we change cat it will call this useeffect

 
const getText = (html) =>{
  const doc = new DOMParser().parseFromString(html,"text/html")
  return doc.body.textContent


}
  return (
    <>
      <Navbar/>
  
    <div className='home'>
    <div className='posts'>
      {posts.map(post=>(
          <div className='post' key={post.id}>
            <div className="img"> 
            <img src= {`../upload/${post.img}`} alt="You have not uploaded any image yet" /> 
            </div>
            <div className="content"> 
            <Link className='link' to={`/post/${post.id}`}>
              <h1><i>{post.title}</i></h1>
              <p>  {getText(post.desc.slice(0,400))}...</p>
              <button>Read More</button>
            </Link>
            </div>
          
          </div>
      ))
      }
    </div>
    </div>
      <Footer/>
      </>
  )
}

export default Homepage
