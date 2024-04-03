/* eslint-disable react/prop-types */
import "./HomeBannerV3.css";
import { Col } from "react-bootstrap";

const SideBannerv3 = ({ item }) => {
  return (
    <Col sm={12} className="mt-2">
      <div
        className="nested-column banner__hover"
        style={{ position: "relative" }}
      >
        <img
          className="d-block w-100 sideBanner_image"
          src={`https://raceautoindia.com/${item.image_big}`}
          alt={item.title}
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />
        <div className="home__overlay--text">
          <h6>{item.title}</h6>
          <p>Date Posted: {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </Col>
  );
};

export default SideBannerv3;
