import React, {Component} from 'react';
import './Projects.css'

export class Projects extends Component{
  render(){
    return(
      <div>
        <div className="white-space"></div>
        <div className="project">
          <div className="project-left">
            <a href="https://www.shadertoy.com/view/tsXcz7" >
              <img border="0" alt="Foreign Planets" src={require('./images/project1.png')} className="project-logo" />
            </a>
          </div>
          <div className="project-right">
            Foreign Planets: Rendered scene on Shadertoy
          </div>
        </div>
        <div className="project">
          <div className="project-left">
            <a href="https://github.com/Rainaininn/Art22_Final_Bamboo" >
              <img border="0" alt="Bamboo" src={require('./images/fullbamboo.png')} className="project-logo" />
            </a>
          </div>
          <div className="project-right">
            Bamboo: Art project built on Processing
          </div>
        </div>
      </div>
    );
  }
}
export default Projects;