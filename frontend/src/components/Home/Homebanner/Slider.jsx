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
import { Link } from "react-router-dom";

// install Swiper modules

const SliderImage = () => {
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const monthIndex = date.getMonth();
  //   const month = months[monthIndex];
  //   const day = date.getDate();
  //   const year = date.getFullYear();
  //   return `${month} ${day}, ${year}`;
  // };

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
        autoHeight={true}
        effect={"coverflow"}
        grabCursor={true}
        navigation={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container mt-4"
      >
        {data.map((i, el) => {
          return (
            <SwiperSlide key={el}>
              <Link className="link-style" to={`/post/${i.title_slug}`}>
              <img
                src={`https://raceautoindia.com/${i.image_mid}`}
                className="img-fluid image__slider"
                alt="Responsive image"
              />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SliderImage;
