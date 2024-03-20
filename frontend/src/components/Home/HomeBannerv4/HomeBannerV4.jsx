
import { Row, Col } from 'react-bootstrap';
import "./HomeBannerV4.css";

import SliderImage from '../Homebanner/Slider';




const HomeBannerV4 = () => {

   
 

    return (

        <Row className="g-2 mb-4">

            <Col sm={12}>
                <SliderImage />
            </Col>

        </Row>

    );
};

export default HomeBannerV4;