import React, {Component, useEffect, useState} from 'react';
import config from './config.js'

const firebase = require('firebase')
const axios = require('axios');
const apikey = '98ff92ae';

class NewMovieForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {newMovieID: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    } 
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "newMovieID") {
      this.setState({newMovieID: val});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = 'https://www.omdbapi.com/?apikey='+apikey+'&i='+this.state.newMovieID;
    ///get the movie info!!
    axios.get(url)
      .then(function(response){
        // console.log("Hereeeee", response);
        if(response.data.Response=== "False"){
          alert("Invalid movie ID, please try again.");
          event.preventDefault();
        }
        else{
          let query = firebase.database().ref('data3').orderByChild("imdbID").equalTo(response.data.imdbID).limitToFirst(1);
          query.once("value", (snap) => {
            if (snap.val() !== null) {
              alert("This movie already exists.");
              event.preventDefault();
            } else {
              firebase.database().ref("data3").push(
                {
                  imdbID: response.data.imdbID,
                  Poster: response.data.Poster,
                  Title: response.data.Title,
                  Year: response.data.Year,
                  Director: response.data.Director,
                  imdbRating: response.data.imdbRating,
                  Metascore: response.data.Metascore,
                  Plot: response.data.Plot,
                  Awards: response.data.Awards,
                  Runtime: response.data.Runtime,
                  Actors: response.data.Actors,
                  List: '',
                }
              );
              alert('The movie has been successfully added.');
            }
          });
        }
      })
      .then(function(error){
        console.log(error);
      })
    event.preventDefault();
  }

  render(){
    return(
      <form className="newMovieListForm" onSubmit={this.handleSubmit}>
        <label>
          Movie ID: <br/>
          <input type="text" name="newMovieID" value={this.state.newMovieID} style={{width: "250px", fontSize: "13pt"}} onChange={this.handleChange} /> 
          Please give the imdbID of the movie.
        </label><br/>
        <input className="submitBtn" type="submit" value="Submit"  />
      </form>
    );
  }
}export default NewMovieForm;