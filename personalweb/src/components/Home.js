import React, {Component} from 'react';
import profile from './images/profile.jpg';
import './Home.css'

export class Home extends Component{
  render(){
    return(
      <div className="image">
        <div className="horizontal">
          <div className="leftHori">
            <img src={profile} alt="Rain Wang" height="200" />
          </div>
          <div className="rightHori">
            <h2>About me</h2>
            <p>Hi! My name is Runyu (Rain) Wang.<br />
            I am a coder, foodie, photographer and music lover.<br />
            I am currently pursuing a Bachelor's degree in Computer Science at UCSB.<br />
            Interested in Machine Learning, Computer Graphics, HCI, etc.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;