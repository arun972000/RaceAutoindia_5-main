/* eslint-disable react/prop-types */

import { Card, Col } from "react-bootstrap";
import SubCardV3 from "./Varient3_card2";
import "../Varient.css";
import { Link } from "react-router-dom";

const Varient3 = ({ item, single, main_title }) => {
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
  console.log(single, "hello");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const data2 = item.map((item) => <SubCardV3 key={item.id} item={item} main_title={main_title}/>);
  return (
    <>
      {single.map((item) => (
        <Col md={6} key={item.id} single={item}>
          <Card className="h-100 border-0 mb-3">
            <Link className="link-style" to={`/article/${main_title}/${single.title_slug}`}>
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={`https://raceautoindia.com/${single.image_mid}`}
                  className="varient-image"
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "fill",
                    borderRadius: 0,
                  }}
                />
              </div>
              <Card.Body>
                <h6 className="mt-3 card-heading">{single.title}</h6>
                <p className="card-text text-muted small">
                  {formatDate(single.created_at)}
                </p>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
      <Col md={6}>{data2}</Col>
    </>
  );
};

export default Varient3;
