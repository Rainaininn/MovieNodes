import React, {Component, useEffect, useState, useLayoutEffect} from 'react';
import Popup from "reactjs-popup";
import './Movies.css'
import NewMovie from './NewMovie';
import config from './config.js'

const firebase = require('firebase')
const axios = require('axios');
const apikey = '98ff92ae';

function Movies(props){

  const movieIds = ["tt1375666","tt0190332","tt0468569","tt0499549","tt3783958","tt0107156","tt5580390","tt2948356","tt1024648","tt2380307","tt0944835","tt0093389"];
  const [currMovieList, setCurrMovieList] = useState([]);
  const [availMovieLists, setAvailMovieLists] = useState([]);
  const [availMLAll, setAvailMLAll] = useState([]);
  const [chosenML, setChosenML] = useState('All');
  const [searchName, setSearchName] = useState('');
  const [showUntil, setShowUntil] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [movies, setMovies] = useState([]);
  const [shouldRender, setShouldRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [beginning, setBeginning] = useState(false);

  function disableScrolling(){
      var x=window.scrollX;
      var y=window.scrollY;
      window.onscroll=function(){window.scrollTo(x, y);};
  }

  function enableScrolling(){
      window.onscroll=function(){};
  }

  useEffect(() => {
    let tempShowUntil;
    if(beginning=== false){
      tempShowUntil = 8;
      setShowUntil(8);
    }
    else{
      tempShowUntil = showUntil;
      setShowUntil(tempShowUntil);
    }
    // get all the movies in data3
    console.log("Calling UseEffect Again!!");
    firebase.database().ref("data3").on("value", snapshot => {
      const lists = snapshot.val();
      let newState = [];
      let newStateAll = [];
      let count = 0;
      for (let list in lists) {
        if(count < tempShowUntil){
          newState.push(lists[list]);
        }
        newStateAll.push(lists[list]);
        count = count + 1;
      }
      console.log("show until 1:", tempShowUntil);
      if(beginning === false){
        setTotalNum(count);
        setBeginning(beginning => true);
      }
      setMovies(newState);
      if(chosenML === "All" && searchName === ""){
        setCurrMovieList(newState);
        if(tempShowUntil < count){
          ////
          console.log("show until:", tempShowUntil);
          console.log("count: ", count)
          console.log("Turned to true here 3");
          setShowLoadMore(showLoadMore => true);
        }
        else{
          setShowLoadMore(showLoadMore => false);
        }
      }
      else{
        let count3 = 0;
        for (let mv in newStateAll){
          if(newStateAll[mv].List === chosenML){
            count3 = count3 + 1;
          }
        }
        console.log("Finallyyyyyyyyyyyyyyyy", tempShowUntil)
        console.log("Finallyyyyyyyyyyyyy 2", count3)
        if(tempShowUntil < count3){
          setShowLoadMore(showLoadMore => true);
        }
        else if(tempShowUntil >= count3){
          setShowLoadMore(showLoadMore => false);
        }
      }
    });

    

    //get all available movie lists
    firebase.database().ref("data4").on("value", snapshot => {
      const lists = snapshot.val();
      let newState = [""];
      let newStateAll = ["All"]; //contains the list "All"
      for (let list in lists) {
        newState.push(lists[list].Name);
        newStateAll.push(lists[list].Name);
      }
      setAvailMovieLists(newState);
      setAvailMLAll(newStateAll);
    });

  }, [shouldRender,open]);

  function openModal(index) {
    setOpen(open => true);
    setSlide(slide => index);
    disableScrolling();
    // document.body.classList.add("disable-scrolling"); 
    // index = index;
    console.log("open ? ",open);
    console.log("Clicked on this movie: ", currMovieList[index]);
  }

  function showModal(){
    var currMovie = currMovieList[slide];
    // console.log("background grid: ", currMovieList);
    if(open === true){
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
              <div className="movieScore">
                <div className="updateListIn">
                  <label>
                    Put in list:
                    <select value={currMovie.List} onChange={e => {closeModal(); updateListIn(e.target.value, currMovie);}} style={{ fontSize: "13pt"}}>
                      {availMovieLists.map(lst => (
                        <option key={lst} value={lst}>{lst}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="deleteMovie" onClick={() => {closeModal();deleteMovie(currMovie);}}>Delete</div>
              </div>
            </div>
          </div>
        </Popup>
      );
    }
  }

  function closeModal() {
    setOpen(open => false);
    enableScrolling();
    console.log("Done close modal");
  }

  function updateCurrML(lst){
    console.log("Show until: " , showUntil)

    console.log("lst is ", lst);
    setChosenML(lst);
    let newState = [];
    let newStateFull = [];
    firebase.database().ref("data3").on("value", snapshot => {
      const lists = snapshot.val();
      let count = 0;
      for (let list in lists) {
        // console.log("index: ", count);
        newStateFull.push(lists[list]);
        if(count < 8){
          newState.push(lists[list]);
        }
        count = count + 1;
      }
    });
    //set currMovieList
    if(lst === 'All'){
      console.log("Choose All!!");
      setCurrMovieList(newState);
      if(8 < totalNum){
        console.log("Turned to true here 2");
        setShowLoadMore(showLoadMore => true);
      }
    }
    else{
      let currMvs = [];
      let count2 = 0;
      for (let mv in newStateFull){
        if(newStateFull[mv].List === lst){
          if(count2 < 8){
            currMvs.push(newStateFull[mv]);
          }
          count2 = count2 + 1;
        }
      }
      setCurrMovieList(currMvs);
      console.log("Count 2: ", count2);
      if(8 < count2){
        console.log("Turned to true here 1");
        setShowLoadMore(showLoadMore => true);
      }
      else{
        setShowLoadMore(showLoadMore => false);
      }
      // console.log("currentMVS: ", currMvs);
    }
    // console.log("current movie list: ",currMovieList)
  }

  function updateListIn(lst, currMovie){
    firebase.database().ref('data3').orderByChild('imdbID').equalTo(currMovie.imdbID).once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        child.ref.update({'List': lst});
      }); // a closure is needed here
    }).then(function() {
      console.log("Moved!");
      ///try to update the grid
      if(chosenML != "All"){
        var temp_array = currMovieList;
        var index = temp_array.indexOf(currMovie);
        if (index !== -1) {
          temp_array.splice(index, 1);
          setCurrMovieList(temp_array);
        }
      }
    });
  }

  function deleteMovie(currMovie){
    firebase.database().ref('data3').orderByChild('imdbID').equalTo(currMovie.imdbID).once("value").then(function(snapshot) {
      snapshot.forEach(function(child) {
        child.ref.remove();
      }); // a closure is needed here
    }).then(function() {
      console.log("Removed!");
    });
    // alert("Successfully deleted ", currMovie.Title);
  }

  function searchMovie(e){
    e.preventDefault();
    console.log("Searching this movie: ", searchName);
    let new_CurrMovieList = [];
    for (let mv in movies){
      if(movies[mv].Title === searchName){
        new_CurrMovieList.push(movies[mv]);
      }
    }
    setCurrMovieList(new_CurrMovieList);
    if(searchName === ""){
      setCurrMovieList(movies);
      if(showUntil < totalNum){
        setShowLoadMore(showLoadMore => true);
      }
    }
  }

  function displayMovies(){
    // console.log("Inside display 1: ", movies);
    // console.log("curr movie list: ", currMovieList);
    const content = currMovieList.map((movie,index) =>{
      var tempMovie = movie;
      return (<div key={tempMovie.imdbID} >
        <img src={tempMovie.Poster} className="grid-part-portrait" onClick={() => openModal(index)}/>
        {showModal()}
      </div>)
    });
    return (
      <div className="movieGrid">
        <div className="header1">
          {/* {chosenML} */}
          <label>
            <select value={chosenML} onChange={e => {setShowUntil(8); updateCurrML(e.target.value);}} style={{ fontSize: "13pt"}}>
              {availMLAll.map(lst => (
                <option key={lst} value={lst}>{lst}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="image-grid1">
          {content}
        </div>
      </div>
    );
  }

  function loadMore(){
    if((showUntil + 8) >= totalNum){
      console.log("chao le", showUntil+8);
      setShowLoadMore(showLoadMore => false);
    }
    firebase.database().ref("data3").on("value", snapshot => {
      const lists = snapshot.val();
      let newState = [];
      let count = 0;
      for (let list in lists) {
        // console.log("index: ", count);
        if(count < (showUntil+8)){
          newState.push(lists[list]);
        }
        count = count + 1;
      }
      setMovies(newState);
      if(chosenML === "All"){
        setCurrMovieList(newState);
      }
      else{
        let currMvs = [];
        for (let mv in newState){
          if(newState[mv].List === chosenML){
            currMvs.push(newState[mv]);
          }
        }
        setCurrMovieList(currMvs);
        if((showUntil+8) >= currMvs.length){
          setShowLoadMore(showLoadMore=>false);
        }
      }
    });
    setShowUntil(showUntil+8);
    console.log("Now after loading more: ", currMovieList);
  }

  function handleChange(searchName){
    setSearchName(searchName);
  }

  function displayLoadMore(){
    console.log("Re-render display load more", showLoadMore);
    if(showLoadMore != false){
      return(
        <div className="movies-bottom">
          <button className="loadMore" onClick={()=> loadMore()}>
            Load More
          </button>
        </div>
      );
    }
    else{
      return(
        <div className="whitespace"></div>
      );
    }
  }

  return(
    <div className="background1">
      <div className="whitespace"></div>
      <div className="movies-main">
        <div className="movies-right">
          <br/>
          <div className="big-words">Search a movie</div>
          <form className="movieScore">
            <label>
              <input type="text" name="searchMovie" value={searchName} style={{width: "200px", fontSize: "13pt"}} onChange={e => handleChange(e.target.value)}/> 
            </label>
            <button className="searchBtn" onClick={e => searchMovie(e)}>Search</button>
          </form>
          <br/><br/>
          <NewMovie></NewMovie>
        </div>
        <div className="movies-left">
          <div>
            {displayMovies()}
          </div>
          {displayLoadMore()}
        </div>
        
      </div>
      
    </div>
  );
} export default Movies;
