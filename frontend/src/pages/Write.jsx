import axios from 'axios';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { backendurl } from '../context/authContext';

const Write = () => {

   const {setCurrentuser,currentuser}= useContext(AuthContext);
   const navigate = useNavigate();

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, settitle] = useState(state?.title || '');
  const [file, setfile] = useState(null);
  const [cat, setcat] = useState(state?.cat || '');
  console.log(setCurrentuser);

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

  function pad(num) {
  return num.toString().padStart(2, '0');
}

const now = new Date();

const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
                      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

console.log(formattedDate);

  const handlesubmit = async e =>{
    e.preventDefault();
    const imgurl = await upload();
    try {
      state?await axios.put(`${backendurl}/api/posts/${state.id}`,{
        title,desc:value,cat,img:file?imgurl:""
      }): await axios.post(`${backendurl}/api/posts/`,{
        title,desc:value,cat,img:file?imgurl:"",date:formattedDate,uid:currentuser?.id});

        alert("Post Created Successfully!");
        navigate("/home");
    } catch (err) {
      console.log(err);
    }

  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
    ]
  };

  // Define formats that are allowed
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'script',
    'color', 'background',
    'list', 'bullet'
  ];
  return (
    <>
    <Navbar/>

    <div className='addwrite'>
      <div className='content'>
     
      <input type="text" value={title} placeholder='Title' onChange={e=>settitle(e.target.value)} />
      <div className="editorcontain">
      <ReactQuill className="editor" theme="snow" value={value} modules={modules}
        formats={formats} onChange={setValue}/>
      </div>
      </div>
  
      <div className='menu'>
        <div className='item'>
          <h1>Image</h1>
          <span>
            <b>Visibility:</b> Public
          </span>
         <span> <br/> <input  type="file" name="" id="file" onChange={e=>setfile(e.target.files[0])} /></span>
        
        </div>

        <div className='item'>
          <h1>Category</h1>
          <div className='cat' >
          <input type="radio" checked={cat==='art'} name="cat" value="art" id="art" onChange={e=>setcat(e.target.value)}  />
          <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='science'} name="cat" value="science" id="science" onChange={e=>setcat(e.target.value)} />
          <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='technology'} name="cat" value="technology" id="technology" onChange={e=>setcat(e.target.value)} />
          <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='cinema'}  name="cat" value="cinema" id="cinema" onChange={e=>setcat(e.target.value)} />
          <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='food'}  name="cat" value="food" id="food" onChange={e=>setcat(e.target.value)} />
          <label htmlFor='food'>Food</label>
          </div>
          <div className='cat'>
          <input type="radio" checked={cat==='design'}  name="cat" value="design" id="design" onChange={e=>setcat(e.target.value)} />
          <label htmlFor='design'>Design</label>
          </div>
        </div>

        <div className='item' id="publishbutton">
            <div className="buttons">
          <button className='publishbutton'   onClick={handlesubmit}>Publish Your Post</button>
          </div>
        </div>
      </div>
    </div>
   
    <Footer/>
    </>
  )
}

export default Write
