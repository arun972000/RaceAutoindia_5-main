import Slider from "react-slick";
import "./BreakingNews.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useState } from "react";
import { Url } from "../../url";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BreakingNews = () => {
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
  };

  const [data, setData] = useState([]);

  const breakingNewsApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/breaking`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    breakingNewsApi();
  }, []);

  const breakingNewsData = data.map((item) => (
    <div key={item.id}>
       <Link className="link-style" to={`/post/${item.title_slug}`}>
      <p className="p-0 m-0">{item.title}</p>
      </Link>
    </div>
  ));

  return (
    <div className="row">
      <div className="col-auto mt-3">
        <span className="News__label text-center">Breaking News</span>
      </div>
      <div className="col-md-10 mt-3 breaking-news__content">
        <Slider {...settings}>{breakingNewsData}</Slider>
      </div>
    </div>
  );
};

export default BreakingNews;
