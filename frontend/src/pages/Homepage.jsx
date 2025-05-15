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

  /*
const posts =[
{
  id:1,
  title: "Lorem ibpum there is a sample data we eill store ",
  desc: "Lorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill store",
  img:"https://images.pexels.com/photos/6348018/pexels-photo-6348018.jpeg?auto=compress&cs=tinysrgb&w=600"
}
];
,
{
  id:2,
  title: "Lorem ibpum there is a sample data we eill store ",
  desc: "Lorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill store",
  img:"https://images.pexels.com/photos/6348018/pexels-photo-6348018.jpeg?auto=compress&cs=tinysrgb&w=600"
},
{
  id:3,
  title: "Lorem ibpum there is a sample data we eill store ",
  desc: "Lorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill store",
  img:"https://images.pexels.com/photos/6348018/pexels-photo-6348018.jpeg?auto=compress&cs=tinysrgb&w=600"
},
{
  id:4,
  title: "Lorem ibpum there is a sample data we eill store ",
  desc: "Lorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill store",
  img:"https://images.pexels.com/photos/6348018/pexels-photo-6348018.jpeg?auto=compress&cs=tinysrgb&w=600"
},
{
  id:5,
  title: "Lorem ibpum there is a sample data we eill store ",
  desc: "Lorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill storeLorem ibpum there is a sample data we eill store",
  img:"https://images.pexels.com/photos/6348018/pexels-photo-6348018.jpeg?auto=compress&cs=tinysrgb&w=600"
},

];
*/
  return (

    <>
    <Navbar />
    <div className='home'>
    <div className='posts'>
      {posts.map(post=>(
          <div className='post' key={post.id}>
            <div className="img"> 
            <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content"> 
            <Link className='link' to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
              <p>{post.desc}</p>
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