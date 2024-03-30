/* eslint-disable react/prop-types */
import { Card, Col, Row } from "react-bootstrap";

import "../Varient.css";
import SubCardV5_2 from "./Varient5_card2";
import SubCardV5_1 from "./Varient5_card1";
import { Link } from "react-router-dom";

const Varient5 = ({ item, single }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const data1 = item
    .map((item) => <SubCardV5_1 key={item.id} item={item} />)
    .slice(0, 3);
  const data2 = item
    .map((item) => <SubCardV5_2 key={item.id} item={item} />)
    .slice(3, 6);
  return (
    <>
      {single.map((item) => (
        <Col sm={12} key={item.id}>
          <Card className="mb-1 border-0 mb-3">
            <Link className="link-style" to={`/post/${item.title_slug}`}>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <div className="image-container">
                      <Card.Img
                        variant="top"
                        src={`https://raceautoindia.com/${item.image_mid}`}
                        className="varient-image"
                        style={{
                          aspectRatio: "16/9",
                          objectFit: "fill",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="content mt-4">
                      <h6 className="card-heading">{item.title}</h6>

                      <p className="card-text text-muted small">
                        {formatDate(item.created_at)}
                      </p>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
      <Col sm={12}>
        <Row>
          <Col sm={6}>{data1}</Col>
          <Col sm={6}>{data2}</Col>
        </Row>
      </Col>
    </>
  );
};

export default Varient5;
