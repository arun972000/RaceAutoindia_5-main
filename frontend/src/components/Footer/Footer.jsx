import logo from "/src/assets/logo final .png";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer mt-5 pb-2">
        <div className="container">

              <div className="row justify-content-center align-items-center mt-4">
                <div className=" col-sm-auto justify-content-center">
                  <img
                    src={logo}
                    className="img-fluid"
                    alt="Responsive image"
                    width="120px"
                  />
                </div>
                <div className="my-3 col-sm-7 px-3">
                  <p>
                    Race Auto India is a B2B publication that offers insightful
                    analysis on the latest news, views, and trends in the
                    automotive industry and its associated sectors. With over 10
                    years of experience in the field of Commercial Vehicles,
                    Logistics, and Market Research, the team at Race Auto India
                    comprises distinguished experts who have a proven track
                    record of delivering high-quality researched content
                  </p>
                </div>

                <div className="col-sm-3 justify-content-center">
                  <div className="social-icons">
                    <a href="https://www.facebook.com/raceautoindia/" rel="noreferrer" target="_blank"><i className="fab fa-facebook"></i></a>
                    <a href="https://twitter.com/raceautoindia" rel="noreferrer" target="_blank"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com/race.auto.india/" rel="noreferrer" target="_blank"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/company/race-auto-india/" rel="noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/@RaceAutoIndia" rel="noreferrer" target="_blank"><i className="fab fa-youtube"></i></a>
                    <a href="https://raceautoindia.com/rss-feeds" rel="noreferrer" target="_blank"><i className="fa-solid fa-rss"></i></a>
                  </div>
                </div>
              </div>
            </div>
<div className="row">
            <div className="col-sm-12 mt-2 "></div>
            <hr className="my-2" />
            <div className="row">
              <div className="col-12 col-md-4 ">
                <p className="ms-4 text-center p-1">
                  Copyright 2024 Race Auto India - All Rights Reserved
                </p>
              </div>
              <div className="col-6 col-md-2">
                <Link to="/privacy-policy">
                  <p className="text-center p-1" style={{ cursor: "pointer" }}>
                    Privacy Policy
                  </p>
                </Link>
              </div>
              <div className="col-6 col-md-2">
                <Link to="/contact">
                  <p className="text-center p-1" style={{ cursor: "pointer" }}>
                    Contact
                  </p>
                </Link>
              </div>
              <div className="col-6 col-md-2">
                <Link to="/about-us">
                  <p className="text-center p-1" style={{ cursor: "pointer" }}>
                    About us
                  </p>
                </Link>
              </div>
              <div className="col-6 col-md-2">
                <p className="text-center p-1">Terms and Condition</p>
              </div>
            </div>
          </div>
          </div>
    </>
  );
};

export default Footer;
