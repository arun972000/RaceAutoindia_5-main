/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap"
import "./homebanner.css";

const SecondBanner = ({ item }) => {

  return (
    <Col md={12} className="mt-2">
      <div className="nested-column" style={{ position: 'relative' }}>
        <img
          className="d-block w-100 last-Img homeBanner__image"
          src={item.image}
          alt={item.title}
          style={{ aspectRatio: "16/9", objectFit: "fill", borderRadius: 0 }}
        />
        <div className="home__overlay--text">
          <h2>{item.title}</h2>
          <p>Date Posted: {item.date}</p>
        </div>
      </div>
    </Col>
  )
}

export default SecondBanner