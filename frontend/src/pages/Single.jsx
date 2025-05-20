import React, { useContext, useEffect, useState } from 'react'
import Edit from "../img/iconedit.png"
import Delete from "../img/delete.png"
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Menu from "../components/Menu"
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import moment from 'moment-timezone';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { backendurl } from '../context/authContext'
const stopWords = new Set([
  'the', 'is', 'in', 'and', 'to', 'a', 'of', 'it', 'that', 'this', 'with', 'as', 'for', 'on', 'was',
  'but', 'are', 'by', 'be', 'or', 'not', 'from', 'at', 'an'
]);

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function getWordFrequencies(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  const freq = {};

  if (!words) return freq;

  words.forEach(word => {
    if (!stopWords.has(word)) {
      freq[word] = (freq[word] || 0) + 1;
    }
  });

  return freq;
}

function scoreSentence(sentence, freq) {
  const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
  let score = 0;
  words.forEach(word => {
    if (freq[word]) {
      score += freq[word];
    }
  });
  return score;
}

const Single = () => {
 const [post,setPost] = useState({});  //empty object

    //-----------------text to speech-------------------
   const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const speakText = (htmlText) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlText;
  const plainText = tempElement.textContent || tempElement.innerText || "";
    // Stop if already speaking
    if (synth.speaking) {
      synth.cancel(); // Stop current speech
      setIsSpeaking(false);
      return;
    }

    if (htmlText !== '') {
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setIsSpeaking(false);
      };
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const location = useLocation()
  const navigate = useNavigate()
  //get only id
  const postid = location.pathname.split("/")[2]; //2nd item in array is id

  const {currentuser} = useContext(AuthContext)
  useEffect(()=>{
    const fetchdata = async () =>{
      try{
        const res = await axios.get(`${backendurl}/api/posts/${postid}`);
        setPost(res.data);
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
      navigate("/home")
      console.log(res.data);
    }catch(err)
    {
      console.log(err)
    }
  }

//summarize text
const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    const plainText = stripHtml(post.desc);

    const freq = getWordFrequencies(plainText);
   
    const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [];
    const scoredSentences = sentences.map(sentence => ({
      sentence,
      score: scoreSentence(sentence, freq)
    }));
    scoredSentences.sort((a, b) => b.score - a.score);

    const topSentences = scoredSentences.slice(0, 3).map(s => s.sentence.trim());

    setSummary(topSentences.join(' '));
  };

  return (
    <>
      <Navbar/>
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post?.img}`} alt=""/>
      <div className='user'>
         {post.userimg && <img src={post?.userimg} alt=""/> }
      <div className='info'>
      <span>Posted By: {post?.username} </span>
      <p>Posted this {moment(post.date).fromNow()}</p>
      </div>
     {currentuser && currentuser.username === post.username &&
      <div className="edit">
      <Link to={`/write?edit=2`} state={post}>
        <img src={Edit} alt="" />
      </Link>
        <img onClick= {handledelete} src={Delete} alt="" />
      </div> }
      </div>
       <div className='titledata'>
      <h1>{post.title} </h1>

      <div className='summary-read-btn'>
      <button className='summarizebtn' onClick={handleSummarize}>Get Summary</button>
       <button className='readtext' onClick={() => speakText(post.desc)}>
        {isSpeaking ? 'Stop Reading 🔇 ' : 'Read Aloud 🔊'}
      </button>
      </div>
      </div>
     <div dangerouslySetInnerHTML={{__html: post.desc}} className='desctextonsinglepage'/>

       {summary && (
        <div className="popup">
        <div className='summarytitle'>
        <h5 className='summarytit'>{post.title} - Quick Summary</h5> </div>
          <p className='summarydesc'>{summary}</p>
          <div className='closebtnpopup'>
          <button className='popupclose' onClick={() => setSummary('')}>Close</button>
          </div>
        </div>
      )}
      </div> 
     
      <Menu cat={post.cat}/>
    </div>

    <Footer/>
    </>
  )
}

export default Single
