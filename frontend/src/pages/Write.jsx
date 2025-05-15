import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {  useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate} from 'react-router-dom'

import { backendurl } from '../context/authContext';

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.title || '');
  const [title, settitle] = useState(state?.desc || '');
  const [file, setfile] = useState(null);
  const [cat, setcat] = useState(state?.cat || '');

  const upload = async()=>{
    try{
      const formdata = new FormData();
      formdata.append("file",file);
      const res = await axios.post(`${backendurl}/api/upload`,formdata)
      return res.data


    }catch(err)
    {
     console.log(err)
    }
  }
    const navigate = useNavigate()

  const handlesubmit = async e =>{
    e.preventDefault();
    const imgurl = await upload();
    try {
      state?await axios.put(`${backendurl}api/posts/${state.id}`,{
        title,desc:value,cat,img:file?imgurl:""
      }): await axios.post(`${backendurl}/api/posts/`,{
        title,desc:value,cat,img:file?imgurl:"",date:moment(Date.now()).format("YYYY-MM-DD HH:MM:SS")});
navigate("/home")
        

      
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>

    <Navbar/>
    <div className='addwrite'>
      <div className='content'>
      <input type="text" value={title} placeholder='Title' onChange={e=>settitle(e.target.value)}/>
      <div className="editorcontain">
      <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
      </div>
      </div>
  
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input  type="file" name="" id="file" onChange={e=>setfile(e.target.files[0])}/>
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className="buttons">
          <button>Save as Draft</button>
          <button onClick={handlesubmit}>Publish</button>
          </div>
        </div>

        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
          <input type="radio" checked={cat==='art'} name="cat" value="art" id="art" onChange={e=>setcat(e.target.value)}/>
          <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='science'} name="cat" value="science" id="science" onChange={e=>setcat(e.target.value)}/>
          <label htmlFor='science'>science</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='technology'} name="cat" value="technology" id="technology" onChange={e=>setcat(e.target.value)}/>
          <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='cinema'}  name="cat" value="cinema" id="cinema" onChange={e=>setcat(e.target.value)}/>
          <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='food'}  name="cat" value="food" id="food" onChange={e=>setcat(e.target.value)}/>
          <label htmlFor='food'>Food</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='design'}  name="cat" value="design" id="design" onChange={e=>setcat(e.target.value)}/>
          <label htmlFor='design'>Design</label>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Write
