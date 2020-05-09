import React, {Component} from 'react';
import Tab from './Tab';

export class TabList extends Component{
  render(){
    return this.props.tabs.map((indTab) =>(
      <Tab tab={indTab} 
      activeTab={this.props.activeTab}
      changeTab={this.props.changeTab}></Tab>
    ));
  }
}
export default TabList;