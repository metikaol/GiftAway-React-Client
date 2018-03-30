import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import Carousel from 'nuka-carousel';
import Mypic from './gifticon.png';
const DOMAIN = 'http://localhost:3000';

export default class CarouselMapPage extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  render() {
    // console.log(this.props.images)
    const { images } = this.props
    // console.log('image',images)

    if(images.length < 1){
      return (
      <div className="text-center default_pic">
        <img width="300px" height="300px" className="rounded" src={Mypic} />
      </div>
      )
    }
    //
    // if(images.length === 1){
    //   return (
    //   <div className="text-center default_pic">
    //     <img width="100%" height="100%" className="rounded" src={`${DOMAIN}${images[0].photo_url}`} />
    //   </div>
    //   )
    // }

    return (
        <Carousel width="300px" >
          {
            images.map(
              image => (
                  <img key={image.id} width= "300px" height="300px" className="rounded"  src={`${DOMAIN}${image.photo_url}`} />
              )
            )
          }
      </Carousel>
    );


  }
}
