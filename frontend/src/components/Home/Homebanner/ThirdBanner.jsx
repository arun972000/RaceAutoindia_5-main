/* eslint-disable react/prop-types */
import "./homebanner.css";
import { Col } from 'react-bootstrap'

const ThirdBanner = ({item}) => {
  return (
    <Col md={6} className="mt-2">
              <div className="nested-column" style={{ position: 'relative' }}>
                <img
                  className="d-block w-100 homeBanner_image"
                  src={item.image}
                  alt={item.title}
                  style={{aspectRatio:"16/9",objectFit:"fill",borderRadius:0}}
                />
                <div className="home__overlay--text">
                  <h2>{item.title}</h2>
                  <p>Date Posted: {item.date}</p>
                </div>
              </div>
            </Col>

  )
}

export default ThirdBanner