
import { Row, Col } from 'react-bootstrap';
import "./homebanner.css";
import Slider from './Slider';

import { homeBannerJson } from '../../json/json';
import ThirdBanner from './ThirdBanner';
import SecondBanner from './SecondBanner';

const HomeBanner = () => {

  const data = homeBannerJson.map(item => {
    if (item.id === 1) {
      return <SecondBanner key={item.id} item={item} />;
    } else if (item.id === 2) {
      return <ThirdBanner key={item.id} item={item} />;
    } else if (item.id === 3) {
      return <ThirdBanner key={item.id} item={item} />;
    } else {
      return null; // handle other cases if needed
    }
  })

  return (

    <Row className="g-2 mb-4">
      <Col lg={7}>
        <Slider />
      </Col>
      <Col lg={5}>
        <Row className="g-2">
          {data}
        </Row>
      </Col>
    </Row>

  );
};

export default HomeBanner;
