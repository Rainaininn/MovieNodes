import React, { Component } from 'react';
import icon from './images/up3.png';

export class BackToTop extends Component {
    BackToTop(){
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    }
    render() {
        return (
            <div>
                <button className="top" onClick={this.BackToTop}>
                    <img src={icon} alt=""/>
                </button>
            </div>
        )
    }
}
export default BackToTop;