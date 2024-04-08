/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./HomeBannerV3.css";
import { Col } from "react-bootstrap";

const SideBannerv3 = ({ item }) => {
  return (
    <Col sm={12} className="mt-2">
      <Link className="link-style" to={`/post/${item.title_slug}`}>
        <div
          className="nested-column banner__hover"
          style={{ position: "relative" }}
        >
          <img
            className="d-block w-100 sideBanner_image"
            src={import.meta.env.VITE_BACKEND_URL + `${item.image_big}`}
            alt={item.title}
            style={{ aspectRatio: "16/9", objectFit: "cover" }}
          />

          <div className="home__overlay--text">
            <h6>{item.title.slice(0,40)}...</h6>
            <p>Date Posted: {new Date(item.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default SideBannerv3;
