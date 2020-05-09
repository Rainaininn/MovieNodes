import React, {Component} from 'react';
import 'react-image-lightbox/style.css';
import './Video.css'
import closeIcon from './images/close.png'

export class Videos extends Component{
  closeModal() {
    console.log("Close modal");
    var mm = document.getElementsByClassName("modal");
    mm[0].style.display = 'none';
  }

  showSlides = (n) =>{
    console.log("showSlides");
    var mm = document.getElementsByClassName("modal");
    mm[0].style.display = 'block';
    var slideIndex = n;
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
  }

  render(){

    return(
      <div>
        <div className="white-space"></div>

        <div className="image-grid">
            <video controls height="250px" onClick={this.showSlides.bind(this,1)} className="center grid-part-landscape">
              <source src={require('./images/crab.mov')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls height="250px" onClick={this.showSlides.bind(this,2)} className="center grid-part-portrait">
              <source src={require('./images/pancake.mov')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls height="250px" onClick={this.showSlides.bind(this,3)}  className="center grid-part-landscape">
              <source src={require('./images/mojave.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
 
        <div className="modal">
          <div className="close">
            <button className="x" onClick={this.closeModal}> <img src={closeIcon} alt=""/> </button>
          </div>
          <div className="modal-content">
            <video controls className="mySlides">
              <source src={require('./images/crab.mov')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls className="mySlides">
              <source src={require('./images/pancake.mov')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video controls className="mySlides">
              <source src={require('./images/mojave.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>
    );
  }
}
export default Videos;
