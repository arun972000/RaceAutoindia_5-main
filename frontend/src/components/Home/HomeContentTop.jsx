import { useEffect, useState } from "react";
import Ad_1 from "../Ads/Ad_1";
import BreakingNews from "../BreakingNews/breakingNews";
import Features from "../Features/Features";
import HomeBannerV3 from "./HomeBannerv3/HomeBannerV3";
import HomeBannerV4 from "./HomeBannerv4/HomeBannerV4";
import HomeBannerV2 from "./Homebanner_v2/HomeBannerV2";
import axios from "axios";
import { Url } from "../../url";
import Ad_2 from "../Ads/Ad_2";
import { IoMdClose } from "react-icons/io";
import "./homTopContent.css";

const HomeContentTop = () => {
  const [displayTopAd, setDisplayTopAd] = useState(true);
  const [sliderOption, setSliderOption] = useState("");

  const sliderApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/sliderView`);
      setSliderOption(res.data[0].slider_type);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sliderApi();
  }, [sliderOption]);
  return (
    <>
      <div
        className={`row mt-3  ${
          displayTopAd ? "ad-top-container" : "ad-top-hidden"
        }`}
      >
        <div className="col-12 d-flex justify-content-center">
          <Ad_2 />
          <IoMdClose onClick={() => setDisplayTopAd(false)} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <BreakingNews />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          {/* <HomeBanner /> */}

          {sliderOption == "1" && <HomeBannerV2 />}
          {sliderOption == "2" && <HomeBannerV3 />}
          {sliderOption == "3" && <HomeBannerV4 />}
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Ad_1 />
        </div>
      </div>
      {sliderOption == "3" && (
        <div className="row">
          <div className="col-12 mt-4">
            <Features />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeContentTop;
