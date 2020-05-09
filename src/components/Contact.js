import React, {Component, useEffect, useState} from 'react';
import './Contact.css'
import config from './config.js'
import Form from './Form'
const firebase = require('firebase')

function Contact(props){
  // var messages = []
  const [messages, setMessage] = useState([]);
  // const [state, setData] = useState([])
  const [shouldRender, setShouldRender] = useState(true)
  // const sample = ["hi", "how are you"]

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    } 
    let ref = firebase.database().ref('data2')

    ref.on('value', snapshot => {
      //this is your call back function
      //state will be a JSON object after this
      //set your apps state to contain this data however you like
      const m2 = snapshot.val()
      //since i use react 16, i set my state like this
      //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
      // setData(state)
      let newState = [];
      for(let m1 in m2){
        newState.push({
          name: m2[m1].name,
          description: m2[m1].description,
          message: m2[m1].message,
          pubview: m2[m1].pubview,
          email: m2[m1].email,
          time: m2[m1].time,
        });
      }
      setMessage(newState);
      // console.log("Inside display2: ", newState);
    })
  }, [shouldRender])

  function displayMessage() {
    // console.log("Inside display1: ", messages);
    const content = messages.map((post, index) => {
    if(post.pubview === "public"){
      return <div key={index} className="post">
        <h3>{post.name}</h3>
        <div className="description">{post.description}</div>
        <p>{post.message}</p>
        <p>{post.time}</p>
      </div>
    }
    else{
      return <div></div>
    }
      
    });
    return (
      <div className="postSection">
        <div className="header">Footprint History</div>
        {content}
      </div>
    );
  }

  return(
    <div className="background">
      <div className="white-space"></div>
      <div className="horizontal">
        <div className="left-side"><Form /></div>
        <div className="right-side">
          {displayMessage()}
        </div>
      </div>
    </div>
  );
}
export default Contact;
