import React from 'react';
import Carousel from 'nuka-carousel';
import Mypic from '../../images/gifticon.png';
const DOMAIN = 'http://localhost:3000';

export default class CarouselShowPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  render() {
    // console.log(this.props.images)
    const {images} = this.props
    // console.log('image',images)

    if (images.length < 1) {
      return (<div className="text-center default_pic">
        <img width="100%" height="400px" className="rounded" src={Mypic}/>
      </div>)
    }

    if (images.length === 1) {
      const url = `url(${DOMAIN}${images[0].photo_url})`
      return (<div className="text-center default_pic">
        {/* <div style={{
            width: "100%",
            height: "280px",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundImage: url
          }}/> */}

          <img width="100%" height="400px" className="rounded" src={`${DOMAIN}${images[0].photo_url}`}/>

      </div>)
    }

    return (<Carousel width="100%">
      {images.map(image => (<img key={image.id} width="400px" height="400px" className="rounded" src={`${DOMAIN}${image.photo_url}`}/>))}
    </Carousel>);

  }
}