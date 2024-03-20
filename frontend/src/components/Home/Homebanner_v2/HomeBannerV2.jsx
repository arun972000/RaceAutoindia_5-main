
import { Row, Col } from 'react-bootstrap';
import "./HomeBannerV2.css";
import SideBanner from './SideBanner';
import SliderImage from '../Homebanner/Slider';
import axios from 'axios';
import { Url } from '../../../url';
import { useState } from 'react';
import { useEffect } from 'react';



const HomeBannerV2 = () => {

    const [data, setData] = useState([])
    const sideBannerApi = async () => {
        try {
            const res = await axios.get(`${Url}api/post/featured`)
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        sideBannerApi()
    }, [])
    const sideBannerData = data.map(item => (<SideBanner item={item} key={item.id} />))

    return (

        <Row className="g-2 mb-4">

            <Col lg={6}>
                <SliderImage />
            </Col>
            <Col>
                <Row className=" gx-2">
                    {sideBannerData}
                </Row>
            </Col>
        </Row>

    );
};

export default HomeBannerV2;