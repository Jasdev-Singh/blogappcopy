import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { backendurl } from '../context/authContext';
const Menu = ({cat}) => {
   const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchdata = async () =>{
      try{
        const res = await axios.get(`${backendurl}/api/posts/?cat=${cat}`)
        console.log(res.data)
        setPosts(res.data);
      }catch(err)
      {
        console.log(err)
      }
    };
    fetchdata();

  },[cat]); 

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className='post' key={post.id}>
            <img src={`../upload/${post.img}`} alt="" />
            <h2>{post.title}</h2>
            <Link className='link' to={`/post/${post.id}`}>
            <button>Read More</button></Link>

            </div>
        ))}
        
    </div>
  )
}

export default Menu
