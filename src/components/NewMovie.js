import React, {Component, useEffect, useState, useLayoutEffect} from 'react';
import Popup from "reactjs-popup";
import config from './config.js'
import NewMovieForm from './NewMovieForm'
import NewMovieListForm from './NewMovieListForm'
const firebase = require('firebase')

function NewMovie(props){
  const [newMovie, setNewMovie] = useState([]);
  const [shouldRender, setShouldRender] = useState(true)

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