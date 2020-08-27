import React, {Component} from 'react';
import './App.css'
import TabList from './components/TabList';
import Body from './components/Body';
// import BackToTop from './components/BackToTop'
// import config from './config.js'
// const firebase = require('firebase')

export class App extends Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) =>{
      if(id != 3){
        this.setState({
        activeTab: id
      })
      }
      
    }
  }
  // handleOverScroll(){
  //   var bttn=document.querySelector(".top");
  //   if(document.body.scrollTop>100 || document.documentElement.scrollTop>100 ){
  //       bttn.style.visibility="visible";
  //   }
  //   else{
  //       bttn.style.visibility="hidden";
  //   }
  // }
  // componentDidMount(){
  //   document.title = "Rain Wang"
  //   window.addEventListener('scroll',this.handleOverScroll)
    // if (!firebase.apps.length){
    //   firebase.initializeApp(config)
    // } 
    // //get a reference to the database
    // let ref = firebase.database().ref('data')

    // //retrieve its data
    // ref.on('value', snapshot => {
    //     //this is your call back function
    //     //state will be a JSON object after this
    //     //set your apps state to contain this data however you like
    //     const state = snapshot.val()
    //     //since i use react 16, i set my state like this
    //     //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
    //     setData(state)
    //     const data = snapshot.val()
    //     this.setState({data: data})
    // })

  // }
  // componentDidUpdate(prevProps, prevState, snapshot){
  //   //only call set state here if it is wrapped in a condition
  //   //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
  //   if(this.state.shouldUpdate != prevState.shouldUpdate){
  //     //same code as above to retrieve the data 
  //   }
  // }

  render(){
    const tabs = [
      {
        id: 1,
        title: "Movies"
      },
      {
        id: 2,
        title: "Graph"
      },
    ]
    return(
      <div className="body">
        <div className="nav-bar">
          <TabList tabs={tabs} 
          activeTab={this.state.activeTab}
          changeTab={this.changeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}></Body>
        </div>
      </div>
    );
  }
}
export default App;