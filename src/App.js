import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Messege from './Messege';
import db from './Firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './App.css'
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Ring from "./Ring.ogg"

function App() {

  const [messenges,setMessenges] = useState([]);
  const [input,setInput] = useState();
  const [username,setUsername] = useState();

  const sendmessenge = (e) => {

    e.preventDefault();
    db.collection('messeges').add({
      text : input,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }
  
  useEffect(()=>{
    return (
    db.collection("messeges").orderBy('timestamp','desc').onSnapshot(snapshot => {
      setMessenges(snapshot.docs.map((doc) => ({id:doc.id,data:doc.data()})))
    }))
  },[])

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const ring = new Audio();
    ring.src = Ring;
    ring.play();
  },[messenges])

  useEffect(()=>{
      // return (
        // setUsername(prompt("Enter Your name"))
        const requiredFunction = () => {
          var answer = prompt('Please enter your name for join to live chat');
          if (answer === "" || answer===null || answer===",") {
            requiredFunction();
          }
          else{
            setUsername(answer);
          }
        }
        requiredFunction();
        // )
  },[])
  return (
    <div className="App">
        <h3 className="app__clone"><ChatIcon className="text-info"/> Messenger Clone <ChatIcon className="text-info"/></h3>
        <h6 className="app__welcom"><VerifiedUserIcon className="text-success"/>Welcome {username}</h6>
        
    <form className='app__form'>
      <FormControl className="app__formcntroll">
        <input onBlur={({ target }) => target.focus()} className="app__input" placeholder="Enter message...." autoFocus={true} value={input} onChange={(e) => {return setInput(e.target.value)}}/>
        <IconButton className="app__iconbutton" variant="contained" color="primary" disabled={!input} type="submit" onClick={sendmessenge}><SendIcon/></IconButton>
      </FormControl>
      </form>

      <FlipMove>
        {messenges.map((messege) => <Messege key={messege.id} id={messege.id} username={username} messege={messege.data}/>)}
        <br/><br/><br/><br/>
      </FlipMove>

    </div>
  );
}

export default App;
