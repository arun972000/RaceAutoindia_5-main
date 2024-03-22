import { Routes, Route } from "react-router-dom";
import TopMenu from "./components/AboveNavbar/TopMenu";
import TopLogo from "./components/AboveNavbar/TopLogo";
import MyNavbar from "./components/Navbar/Navbar";
import HomeContentTop from "./components/Home/HomeContentTop";
import HomeContentMiddle from "./components/Home/HomeContentMiddle";
import PostPage from "./components/PostPage/Post";
import ContactUs from "./components/ContactUs/ContactUs";
import PopularPost from "./components/PopularPost/PopularPost";
import SocialMedia from "./components/SocialMeida/SocialMedia";
import UpcomingEvent from "./components/EventComponent/upcomingEvent";
import Ad_3 from "./components/Ads/Ad_3";
import ParallaxScroll from "./components/Parallax/Parallelax_bg";

const Layout = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12">
            <TopMenu />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row mt-3">
            <div className="col-12 ">
              <TopLogo />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <MyNavbar />
            </div>
          </div>
          <Routes>
            <Route path="/" element={<HomeContentTop />} />
          </Routes>
          <div className="row mt-3">
            <div className="col-md-8">
              <div className="row mt-3">
                <Routes>
                  <Route path="/" element={<HomeContentMiddle />} />
                  <Route path="/post" element={<PostPage />} />
                  <Route path="/contact" element={<ContactUs />} />
                </Routes>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center">
                  <Ad_3 />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <UpcomingEvent />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <PopularPost />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 mb-3">
                  <SocialMedia />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ParallaxScroll />} />
        </Routes>
      </div>
    </>
  );
};

export default Layout;
