import React, {Component, useEffect, useState} from 'react';
import './Movies.css'

const axios = require('axios');
const apikey = '98ff92ae';

function Movies(props){

  const movieIds = ["tt1375666","tt0190332"];
  const movieOther = ["tt0468569","tt0499549","tt3783958","tt0107156","tt5580390","tt2948356"];
  // const [movieList, setMovieList] = useState([]);
  const movieList = [];

  useEffect(() => {
    const listofpromises = [];
    for (const [index,value] of movieIds.entries()) {
      const url = 'http://www.omdbapi.com/?apikey='+apikey+'&i='+value;
      listofpromises.push(axios.get(url));
    }
    // console.log("List of promises: ", listofpromises);
    // const tempList = [];
    axios.all(listofpromises)
      .then(axios.spread(function (...responses) {
        // Both requests are now complete
        console.log("response 1: ", responses[0].data);
        console.log("response 2: ", responses[1].data);
        const result1 = Object.values(responses[0]);
        movieList.push( responses[0].data );
        movieList.push( responses[1].data );
      }))
      .catch(errors => {
        console.log(errors)
      });
    // console.log("TempList:  ", tempList);
    // movieList.push(tempList);
    // setMovieList({list: tempList})
    console.log("Movie List:  ", movieList);
  })

  function displayMovies() {
    console.log("Inside display 1: ", movieList);
    const content = movieList.map((movie,index) =>{
      console.log("Inside display 2: ",movie);
      return (<div key={movie.imdbID}>
        <h3>Movie1</h3>
        <h3>{movie.Title}</h3>
        <div>{movie.Director}</div>
        <p>{movie.Plot}</p>
        <p>{movie.Year}</p>
      </div>)
    });
    return (
      <div className="movieGrid">
        <div className="header">Some of my favorite movies</div>
        {content}
      </div>
    );
  }

  return(
    <div className="background">
      <div className="white-space"></div>
      <div>
        {displayMovies()}
      </div>
    </div>
  );
} export default Movies;