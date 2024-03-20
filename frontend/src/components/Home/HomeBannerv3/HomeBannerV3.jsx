
import { Row, Col } from 'react-bootstrap';
import "./HomeBannerV3.css";
import SideBanner from './SideBannerv3';
import SliderImage from '../Homebanner/Slider';
import axios from 'axios';
import { Url } from '../../../url';
import { useState } from 'react';
import { useEffect } from 'react';



const HomeBannerV3 = () => {

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
    const sideBannerData = data.map(item => (<SideBanner item={item} key={item.id} />)).slice(0,2)

    return (

        <Row className="g-2 mb-4">
            <Col lg-3>
                <Row className="">
                    {sideBannerData}
                </Row>
            </Col>

            <Col lg={6}>
                <SliderImage />
            </Col>
            <Col lg-3>
                <Row className="">
                    {sideBannerData}
                </Row>
            </Col>
        </Row>

    );
};

export default HomeBannerV3;