import React, {Component} from 'react';
import './App.css'
import TabList from './components/TabList';
import Body from './components/Body';
import BackToTop from './components/BackToTop'

export class App extends Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) =>{
      if(id != 5){
        this.setState({
        activeTab: id
      })
      }
      
    }
  }
  handleOverScroll(){
    var bttn=document.querySelector(".top");
    if(document.body.scrollTop>20|| document.documentElement.scrollTop>20){
        bttn.style.visibility="visible";
    }
    else{
        bttn.style.visibility="hidden";
    }
  }
  componentDidMount(){
    window.addEventListener('scroll',this.handleOverScroll)
  }
  render(){
    const tabs = [
      {
        id: 1,
        title: "Home"
      },
      {
        id: 2,
        title: "Images"
      },
      {
        id: 3,
        title: "Videos"
      },
      {
        id: 4,
        title: "Projects"
      },
    ]
    return(
      <div className="body">
        <div className="nav-bar">
          <TabList tabs={tabs} 
          activeTab={this.state.activeTab}
          changeTab={this.changeTab}/>
          <div className="tab-right">
          Rain Wang
          </div>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}></Body>
          <BackToTop/>
        </div>
      </div>
    );
  }
}
export default App;