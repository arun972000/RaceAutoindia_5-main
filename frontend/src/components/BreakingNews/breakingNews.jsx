import Slider from "react-slick";
import "./BreakingNews.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useState } from "react";
import { Url } from "../../url";
import { useEffect } from "react";

const BreakingNews = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 8000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false
  };

  const [data, setData] = useState([])

  const breakingNewsApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/breaking`)
      setData(res.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    breakingNewsApi()
  })

const breakingNewsData=data.map(item=>(<div key={item.id}>
  <p>{item.title}</p>
</div>))

  return (
    <div className="row">
      <div className="col-auto mt-3">
        <span className="News__label text-center">Breaking News</span>
      </div>
      <div className="col-md-10 mt-3" >
        <Slider {...settings}>
          {breakingNewsData}
        </Slider>
      </div>

    </div>
  );
};

export default BreakingNews