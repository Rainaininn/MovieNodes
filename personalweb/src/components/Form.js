import React, {Component, useEffect, useState} from 'react';
import './Contact.css'
const firebase = require('firebase')

const styles =  {
  fontFamily: 'sans-serif',
  textAlign: 'left',
  textAlign: 'top',
};

const err1 = '*Name must be between 5 and 20 characters*\n\n';
const err2 = '*Invalid email format*\n';
const err3 = '*Description must be under 100 characters*\n';
const err4 = '*Your message must be between 15 and 500 characters*\n';

class Form extends React.Component {
  // const timestamp = Date.now();

  constructor(props) {
    super(props);
    this.state = {name: null, description: null, id: 0, email: null, pubview: 'private', message: null, time: '', error1: '', error2: '',error3: '', error4: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "fname") {
      if (val.length <5 || val.length > 20 ){
        err = <strong>*Name must be between 5 and 20 characters*</strong>;
        this.state.error1 = err1;
        this.setState({name: val});
      }
      else{
        this.state.error1 = '';
        this.setState({name: val});
      }
    }
    if (nam === "femail") {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(val === ''){
        this.state.error2 = '';
        this.setState({email: val});
      }
      else if (!val.match(mailformat)){
        this.state.error2 = err2;
        this.setState({email: val});
      }
      else{
        this.state.error2 = '';
        this.setState({email: val});
      }
    }
    if (nam === "fdescription") {
      if (val.length > 100){
        this.state.error3 = err3;
        this.setState({description: val});
      }
      else{
        this.state.error3 = '';
        this.setState({description: val});
      }
    }
    if (nam === "fmessage") {
      if (val.length < 15 || val.length > 500){
        this.state.error4 = err4;
        this.setState({message: val});
      }
      else{
        this.state.error4 = '';
        this.setState({message: val});
      }
    }
    if (nam === "fpubview") {
      this.setState({pubview: val});
    }
    console.log("nam : ", nam);
    console.log("val : ", val);
    // this.setState({value: event.target.value});
    this.setState({
      nam: val,
    });
  }

  handleSubmit(event) {
    
    let nam = event.target.name;
    let val = event.target.value;

    if(this.state.error1 != '' || this.state.error2 != '' || this.state.error3 != '' || this.state.error4 != ''){
      alert("Error in your message, please modify.");
      event.preventDefault();
    }
    else if(this.state.message === null || this.state.name === null){
      console.log("Empty form");
      alert("Form not complete, please fill in some message.");
      event.preventDefault();
    }
    else{
      //'data' here is a field in my database that stores all my messages
      //push() adds a child
      //set(jsonBody) sets the value of that child to jsonBody, which is valid JSON
      // let tempForm = {
      //   id: 0,
      //   name: this.state.name,
      //   description: this.state.descriptio,
      //   message: this.state.message,
      //   pubview: this.state.pubview,
      //   email: this.state.email,
      //   time: new Date().toLocaleString(),
      // }
      // let jsonBody = JSON.stringify(tempForm);
      // console.log(jsonBody);
      // console.log(tempForm);

      // firebase.database().ref('data').push().set(jsonBody);
      // alert('Your message has been successfully submitted.');
      firebase.database().ref("data2").push(
        {
          name: this.state.name,
          description: this.state.description,
          message: this.state.message,
          pubview: this.state.pubview,
          email: this.state.email,
          time: new Date().toLocaleString()
        }
      );
      this.setState({name: null ,description: null,message: null, email: null})

      alert('Your message has been successfully submitted.');
      event.preventDefault();
    }
    
  }

  printError(){
    return(
      <div>
        <p>{this.state.error1}</p>
        <p>{this.state.error3}</p>
        <p>{this.state.error4}</p>
        <p>{this.state.error2}</p>
      </div>
    );
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Name: <br/>
          <input type="text" name="fname" value={this.state.name} style={{width: "400px", fontSize: "13pt"}} onChange={this.handleChange} /> 
        </label><br/>
        <label>
          A short description of yourself: (optional) <br/>
          <input type="text" name="fdescription" value={this.state.description} style={{width: "400px", fontSize: "13pt"}} onChange={this.handleChange} />
        </label><br/>
        <label style={styles}>
          Leave a message to prove that you've been here ~ <br/>
          <textarea className="userInput" name="fmessage" value={this.state.message} style={{width: "400px", height:"200px", padding: "10px", fontSize: "13pt"}} onChange={this.handleChange}></textarea>
        </label><br/>
        <label>
          Do you want your message to be public or private to other visitors? <br/>
          <select name="fpubview" value={this.state.pubview} onChange={this.handleChange} style={{ fontSize: "13pt"}}>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label><br/>
        <label>
          If you would like me to contact you, what's your email? (Emails will not be posted) <br/>
          <input type="text" name="femail" value={this.state.email} style={{width: "400px", fontSize: "13pt"}} onChange={this.handleChange} />
        </label><br/>
        <div className="ErrorMessage">
          {this.printError()}
        </div>
        <input type="submit" value="Submit"  />
      </form>
    );
  }
}
export default Form;

// ReactDOM.render(
//   <Form />,
//   document.getElementById('root')
// );