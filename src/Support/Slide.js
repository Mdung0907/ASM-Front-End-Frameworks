import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../Image/slider1.jpg'
import slide2 from '../Image/slider2.jpg'
import slide3 from '../Image/slider3.jpg'
function Slide() {
  return (
    <Carousel>
      <Carousel.Item style={{height:'450px'}}>
        <img
          className="d-block w-100"
          src={slide1}
          alt="First slide"
        height={'100%'} />
      </Carousel.Item>
      <Carousel.Item style={{height:'450px'}}>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
          height={'100%'}
        />

      </Carousel.Item>
      <Carousel.Item style={{height:'450px'}}>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
          height={'100%'}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slide;