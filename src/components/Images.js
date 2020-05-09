import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './Images.css'

export class Images extends Component{

  constructor(props) {
    super(props);
 
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render(){
    const images = [
      require('./images/gallery1.jpg'),
      require('./images/gallery2.jpg'),
      require('./images/gallery3.jpg'),
      require('./images/gallery4.jpg'),
      require('./images/gallery5.jpg'),
      require('./images/gallery6.jpg'),
      require('./images/gallery7.jpg'),
      require('./images/gallery8.jpg'),
      require('./images/gallery9.jpg'),
    ];

    const { photoIndex, isOpen } = this.state;
    return(
      <div>
        <div className= "white-space"></div>

        <div className="image-grid">
            <img src={require('./images/gallery1.jpg')} class="center grid-part-landscape" onClick={() => this.setState({ isOpen: true , photoIndex: 0})} />
            <img src={require('./images/gallery2.jpg')} class="center grid-part-portrait" onClick={() => this.setState({ isOpen: true , photoIndex: 1})} />
            <img src={require('./images/gallery3.jpg')} class="center grid-part-landscape" onClick={() => this.setState({ isOpen: true , photoIndex: 2})} />
            <img src={require('./images/gallery4.jpg')} class="center grid-part-portrait" onClick={() => this.setState({ isOpen: true , photoIndex: 3})} />
            <img src={require('./images/gallery5.jpg')} class="center grid-part-landscape" onClick={() => this.setState({ isOpen: true , photoIndex: 4})} />
            <img src={require('./images/gallery6.jpg')} class="center grid-part-landscape" onClick={() => this.setState({ isOpen: true , photoIndex: 5})} />
            <img src={require('./images/gallery7.jpg')} class="center grid-part-portrait" onClick={() => this.setState({ isOpen: true , photoIndex: 6})} />
            <img src={require('./images/gallery8.jpg')} class="center grid-part-portrait" onClick={() => this.setState({ isOpen: true , photoIndex: 7})} />
            <img src={require('./images/gallery9.jpg')} class="center grid-part-landscape" onClick={() => this.setState({ isOpen: true , photoIndex: 8})} />
        </div>
 
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
export default Images;