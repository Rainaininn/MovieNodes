import React, {Component} from 'react';
import Movies from './Movies';
import Link from './Links'
// import { render } from "react-dom";

export class Body extends Component{
  displayContent = () =>{
    var activeTab = this.props.activeTab
    if(activeTab == 1){
      return <Movies></Movies>
    }
    else{
      return <Link></Link>
    }
  }
  render(){
    return(
      this.displayContent()
    );
  }
}
export default Body;