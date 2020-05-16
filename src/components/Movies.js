import React, {Component, useEffect, useState, useLayoutEffect} from 'react';
import Popup from "reactjs-popup";
import './Movies.css'

const axios = require('axios');
const apikey = '98ff92ae';

function Movies(props){

  const movieIds = ["tt1375666","tt0190332","tt0468569","tt0499549","tt3783958","tt0107156","tt5580390","tt2948356","tt1024648","tt2380307","tt0944835","tt0093389"];
  // const movieOther = ["tt0468569","tt0499549","tt3783958","tt0107156","tt5580390","tt2948356"];
  const movieList = [];
  const [movies, setMovies] = useState([]);
  const [shouldRender, setShouldRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  // Hook
  function useLockBodyScroll() {
    useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => document.body.style.overflow = originalStyle;
    }, []); // Empty array ensures effect is only run on mount and unmount
  }

  function disableScrolling(){
      var x=window.scrollX;
      var y=window.scrollY;
      window.onscroll=function(){window.scrollTo(x, y);};
  }

  function enableScrolling(){
      window.onscroll=function(){};
  }

  useEffect(() => {
    const listofpromises = [];
    for (const [index,value] of movieIds.entries()) {
      const url = 'http://www.omdbapi.com/?apikey='+apikey+'&i='+value;
      listofpromises.push(axios.get(url));
    }
    axios.all(listofpromises)
      .then(axios.spread(function (...responses) {
        // Both requests are now complete
        movieList.push( responses[0].data );
        movieList.push( responses[1].data );
        movieList.push( responses[2].data );
        movieList.push( responses[3].data );
        movieList.push( responses[4].data );
        movieList.push( responses[5].data );
        movieList.push( responses[6].data );
        movieList.push( responses[7].data );
        movieList.push( responses[8].data );
        movieList.push( responses[9].data );
        movieList.push( responses[10].data );
        movieList.push( responses[11].data );
        setMovies(movieList);
      }))
      .catch(errors => {
        console.log(errors)
      });
  }, [shouldRender,open]);

  function openModal(index) {
    setOpen(open => true);
    setSlide(slide => index);
    disableScrolling();
    // document.body.classList.add("disable-scrolling"); 
    // index = index;
    console.log("open ? ",open);
    console.log("Clicked on this movie: ", movies[index]);
  }

  function showModal(){
    var currMovie = movies[slide];
    console.log("Current One: ", currMovie);
    return(
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={() => closeModal()}
        contentStyle={{width: "500px"}}
        overlayStyle={{background: "rgba(0,0,0,0.1)"}}
        
      >
        <div className="movieDetails">
          <button className="close1" onClick={() => closeModal()}>
            &times;
          </button>
          <div className="moviePoster">
            <img src={currMovie.Poster} height="330px"/>
          </div>
          <div className="movieDes">
            <div className="movieTitle">{currMovie.Title}</div>
            <div className="movieYear">{currMovie.Year}</div>
            <div className="movieDirect">Directed by {currMovie.Director}</div>
            <div className="movieScore">
              <div className="imdbScore">IMDB Score: {currMovie.imdbRating}</div>
              <div className="metaScore">Meta Score: {currMovie.Metascore}</div>
            </div>
            <div className="moviePlot">{currMovie.Plot}</div>
            <div className="movieAwards">{currMovie.Awards}</div>
            <div className="movieMin">{currMovie.Runtime}</div>
          </div>
        </div>
      </Popup>
    );
  }

  function closeModal() {
    setOpen(open => false);
    // document.body.classList.remove("disable-scrolling"); 
    enableScrolling();
  }

  function displayMovies() {
    // console.log("Inside display 1: ", movies);
    const content = movies.map((movie,index) =>{
      var tempMovie = movie;
      return (<div key={tempMovie.imdbID} >
        <img src={tempMovie.Poster} className="grid-part-portrait" onClick={() => openModal(index)}/>
        {showModal()}
      </div>)
    });
    return (
      <div className="movieGrid">
        <div className="header1">Some of my favorite movies</div>
        <div className="image-grid1">
          {content}
        </div>
      </div>
    );
  }

  return(
    <div className="background1">
      <div className="whitespace"></div>
      <div>
        {displayMovies()}
      </div>
    </div>
  );
} export default Movies;
