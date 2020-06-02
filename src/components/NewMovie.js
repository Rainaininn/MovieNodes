import React, {Component, useEffect, useState, useLayoutEffect} from 'react';
import Popup from "reactjs-popup";
import config from './config.js'
import NewMovieForm from './NewMovieForm'
import NewMovieListForm from './NewMovieListForm'
const firebase = require('firebase')

function NewMovie(props){
  const [newMovie, setNewMovie] = useState([]);
  const [shouldRender, setShouldRender] = useState(true)

  // useEffect(() => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(config)
  //   } 
  //   let ref = firebase.database().ref('data3')

  //   ref.on('value', snapshot => {
  //     //this is your call back function
  //     //state will be a JSON object after this
  //     //set your apps state to contain this data however you like
  //     const m2 = snapshot.val()
  //     let newState = [];
  //     for(let m1 in m2){
  //       newState.push({
  //         name: m2[m1].name,
  //         description: m2[m1].description,
  //         message: m2[m1].message,
  //         pubview: m2[m1].pubview,
  //         email: m2[m1].email,
  //         time: m2[m1].time,
  //       });
  //     }
  //     // console.log("newState: ",newState);
  //     setMessage(newState);
  //     // console.log("Inside display2: ", newState);
  //   })
  // }, [shouldRender])

  return(
    <div>
      <div className="big-words">
        Add a new movie<br/>
        <NewMovieForm></NewMovieForm>
      </div>
      <br/><br/>
      <div className="big-words">
        Create a new movie list<br/>
        <NewMovieListForm></NewMovieListForm>
      </div>
    </div>
    
  );
} export default NewMovie;