import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CaroselCard from "./CaroselCard";
import "./EventCarosel.css"
import { businessJson } from "../../json/json";


function EventCarosel() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 2000,
        
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    const data=businessJson.map(item=><CaroselCard key={item.id} item={item}/>)
    return (

        <div className="slider-container mt-5">
            <Slider {...settings} className="slider__bg">
                {data}
            </Slider>
        </div>
    );
}

export default EventCarosel
