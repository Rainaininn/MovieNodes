import React, {Component, useEffect, useState} from 'react';
import config from './config.js'

const firebase = require('firebase')
const axios = require('axios');
const apikey = '98ff92ae';

class NewMovieListForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {newMovieListName: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    } 
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "newMovieListName") {
      this.setState({newMovieListName: val});
    }
  }

  handleSubmit(event) {        
    let query = firebase.database().ref('data4').orderByChild("Name").equalTo(this.state.newMovieListName);
    query.once("value", (snap) => {
      if (snap.val() !== null) {
        alert("This movie list name already exists.");
        event.preventDefault();
      } else {
        firebase.database().ref("data4").push(
          {
            Name: this.state.newMovieListName,
          }
        );
        alert('The movie list has been successfully created.');
      }
    });
      
    event.preventDefault();
  }

  render(){
    return(
      <form className="newMovieListForm" onSubmit={this.handleSubmit}>
        <label>
          List title : <br/>
          <input type="text" name="newMovieListName" value={this.state.newMovieListName} style={{width: "250px", fontSize: "13pt"}} onChange={this.handleChange} /> 
          Please enter a title for the new list.
        </label><br/>
        <input className="submitBtn" type="submit" value="Submit"  />
      </form>
    );
  }
}export default NewMovieListForm;