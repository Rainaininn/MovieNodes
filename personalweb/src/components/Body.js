import React, {Component} from 'react';
import Home from './Home';
import Images from './Images';
import Videos from './Videos';
import Projects from './Projects';
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
    else{
      return <Projects></Projects>
    }
  }
  render(){
    return(
      this.displayContent()
    );
  }
}
export default Body;