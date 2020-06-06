import React, {Component} from 'react';
import Home from './Home';
import Images from './Images';
import Videos from './Videos';
import Projects from './Projects';
import Movies from './Movies';
import Contact from './Contact';
import Links from './Links';
// import { render } from "react-dom";

export class Body extends Component{
  displayContent = () =>{
    var activeTab = this.props.activeTab
    if(activeTab == 1){
      return <Home></Home>
    }
    else if(activeTab == 2){
      return <Images></Images>
    }
    else if(activeTab == 3){
      return <Videos></Videos>
      // return render(<Videos />, document.getElementById("root"));
    }
    else if(activeTab == 4){
      return <Projects></Projects>
    }
    else if(activeTab == 5){
      return <Movies></Movies>
    }
    else if(activeTab == 6){
      return <Links></Links>
    }
    else{
      return <Contact></Contact>
    }
  }
  render(){
    return(
      this.displayContent()
    );
  }
}
export default Body;