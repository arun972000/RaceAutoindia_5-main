import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Slider.css";

import axios from "axios"
import { Url } from '../../../url';
import { useEffect, useState } from 'react';






const SliderImage = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 6000,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: true,
    };
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    const [data, setData] = useState([])

    const sliderApi = async () => {
        try {
            const res = await axios.get(`${Url}api/post/slider`)
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        sliderApi()
    },[])

    console.log()
    const SliderData = data.map(item => (

        <div className="swiper-slide-content" key={item.id}>
            <img
                src={`https://raceautoindia.com/${item.image_big}`}
                alt={item.title}
                className="d-block w-100 slider__img"
            />
            <div className="slider__overlay--text">
                <h6>{item.title}</h6>
                <p>Date Posted: {formatDate(item.created_at)}</p>
            </div>
        </div>

    ))
    return (

        <Slider {...settings}>
            {SliderData}
        </Slider>

    )
}

export default SliderImage