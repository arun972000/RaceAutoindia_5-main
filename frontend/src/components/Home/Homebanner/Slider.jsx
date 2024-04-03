import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import { Url } from "../../../url";
import { useEffect, useState } from "react";

const SliderImage = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const [data, setData] = useState([]);

  const sliderApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/slider`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sliderApi();
  }, []);

  console.log();
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {data.map((i, el) => {
          return (
            <SwiperSlide key={el}>
              <img src={ `https://raceautoindia.com/${i.image_mid}`} className="img-fluid" alt="Responsive image"/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SliderImage;
